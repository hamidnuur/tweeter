$(document).ready(function() {
  console.log("hello")
  $("#tweet-text").on("input", function() {
    console.log(this.value); //The this keyword is a reference to the button
    const variablesRemaining = 140 - this.value.length;
    console.log(variablesRemaining)
    $(".counter").text(variablesRemaining);
    if (variablesRemaining < 0) {
      $(".counter").css("color","red");
    }
  });
});

