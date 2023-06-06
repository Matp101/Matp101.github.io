const typewriterText = document.getElementById("typewriterText");
const textToDisplay = typewriterText.getAttribute("data-text");
let currentText = "";
let currentIndex = 0;

function typeWriter() {
  if (currentIndex < textToDisplay.length) {
    currentText += textToDisplay.charAt(currentIndex);
    typewriterText.textContent = currentText;
    currentIndex++;
    setTimeout(typeWriter, 150); // Change this value to control the typing speed
  }
}

typeWriter();
