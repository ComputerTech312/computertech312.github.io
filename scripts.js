document.addEventListener('DOMContentLoaded', function() {
    // Button alert functionality
    const myButton = document.getElementById('myButton');

    myButton.addEventListener('click', function() {
        alert('Hello, World!');
    });

    // Typing effect functionality
    const typedTextEl = document.getElementById("typedText");
    const cursorEl = document.getElementById("cursor");

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
    }

    type();
});
