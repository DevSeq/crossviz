$(document).ready(function() {

  var n = 0;

  $('#step-forward').click(function() {
      ++n;
      crossviz.core.stepforward(n);
  });

});
