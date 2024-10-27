
import CryptoJS from 'crypto-js';


export const hashPassword = async (password) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(); 
    const saltedData = salt + password; 
    const msgBuffer = new TextEncoder().encode(saltedData);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash =  hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return {hash, salt}

}


export const verifyPassword = (salt, password) => {
    const saltedData = salt + password;
    const hash = CryptoJS.SHA256(saltedData).toString();
    return hash;
};
