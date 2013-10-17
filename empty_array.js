"use strict";

(function(){
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    var a = [];
  }
  var end = Date.now();
  console.log('var a = []', end - start);
})();

(function(){
  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    var a = new Array();
  }
  var end = Date.now();
  console.log('var a = new Array()', end - start);
})();

(function(){
  function HasArray(){
    this.a = [];
  }
  (function(){ // encourage optimization before timing loop
    for(var i = 0; i !== 100; ++i){
      var t = new HasArray();
    }
  })();

  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    var a = new HasArray();
  }
  var end = Date.now();
  console.log('var a = new HasArray()', end - start);
})();

(function(){
  function Has2Arrays(){
    this.a = [];
    this.b = [];
  }
  (function(){ // encourage optimization before timing loop
    for(var i = 0; i !== 100; ++i){
      var t = new Has2Arrays();
    }
  })();

  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    var a = new Has2Arrays();
  }
  var end = Date.now();
  console.log('var a = new Has2Arrays()', end - start);
})();

(function(){
  function Has3Arrays(){
    this.a = [];
    this.b = [];
    this.c = [];
  }
  (function(){ // encourage optimization before timing loop
    for(var i = 0; i !== 100; ++i){
      var t = new Has3Arrays();
    }
  })();

  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    var a = new Has3Arrays();
  }
  var end = Date.now();
  console.log('var a = new Has3Arrays()', end - start);
})();

(function(){
  function Has3ArraysAndInt(){
    this.a = [];
    this.b = [];
    this.c = [];
    this.d = 10;
  }
  (function(){ // encourage optimization before timing loop
    for(var i = 0; i !== 100; ++i){
      var t = new Has3ArraysAndInt();
    }
  })();

  var start = Date.now();
  for(var j = 0; j !== 100000000; ++j){
    var a = new Has3ArraysAndInt();
  }
  var end = Date.now();
  console.log('var a = new Has3ArraysAndInt()', end - start);
})();


