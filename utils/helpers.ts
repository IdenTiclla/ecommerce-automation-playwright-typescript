export const generateFakeUsername = (): string => {
    return `user_${Math.random().toString(36).substring(2, 11)}`;
}

export const generateFakeLastname = (): string => {
    return `Doe${Math.floor(Math.random() * 1000)}`;
}

export const generateFakeEmail = (): string => {
    return `testuser_${Math.random().toString(36).substring(2, 11)}@example.com`;
}

export const generateFakePassword = (): string => {
    return `testpassword_${Math.random().toString(36).substring(2, 11)}`;
}

export const generateFakePhoneNumber = () : string => {
    const digits: string = "0123456789";
    let phoneNumber: string = "";
    for (let i = 0; i < 10; i++) {
        phoneNumber += digits[Math.floor(Math.random() * digits.length)];
    }
    return phoneNumber;
}