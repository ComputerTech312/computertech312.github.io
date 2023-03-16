document.addEventListener('DOMContentLoaded', function() {
    // Button alert functionality
    const myButton = document.getElementById('myButton');

    myButton.addEventListener('click', function() {
        alert('Hello, World!');
    });

    // Typing effect functionality
    const typedTextEl = document.getElementById("typedText");
    const cursorEl = document.getElementById("cursor");

    const words = ["programmer", "sysadmin", "developer", "leader", "secop", "administrator", "technician"];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;

    function type() {
        let delay = isDeleting ? 100 : 200;

        if (!isDeleting && letterIndex === words[wordIndex].length) {
            delay = 1000; // Wait for 1 second before starting to delete the word
            isDeleting = true;
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            if (wordIndex < words.length - 1) {
                wordIndex++;
            } else {
                wordIndex = 0;
            }
        }

        if (!isDeleting) {
            typedTextEl.textContent += words[wordIndex][letterIndex];
            letterIndex++;
        } else {
            typedTextEl.textContent = typedTextEl.textContent.slice(0, -1);
            letterIndex--;
        }

        setTimeout(type, delay);
    }

    type();
});
