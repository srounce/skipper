var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , libutil = require('./lib/util')
  , _;

var Controller = require('./lib/controller')
  , LoaderContext = require('./lib/loadercontext');

var validFormats = ['js', 'coffee'];

module.exports = Skipper

function Skipper()
{
  this._controllers = {};
}

util.inherits(Skipper, EventEmitter);

Skipper.prototype.register = function register( controllerPath, callback )
{
  var controllers = fs.readdirSync(controllerPath)
    , isSync = (callback === undefined);
  callback = callback || null;

  controllers = controllers.filter(function( controller ) {
    return validFormats.indexOf( path.extname(controller).replace('.','') ) >= 0;
  }.bind(this));

  controllers.forEach(function( controller, index ) {
    console.log(controller.replace(new RegExp("\.("+validFormats.join('|')+")$", "gi"), ''));

    var source = require('fs').readFileSync( path.join('./controllers/', controller) )
      , loader = new Function('context', 'with (context) {\n' + source + '\n }')
      , ctx = new LoaderContext(this);

    loader(ctx);

  }.bind(this));
}

Skipper.prototype.registerController = function registerController( controller )
{
  var ctrlr = new Controller(controller);

  this._controllers[controller.name] = new Controller(controller);
}

Skipper.prototype.controller = function controller( name )
{
  which = ( this._controllers && this._controllers[ name ] )
    ? this._controllers[ name ]
    : false;
  
  if(which) {
    return which;
  }
}

