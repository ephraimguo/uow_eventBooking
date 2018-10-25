
function hasError(errors){
  return errors && !!Object.keys(errors).length;
}

module.exports = {
  hasError
}