module.exports = {
  getParamNames : function getParamNames(func) {
   var funStr = func.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g) || [];
  }
}
