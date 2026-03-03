import CryptoJS from "crypto-js";

const secretKey = "frameworkSecretKey";

export const encrypt = (text: string) : string => {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipher: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipher, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};