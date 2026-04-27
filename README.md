# 🎭 Playwright TypeScript - E-commerce Testing Suite

[![Playwright](https://img.shields.io/badge/Playwright-1.54.2-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](https://github.com/)

Suite de pruebas automatizadas robusta y escalable desarrollada con **Playwright** y **TypeScript** para validar la integridad funcional de una plataforma de e-commerce.

---

## 🌟 Características Principales

Este proyecto implementa una cobertura completa para flujos críticos de usuario utilizando las mejores prácticas de automatización:

- **Estrategia de Pruebas**:
  - ✅ **Flujos de Autenticación**: Login robusto con validaciones positivas y negativas.
  - ✅ **Gestión de Cuentas**: Registro de nuevos usuarios con aserciones detalladas.
  - ✅ **Exploración de Productos**: Búsqueda avanzada y navegación en la homepage.
- **Arquitectura de Software**:
  - 🏗️ **Page Object Model (POM)**: Separación clara entre lógica de negocio y localizadores.
  - 🔌 **Custom Fixtures**: Abstracciones para simplificar la configuración de cada prueba.
  - 🛠️ **Utility Helpers**: Funciones auxiliares para manipulación de datos y esperas.

---

## 🛠️ Stack Tecnológico

| Herramienta | Propósito |
| :--- | :--- |
| **Playwright** | Motor de automatización cross-browser |
| **TypeScript** | Tipado estático para un código más seguro y mantenible |
| **Node.js** | Entorno de ejecución de JavaScript |
| **Dotenv** | Gestión segura de variables de entorno |

---

## 🚀 Inicio Rápido

### 1. Requisitos Previos
- **Node.js** (v18.0 o superior recomendada)
- **npm** (v9.0 o superior)

### 2. Instalación
```bash
# Instalar todas las dependencias
npm install

# Instalar los navegadores necesarios para Playwright
npx playwright install
```

### 3. Configuración de Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto (o usa el existente) con las siguientes variables para que las pruebas funcionen correctamente:

```env
VALID_EMAIL=tu_correo@gmail.com
VALID_PASSWORD=tu_password
INVALID_EMAIL=correo_invalido@test.com
INVALID_PASSWORD=password_incorrecta
```

---

## 📖 Ejecución de Pruebas

El proyecto cuenta con varios scripts configurados en `package.json` para facilitar el testing:

| Comando | Acción |
| :--- | :--- |
| `npm test` | Ejecuta todas las pruebas en modo *headless* |
| `npm run test:ui` | Abre la interfaz gráfica de Playwright (interactivo) |
| `npm run test:headed` | Ejecuta las pruebas mostrando el navegador |
| `npm run test:debug` | Inicia el depurador de Playwright |
| `npm run test:chrome` | Ejecuta pruebas específicamente en Chromium |
| `npm run test:report` | Muestra el último reporte HTML generado |

---

## 📁 Estructura del Proyecto

```bash
.
├── components/          # Componentes compartidos entre páginas
│   └── SearchComponent.ts
├── fixtures/            # Configuraciones personalizadas de pruebas
│   └── baseTest.ts
├── pages/               # Page Object Model (Lógica de páginas)
│   ├── BasePage.ts      # Abstracción común
│   ├── homePage.ts
│   ├── LoginPage.ts
│   └── RegisterPage.ts
├── tests/               # Suite de Pruebas (.spec.ts)
│   ├── api/             # Pruebas de API (en desarrollo)
│   └── ui/              # Pruebas de Interfaz de Usuario
│       ├── auth/        # Login y Registro
│       └── home_page/   # Navegación y Búsqueda
├── utils/               # Funciones de ayuda y constantes
│   └── helpers.ts
├── playwright.config.ts # Configuración global del framework
└── .env                 # Secretos y credenciales (Ignorado en Git)
```

---

## 📊 Reportes y Observabilidad

El proyecto está configurado para generar reportes ricos en información después de cada ejecución:

- **HTML Report**: Reporte interactivo detallado.
- **Videos**: Grabación completa de la ejecución de cada prueba.
- **Traces**: Análisis paso a paso de cada acción (útil para debugging).
- **Screenshots**: Capturas automáticas en caso de fallo.

Para ver los resultados, ejecuta: `npm run test:report`

---

## 👤 Autor

Desarrollado como proyecto de práctica profesional con **Playwright**.

---

## 📄 Licencia

Este proyecto está bajo la licencia [ISC](https://opensource.org/licenses/ISC).
