var fs = require('fs')
  , path = require('path')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , libutil = require('./lib/util')
  , _;

var validFormats = ['js', 'coffee']
  , LoaderContext = require('./lib/loadercontext');

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
  var ctrlrName = controller.name;

  this._controllers[ctrlrName] = controller;
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

