document.addEventListener('DOMContentLoaded', () => {
  const introductionLink = document.getElementById('introduction-link');

  if (introductionLink) {
    introductionLink.addEventListener('click', (event) => {
      event.preventDefault();

      const targetElement = document.querySelector(introductionLink.getAttribute('href'));
      if (targetElement) {
        const text = targetElement.textContent;
        targetElement.innerHTML = '';

        text.split('').forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.classList.add('split-char');
          span.style.animationDelay = `${index * 0.05}s`; // Apply delay via style
          targetElement.appendChild(span);
        });

        // After animation, navigate to the homepage
        setTimeout(() => {
          window.location.href = introductionLink.getAttribute('href');
        }, 1000); // Adjust time based on animation duration
      }
    });
  }
});