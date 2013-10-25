"use strict";

var source_array = (function(){
  var rv = [];
  for(var i = 0; i !== 10000; ++i){
    rv.push(Math.floor(Math.random() * 1000000));
  }
  return rv;
})();

function noop(a){
  return a;
}

var noop_var = noop;
var noop_bind = noop.bind(undefined);
function noop_wrapped(a){
  return noop(a);
}

function noop_with_internal_function(a){
  function internal_noop(b){
    return b;
  }
  return internal_noop(a);
}

function add(a,b){
  return a+b;
}

var external_add = require('./add_helper.js').add;
var external_add_eval = require('./add_helper.js').add_eval;

function helper123(){
  "use strict";
  return new Function('a', 'b', '"use strict"; return a+b;');
}

function helper456(){
  "use strict";
  return eval('(function(a,b){"use strict";return a+b;})');
}

function helper789(){
  return (function(){
    return (function(){
      return (function(){
        return (function(){
          return (function(){
            return (function(){
              return (function(){
                return (function(){
                  return (function(){
                    return (function(){
                      return (function(){
                        return (function(){
                          return (function(){
                            return (function(){
                              return (function(){
                                return (function(){
                                  return helper456();
                                })();
                              })();
                            })();
                          })();
                        })();
                      })();
                    })();
                  })();
                })();
              })();
            })();
          })();
        })();
      })();
    })();
  })();
}

var eval_deeply_nested_add = eval('helper789()');

var add_from_eval = eval('(function(a,b){"use strict"; return a+b;})');
var add_from_new_function = new Function('a', 'b', '"use strict"; return a+b;');
var add_from_new_function2 = helper123();
var add_from_eval2 = helper456();
var add_from_eval3 = helper789();

function add_array(a,b){
  for(var i = 0; i !== a.length; ++i){
    a[i] += b[i];
  }
}

var ALWAYS_TRUE = Math.random() ? true : false;

function does_nothing(){}
var does_nothing2 = (ALWAYS_TRUE ? does_nothing : function(){console.log('never called');});

function foreach_helper(i,index,a){a[index] += source_array[index];}

function add_array_foreach(a,b){
  a.forEach(foreach_helper);
}

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + source_array[i];
    }
  }
  var end = Date.now();
  console.log('Basic ops', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + source_array[i];
      does_nothing();
    }
  }
  var end = Date.now();
  console.log('Basic ops with empty function', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + source_array[i];
      does_nothing(rv, i, rv[i], source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Basic ops with empty function that takes arguments', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + source_array[i];
      does_nothing2();
    }
  }
  var end = Date.now();
  console.log('Basic ops with empty function (determined by ternary)', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function', end - start);
})(source_array);

(function(source_array){
  function add(a,b){
    return a+b;
  }

  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function (not global)', end - start);
})(source_array);

(function(source_array){
//  function add(a,b){
//    return a+b;
//  }

  function test_iteration(j, rv, source_array){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add(rv[i],source_array[i]);
    }
  }

  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j) test_iteration(j, rv, source_array);
  var end = Date.now();
  console.log('Add function (test iteration helper)', end - start);
})(source_array);

(function(source_array){
  function test_iteration(j, rv, source_array){
    function add(a,b){
      return a+b;
    }

    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add(rv[i],source_array[i]);
    }
  }

  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j) test_iteration(j, rv, source_array);
  var end = Date.now();
  console.log('Add function (test iteration helper & new add function per iteration)', end - start);
})(source_array);

(function(source_array){
  function iteration(i){
    rv[i] = rv[i] + source_array[i];
  }

  function test_iteration(j, rv, source_array){
    for(var i = 0; i !== source_array.length; ++i) iteration(i);
  }

  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j) test_iteration(j, rv, source_array);
  var end = Date.now();
  console.log('Add function (test iteration helper & specialized iteration function)', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = external_add(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from require()', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = external_add_eval(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from require() created with eval', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add_from_new_function(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from new Function', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add_from_eval(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from eval', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add_from_new_function2(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from new Function (enclosed constructor)', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add_from_eval2(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from eval (enclosed constructor)', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = add_from_eval3(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from eval (deeply enclosed constructor)', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = eval_deeply_nested_add(rv[i],source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Add function from eval (deeply enclosed constructor and processed through eval)', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + noop(source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Noop function wrapping the source', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + noop_with_internal_function(source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Noop function with internal function wrapping the source', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + noop.call(undefined, source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Noop function (called with call) wrapping the source', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + noop_bind(source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Noop function (call a function that was built with bind) wrapping the source', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + noop_var(source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Noop Ref function wrapping the source', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = rv[i] + noop_wrapped(source_array[i]);
    }
  }
  var end = Date.now();
  console.log('Noop wrapped function wrapping the source', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      rv[i] = noop(noop(noop(add(noop(rv[i]),noop(source_array[i])))));
    }
  }
  var end = Date.now();
  console.log('Lots of extra functions', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    add_array(rv,source_array);
  }
  var end = Date.now();
  console.log('Helper function to add array', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    add_array_foreach(rv,source_array);
  }
  var end = Date.now();
  console.log('Helper function to add array using foreach', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 10000; ++j){
    for(var i = 0; i !== source_array.length; ++i){
      (function(){
        rv[i] = rv[i] + source_array[i];
      })();
    }
  }
  var end = Date.now();
  console.log('Extra immediately executed function', end - start);
})(source_array);

(function(source_array){
  var rv = source_array.slice(0);
  var start = Date.now();
  for(var j = 0; j !== 1000; ++j){
    var helper = function helper(i){
      rv[i] = rv[i] + source_array[i];
    }

    for(var i = 0; i !== source_array.length; ++i){
      helper.bind(undefined, i)();
    }
  }
  var end = Date.now();
  console.log('Extra immediately executed bind a helper function', end - start, 'x10');
})(source_array);

