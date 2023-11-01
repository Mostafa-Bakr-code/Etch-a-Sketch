'use-strict';

// Event delegation selectors
const settings = document.querySelector('.settings');
const btns = document.querySelectorAll('button');
// _________________________________________________________
const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

// Event Delegation on parent element (.settings) to select active

settings.addEventListener('click', function (event) {
  // check if the element clicked withen .settings is a button
  if (event.target.tagName === 'BUTTON') {
    // remove the active class from all buttons
    btns.forEach(function (btn) {
      btn.classList.remove('active');
    });
    // add active class to the clicked button
    event.target.classList.add('active');
    if (event.target.classList.contains('clear')) {
      grid.innerHTML = '';
      upgrade_Grid();
    }
  }
});
// ___________________________________________________

let grid_Element;
let currentColor;
let random_Color;

// random color function for the Rainbow mode

const getRandomRGB = function () {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  // Convert the values to hexadecimal and format the color
  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');

  // Combine the components to create the color code
  random_Color = `#${hexR}${hexG}${hexB}`;

  return random_Color;
};

const change_Color = function (e) {
  if (colorBtn.classList.contains('active')) {
    e.target.style.backgroundColor = currentColor;
  }
  if (eraserBtn.classList.contains('active')) {
    e.target.style.backgroundColor = '#fefefe';
  }

  if (rainbowBtn.classList.contains('active')) {
    getRandomRGB();
    e.target.style.backgroundColor = random_Color;
  }
};

//  get current color when changing color picker
colorPicker.addEventListener('change', function () {
  currentColor = colorPicker.value;
});

// when changing slider's value both update_Sizevalue & upgrade_Grid functions will execute
const update_Sizevalue = function () {
  sizeValue.textContent = `${sizeSlider.value} x ${sizeSlider.value}`;
};

const upgrade_Grid = function () {
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${sizeSlider.value},1fr)`;
  grid.style.gridTemplateRows = `repeat(${sizeSlider.value},1fr)`;

  for (let i = 1; i <= sizeSlider.value * sizeSlider.value; i++) {
    grid_Element = document.createElement('div');
    grid.appendChild(grid_Element);
    grid_Element.addEventListener('mouseover', change_Color);
    grid_Element.addEventListener('mousedown', change_Color);
  }
};
// to execute the function without as the initial position on reloading the page
// with the initial slider's value set on the html 10 x 10
upgrade_Grid();

const sizeSlider_Change = function () {
  upgrade_Grid();
  update_Sizevalue();
};

// when changing slider's value both update_Sizevalue & upgrade_Grid functions will execute
sizeSlider.addEventListener('change', sizeSlider_Change);

// _______________________________________________________________
