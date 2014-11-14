$(document).ready(function() {

  $('#step-forward').click(function() {
      crossviz.core.takeStep();
  });

  $('#reset-world').click(function() {
      crossviz.core.resetWorld();
  });

});
