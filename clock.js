function updateTime() {
  const now = new Date(new Date().getTime());
  const hours = now.getUTCHours().toString().padStart(2, '0');
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');
  const day = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Animate the hour digit
  document.querySelector('.hour').classList.add('animate');
  setTimeout(() => {
    document.querySelector('.hour').textContent = hours;
    document.querySelector('.hour').classList.remove('animate');
  }, 500);

  // Animate the minute digit
  setTimeout(() => {
    document.querySelector('.minute').classList.add('animate');
  }, 100);
  setTimeout(() => {
    document.querySelector('.minute').textContent = minutes;
    document.querySelector('.minute').classList.remove('animate');
  }, 600);

  // Animate the second digit
  setTimeout(() => {
    document.querySelector('.second').classList.add('animate');
  }, 200);
  setTimeout(() => {
    document.querySelector('.second').textContent = seconds;
    document.querySelector('.second').classList.remove('animate');
  }, 700);
}

// Add event listeners to the settings inputs
document.querySelector('#format').addEventListener('change', function() {
  const format = this.value;
  const digits = document.querySelectorAll('.digit');
  if (format === '12') {
    digits.forEach(digit => digit.textContent = parseInt(digit.textContent) % 12 || 12);
  } else {
    digits.forEach(digit => digit.textContent = digit.textContent.padStart(2, '0'));
  }
});

document.querySelector('#timezone').addEventListener('change', function() {
  updateTime();
});

// Update the clock every second
setInterval(updateTime, 1000);
