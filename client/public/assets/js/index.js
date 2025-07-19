let index = 0;
const text = "quiz challenge"; // Declare the string to be typed
const textElement = document.getElementById("qz-ch"); // Get the HTML element with ID 'qz-ch'
textElement.innerHTML = ""; // Clear any existing content inside the element

// Function to type text letter by letter
function typeText() {
  if (index < text.length) {
    textElement.innerHTML += text.charAt(index); // Get character at 'index' from 'text' and append it to the element
    index++;
    setTimeout(typeText, 100); // Call typeText again after 100 milliseconds (0.1 second)
  }
}

typeText(); // Start the typing effect

