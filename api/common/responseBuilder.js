module.exports = (error, statusCode) => {
    let obj = {};
    if(error) obj = {message: error, status: statusCode};
    return obj;
}