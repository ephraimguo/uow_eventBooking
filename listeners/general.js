

module.exports = function({domain}){
  domain.on({}, function(){
    console.log('===============================================');
    console.log('============ This is general listener ========= ');
    console.log('===============================================');
  });
}