const saltedSha256 = require('salted-sha256');


const hashPassword = (password) => {

    const salt = (Math.random() + 1).toString(36).substring(7)
    const saltedHash = saltedSha256(password, salt);

    return {saltedHash, salt}

}

module.exports = {hashPassword}