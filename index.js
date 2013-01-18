var fs = require('fs')
  , path = require('path')
  , _;

var validFormats = ['js', 'coffee'];

module.exports = Skipper

function Skipper()
{

}

Skipper.prototype.register = function register( controllerPath, callback )
{
  var controllers = fs.readdirSync(controllerPath)
    , isSync = (callback === undefined);
  callback = callback || null;

  controllers = controllers.filter(function( controller ) {
    return validFormats.indexOf( path.extname(controller).replace('.','') ) >= 0;
  });

  controllers.forEach(function( controller, index ) {
    console.log(controller, index);
    console.log(controller.replace(new RegExp("\.("+validFormats.join('|')+")$", "gi"), ''));

    var code = require('fs').readFileSync( path.join('./controllers/', controller) );
    var ldr = new Function('context', 'with (context) {\n' + code + '\n }');
//  ldr(context);
  });
}


