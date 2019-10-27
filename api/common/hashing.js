const crypto = require('crypto');

//TODO to change before production
const algorithm = process.env.encryptSecret || 'aes192';
const password = 'abcdefghijklmnopqrstuvwxyz';

class Hashing {
    static encrypt(text) {
        const cipher = crypto.createCipher(algorithm, password);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }
    static decrypt(text) {
        try {
            const decipher = crypto.createDecipher(algorithm, password);
            let decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted += decipher.final('utf8');
            return decrypted;
        } catch(err) {
            return {};
        }
    }
}

module.exports = Hashing;