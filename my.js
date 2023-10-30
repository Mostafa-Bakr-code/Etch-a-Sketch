'use-strict';

const settings = document.querySelector('.settings');
const btns = document.querySelectorAll('button');

// Event Delegation on parent element (.settings)

settings.addEventListener('click', function (event) {
  // check if the element clicked withen .settings is a button
  if (event.target.tagName === 'BUTTON') {
    // remove the active class from all buttons
    btns.forEach(function (btn) {
      btn.classList.remove('active');
    });
    // add active class to the clicked button
    event.target.classList.add('active');
  }
});
