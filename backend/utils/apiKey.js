const crypto = require('crypto');

const generateApiKey = (id, firstName) => {
    const uuid = crypto.randomBytes(16).toString('hex');
    return `api-${id}-${uuid.slice(4)}-${firstName[2]}`
}

module.exports = generateApiKey;