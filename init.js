require('fs').readdirSync('./').forEach(function(filename){
  if(filename === 'init.js') return;
  if(filename === 'add_helper.js') return;
  if(filename.slice(-3) !== '.js') return;
  console.log();
  console.log(filename);
  console.log('-----------------------------------');
  require('./'+filename);
  console.log('-----------------------------------');
  console.log();
});

