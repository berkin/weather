const intent = (function() {
  var timer;
  return function(callback) {
    clearTimeout(timer);
    timer = setTimeout(callback, 500);
  }
  
})();

export default intent;