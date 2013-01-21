var fs = require('fs');

var ControllerContext = require('./controllercontext')
  , LoaderContext = require('./loadercontext');

module.exports = Controller;

function Controller()
{
  this.controllerName = this.constructor.controllerName;
  this.context = new ControllerContext();
};

Controller.load = function( controllerPath, rqr )
{
  var source, loader, ctx;

  rqr = rqr 
    ? function( path ) {
        Module._load(path, rqr);
      }
    : require;

  try {
    source = fs.readFileSync(controllerPath);
  } catch(e) {
    console.error('', e);
  }
  //console.log(controller.replace( new RegExp("\\.(" + validFormats.join('|') + ")$", "gi"), '') );

  loader = new Function('context', 'require', 'with (context) {\n' + source + '\n }')
  loader(context, rqr);

  return new Controller();
}

