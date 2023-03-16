document.addEventListener("DOMContentLoaded", () => {
  // Button alert functionality
  const myButton = document.getElementById("myButton");

  myButton.addEventListener("click", () => {
    alert("Hello, World!");
  });

  // Typing animation functionality
  const typedText = document.getElementById("typedText");
  const cursor = document.getElementById("cursor");
  const words = ["a programmer", "a sysadmin", "a hacker"]; // Words to cycle through
  let wordIndex = 0; // Start with the first word in the array
  let letterIndex = 0; // Start at the beginning of the current word

<<<<<<< HEAD
  function typeLetter() {
    const word = words[wordIndex];
    typedText.textContent += word[letterIndex];
    letterIndex++;
    if (letterIndex === word.length) {
      // Word is fully typed, wait a few seconds before starting delete
      setTimeout(deleteLetter, 2000);
      return;
=======
    const words = ["a programmer. ", "a sysadmin. ", "a developer. ", "an administrator. " ];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    let isFirstDelete = true;

    function type() {
        let delay = isDeleting ? 100 : 200;

        if (!isDeleting && letterIndex === words[wordIndex].length) {
            delay = 500; // Wait for 0.5 second before starting the blink effect
            isDeleting = "blink"; // Set isDeleting to "blink" for the blink effect
        } else if (isDeleting === "blink") {
            cursorEl.classList.toggle("blink");
            setTimeout(() => {
                cursorEl.classList.toggle("blink");
                setTimeout(() => {
                    cursorEl.classList.toggle("blink");
                    setTimeout(() => {
                        cursorEl.classList.toggle("blink");
                        isDeleting = true; // Start deleting the word
                        isFirstDelete = true; // Flag to delay first letter deletion
                        type(); // Call type function after the delay
                    }, 500);
                }, 500);
            }, 500);
            return; // Exit the function to allow blinking effect to complete
        } else if (isDeleting === true && letterIndex === 0) {
            isDeleting = false;
            if (wordIndex < words.length - 1) {
                wordIndex++;
            } else {
                wordIndex = 0;
            }
            delay = 500; // Add a delay before starting to type the next word
        }

        if (!isDeleting) {
            typedTextEl.textContent += words[wordIndex][letterIndex];
            letterIndex++;
        } else {
            if (isFirstDelete) {
                delay = 2000; // Add a 2-second delay before deleting the first letter
                isFirstDelete = false;
            }
            typedTextEl.textContent = typedTextEl.textContent.slice(0, -1);
            letterIndex--;
        }

        setTimeout(type, delay);
>>>>>>> 0d6ace7758326a1e60c5e38c9097807b7c6d7332
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
