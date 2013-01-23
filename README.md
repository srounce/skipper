#Skipper
A lightweight multipurpose controller chassis

###Example of controller interface (unstable)

####mycontroller.js:
```javascript
controller(function MyController() 
{
  extends(require('./mysupercontroller'))

  route(function () {
    console.log('>> the index');
  })

  route(function namedFunc() {
    console.log('>> namedFunc');
  })

  route(function otherNamedFunc() {
    before(connectCompatibleMiddleware);

    console.log('>> otherNamedFunc')
  })

  before([ namedFunc, otherNamedFunc ], function(req, res) {
    // Connect compatible middleware
  })

  after([ namedFunc ], middlewareFunc)

})
```
