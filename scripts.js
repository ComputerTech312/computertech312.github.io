document.addEventListener("DOMContentLoaded", () => {
  // Button alert functionality
  const myButton = document.getElementById("myButton");

  myButton.addEventListener("click", () => {
    alert("Hello, World!");
  });

  // Typing animation functionality
  const typedText = document.getElementById("typedText");
  const cursor = document.getElementById("cursor");
  const words = ["I'm a full stack developer", "I'm a programmer.", "I'm a sysadmin.", "I own/manage multiple communities."]; // Words to cycle through
  let wordIndex = 0; // Start with the first word in the array
  let letterIndex = 0; // Start at the beginning of the current word

  function typeLetter() {
    const word = words[wordIndex];
    typedText.textContent += word[letterIndex];
    letterIndex++;
    if (letterIndex === word.length) {
      // Word is fully typed, wait a few seconds before starting delete
      setTimeout(deleteLetter, 1500);
      return;
    }
    setTimeout(typeLetter, 150);
  }

  function deleteLetter() {
    const word = words[wordIndex];
    typedText.textContent = word.slice(0, letterIndex - 1);
    letterIndex--;
    if (letterIndex === 0) {
      // Word is fully deleted, wait a few more seconds before moving on to the next word
      setTimeout(() => {
        wordIndex++;
        if (wordIndex === words.length) {
          // End of array, loop back to the beginning
          wordIndex = 0;
        }
        typeLetter();
      }, 1500);
      return;
    }
    setTimeout(deleteLetter, 100);
  }

  // Start the typing animation
  typeLetter();

  // Blinking cursor animation
  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
  }, 500);
});
