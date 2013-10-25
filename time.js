"use strict";

(function(){
  var start = Date.now();
  for(var j = 0; j !== 10000000; ++j){
    Date.now();
  }
  var end = Date.now();
  console.log('Date.now() x10000000', end - start);
})();

