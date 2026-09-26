// Dataset: 7 original items + 3 student additions (10 total)
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Three additional temples
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/400x250/slctemple5.jpg"
  },
  {
    templeName: "Logan Utah",
    location: "Logan, Utah, United States",
    dedicated: "1884, May, 17",
    area: 119619,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/logan-utah/400x250/logan-temple-768119-wallpaper.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Greater Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x225/accra-ghana-temple-detail-249022-2400x1200.jpg"
  }
];

// Target DOM nodes
const cardsContainer = document.querySelector("#temple-cards");
const filterHeading = document.querySelector("#filter-title");
const navLinks = document.querySelectorAll("nav a");
const menuBtn = document.querySelector("#menu-btn");
const primaryNav = document.querySelector("#primary-nav");

/**
 * Renders an array of temple objects into cards
 * @param {Array} templeList 
 */
function createTempleCards(templeList) {
  cardsContainer.innerHTML = "";

  templeList.forEach((temple) => {
    const card = document.createElement("section");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${temple.templeName}</h3>
      <div class="card-details">
        <p><span>Location:</span> ${temple.location}</p>
        <p><span>Dedicated:</span> ${temple.dedicated}</p>
        <p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
      </div>
      <img src="${temple.imageUrl}" 
           alt="${temple.templeName} Temple" 
           loading="lazy" 
           width="400" 
           height="250">
    `;

    cardsContainer.appendChild(card);
  });
}

/**
 * Sets active visual state on current nav link
 * @param {HTMLElement} selectedLink 
 */
function updateActiveLink(selectedLink) {
  navLinks.forEach((link) => link.classList.remove("active"));
  selectedLink.classList.add("active");
}

// Extracts 4-digit dedication year
function getDedicationYear(dateStr) {
  return parseInt(dateStr.split(",")[0], 10);
}

// Navigation event listeners
document.querySelector("#filter-home").addEventListener("click", (e) => {
  e.preventDefault();
  filterHeading.textContent = "Home";
  updateActiveLink(e.target);
  createTempleCards(temples);
});

document.querySelector("#filter-old").addEventListener("click", (e) => {
  e.preventDefault();
  filterHeading.textContent = "Old Temples (Built before 1900)";
  updateActiveLink(e.target);
  createTempleCards(temples.filter((t) => getDedicationYear(t.dedicated) < 1900));
});

document.querySelector("#filter-new").addEventListener("click", (e) => {
  e.preventDefault();
  filterHeading.textContent = "New Temples (Built after 2000)";
  updateActiveLink(e.target);
  createTempleCards(temples.filter((t) => getDedicationYear(t.dedicated) > 2000));
});

document.querySelector("#filter-large").addEventListener("click", (e) => {
  e.preventDefault();
  filterHeading.textContent = "Large Temples (> 90,000 sq ft)";
  updateActiveLink(e.target);
  createTempleCards(temples.filter((t) => t.area > 90000));
});

document.querySelector("#filter-small").addEventListener("click", (e) => {
  e.preventDefault();
  filterHeading.textContent = "Small Temples (< 10,000 sq ft)";
  updateActiveLink(e.target);
  createTempleCards(temples.filter((t) => t.area < 10000));
});

// Mobile menu toggle
menuBtn.addEventListener("click", () => {
  primaryNav.classList.toggle("open");
  menuBtn.textContent = primaryNav.classList.contains("open") ? "✕" : "☰";
});

// Dynamic footer dates
const currentYearSpan = document.querySelector("#currentyear");
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.querySelector("#lastModified");
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
}

// Initial render
createTempleCards(temples);