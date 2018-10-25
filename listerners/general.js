

module.exports = function(domain){
  domain.on({}, function(){
    console.log('===============================================');
    console.log('\n ============ This is general listener ========== ');
    console.log('===============================================');
  });
}