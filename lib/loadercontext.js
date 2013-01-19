module.exports = LoaderContext

function LoaderContext( parent )
{
  if( parent === undefined ) {
    throw new ArgumentError();
  }

  this.controller = function( ctrlr )
  {
    parent.registerController(ctrlr);
  }
}

