const fs = require('fs');
const path = require('path');

const resultsPath = path.resolve('allure-results');
const reportPath = path.resolve('allure-report');
const stats = { total: 0, passed: 0, failed: 0, broken: 0, skipped: 0, unknown: 0 };
const statuses = [
  ['passed', 'Passed', '#2da44e'],
  ['failed', 'Failed', '#cf222e'],
  ['broken', 'Broken', '#bf8700'],
  ['skipped', 'Skipped', '#57606a'],
  ['unknown', 'Unknown', '#8250df']
];

if (fs.existsSync(resultsPath)) {
  for (const file of fs.readdirSync(resultsPath).filter((file) => file.endsWith('-result.json'))) {
    const result = JSON.parse(fs.readFileSync(path.join(resultsPath, file), 'utf8'));
    stats.total += 1;
    stats[result.status] = (stats[result.status] || 0) + 1;
  }
}

const percentage = (count) => (stats.total ? Math.round((count / stats.total) * 100) : 0);
const polarPoint = (angle) => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return [120 + 82 * Math.cos(radians), 120 + 82 * Math.sin(radians)];
};

let angle = 0;
const slices = statuses.flatMap(([key, , color]) => {
  const value = stats[key];
  if (!value || !stats.total) return [];

  const nextAngle = angle + (value / stats.total) * 360;
  const [startX, startY] = polarPoint(angle);
  const [endX, endY] = polarPoint(nextAngle);
  const largeArc = nextAngle - angle > 180 ? 1 : 0;
  angle = nextAngle;

  if (value === stats.total) {
    return [`<circle cx="120" cy="120" r="82" fill="${color}" />`];
  }

  return [`<path d="M 120 120 L ${startX} ${startY} A 82 82 0 ${largeArc} 1 ${endX} ${endY} Z" fill="${color}" />`];
});

const legend = statuses
  .filter(([key]) => stats[key] > 0)
  .map(([key, label, color], index) => {
    const y = 76 + index * 34;
    return `<rect x="260" y="${y - 13}" width="14" height="14" rx="3" fill="${color}" /><text x="284" y="${y}" class="label">${label}</text><text x="510" y="${y}" class="value">${stats[key]} (${percentage(stats[key])}%)</text>`;
  })
  .join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="240" viewBox="0 0 640 240" role="img" aria-label="Allure test results">
  <style>.title{font:700 22px system-ui,sans-serif;fill:#1f2328}.total{font:700 28px system-ui,sans-serif;fill:#1f2328}.subtitle{font:14px system-ui,sans-serif;fill:#656d76}.label{font:16px system-ui,sans-serif;fill:#1f2328}.value{font:700 16px system-ui,sans-serif;fill:#1f2328;text-anchor:end}</style>
  <rect width="640" height="240" rx="16" fill="#f6f8fa" />
  ${slices.join('')}
  <circle cx="120" cy="120" r="51" fill="#ffffff" />
  <text x="120" y="115" text-anchor="middle" class="total">${stats.total}</text>
  <text x="120" y="137" text-anchor="middle" class="subtitle">tests</text>
  <text x="260" y="38" class="title">Allure results</text>
  ${legend}
</svg>`;

fs.mkdirSync(reportPath, { recursive: true });
fs.writeFileSync(path.join(reportPath, 'summary.svg'), svg);

if (process.env.GITHUB_STEP_SUMMARY) {
  const reportUrl = process.env.ALLURE_PAGES_URL;
  const chartUrl = `${reportUrl}/summary.svg?run=${process.env.GITHUB_RUN_ID}`;
  const lines = [
    '## Allure report',
    '',
    `![Allure results](${chartUrl})`,
    '',
    `Interactive report: [open Allure dashboard](${reportUrl}/)`,
    ''
  ];
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join('\n'));
}
