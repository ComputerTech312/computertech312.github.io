// get the heading element
var heading = document.getElementById("myHeading");

// get the button element
var button = document.getElementById("myButton");

// add a click event listener to the button
button.addEventListener("click", function() {
    // change the text of the heading when the button is clicked
    heading.innerHTML = "Hello, World!";
});
