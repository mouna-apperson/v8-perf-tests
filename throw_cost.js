"use strict";

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    if(c[j & 7] === 0) throw new Error('This never can happen, but v8 has no good way to know that');
  }
  var end = Date.now();
  console.log('if with what looks like it could throw', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    if(c[j & 7] === 0) break; // never true
  }
  var end = Date.now();
  console.log('if with what looks like it could cause a loop break', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  try {
    for(var j = 0; j !== 100000000; ++j){
      if(c[j & 7] === 0) break; // never true
    }
  } catch(e){}
  var end = Date.now();
  console.log('wrapped in a try catch (without anything that can throw)', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  try {
    for(var j = 0; j !== 100000000; ++j){
      if(c[j & 7] === 0) throw new Error('This never can happen, but v8 has no good way to know that');
    }
  } catch(e){}
  var end = Date.now();
  console.log('if with what looks like it could throw wrapped in try catch', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    try {
      if(c[j & 7] === 0) break; // never true
    } catch(e){}
  }
  var end = Date.now();
  console.log('wrapped in a try catch inside loop (without anything that can throw)', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    try {
      if(c[j & 7] === 0) throw new Error('This never can happen, but v8 has no good way to know that');
    } catch(e){}
  }
  var end = Date.now();
  console.log('if with what looks like it could throw wrapped in try catch (inside loop)', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    try {
      if((c[j & 7] === 0) || (0 === (j & 63))) throw new Error('This ----- can happen, but v8 has no good way to know that');
    } catch(e){}
  }
  var end = Date.now();
  console.log('actually throws 1 in 64 times', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    try {
      if((c[j & 7] === 0) || (0 === (j & 1023))) throw new Error('This ----- can happen, but v8 has no good way to know that');
    } catch(e){}
  }
  var end = Date.now();
  console.log('actually throws 1 in 1,024 times', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    try {
      if((c[j & 7] === 0) || (0 === (j & 16383))) throw new Error('This ----- can happen, but v8 has no good way to know that');
    } catch(e){}
  }
  var end = Date.now();
  console.log('actually throws 1 in 16,384 times', end - start);
})();

(function(){
  var c = [1,2,3,4,5,6,7,8,9,10].map(function(){ return 1 + (10000 * Math.random())|0; });
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    try {
      if((c[j & 7] === 0) || (0 === (j & 1048575))) throw new Error('This ----- can happen, but v8 has no good way to know that');
    } catch(e){}
  }
  var end = Date.now();
  console.log('actually throws 1 in 1,048,576 times', end - start);
})();

