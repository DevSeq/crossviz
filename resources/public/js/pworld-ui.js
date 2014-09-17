$(document).ready(function() {

  var n = 0;

  $('#step-forward').click(function() {
      ++n;
      pworld.core.stepforward(n);
  });

});
