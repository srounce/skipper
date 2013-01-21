var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter;

var Controller = require('./lib/controller')
  , libutil = require('./lib/util')
  , LoaderContext = require('./lib/loadercontext');

var validFormats = module.validFormats = ['js', 'coffee'];

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
  });

  controllers.forEach(function( file, index ) {
    var fullPath = path.join(controllerPath, file);
    Controller.load(fullPath, new LoaderContext(this));
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

