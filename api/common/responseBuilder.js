module.exports = (error, response) => {
    const obj = {};

    if(error) {
        obj.error = {message: error};
    } else if(response) {
        obj.data = response;
    }

    return obj;
}