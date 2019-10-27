const hashing = require('./hashing');

module.exports = (user) => {
    let {id} = user, token = {id, company : user.company.company, expire: (new Date((new Date).getTime() + 24*60*60*1000)), type:'access_token'}, refreshToken = {id, company : user.company.company, expire: (new Date((new Date).getTime() + 24*60*60*30000)), type:'refresh_token'};
    return {access_token: hashing.encrypt(JSON.stringify(token)), refresh_token: hashing.encrypt(JSON.stringify(refreshToken)), token_type: 'bearer', expires_in: token.expire.getTime()/1000, password_reset: user.first};
}