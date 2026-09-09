// 1. Responsive Navigation Menu Toggle
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});

// 2. Footer Dynamic Dates
const currentYearSpan = document.querySelector('#currentyear');
const lastModifiedP = document.querySelector('#lastModified');

if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedP) {
  lastModifiedP.textContent = `Last Modification: ${document.lastModified}`;
}