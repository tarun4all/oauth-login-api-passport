module.exports = {
    globalButNotConfig: (varName, varValue) => {
        if(global.hasOwnProperty(varName)) return false;
        else {
            global[varName] = varValue;
            Object.defineProperty(global, varName, {
                writable: false,
            });
            return true;
        }
    }
};