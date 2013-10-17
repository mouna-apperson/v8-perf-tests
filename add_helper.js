"use strict";
module.exports.add = function(a,b){return a+b;};
module.exports.add_eval = eval('(function(a,b){return a+b;})');
