
import CryptoJS from 'crypto-js';


export const hashPassword = (password) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(); 
    const saltedData = salt + password;

    const hash = CryptoJS.SHA256(saltedData).toString();

    return {hash, salt}

}

