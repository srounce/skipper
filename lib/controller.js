var fs = require('fs');

var ControllerContext = require('./controllercontext');

module.exports = Controller;

function Controller()
{
  this.controllerName = this.constructor.controllerName;
  this.context = new ControllerContext();
};

Controller.prototype.load = function( path )
{
  try {
    var source = fs.readFileSync(path);
  } catch(e) {
    console.error('', e);
  }
  
  var fn = new Function('context', 'with (context) {\n' + source + '\n}');
}

