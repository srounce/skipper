module.exports = LoaderContext

function LoaderContext( parent )
{
  if( parent === undefined ) {
    throw new Error('Dur, doin\' it wrong!');
  }

  this.controller = function( ctrlr )
  {
    parent.registerController(ctrlr);
  }
}

