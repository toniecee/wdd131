const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

document.addEventListener("DOMContentLoaded", () => {
  setFooterDates();
  populateProducts();
  updateReviewCounter();
});

function setFooterDates() {
  const year = document.querySelector("#currentyear");
  const lastModified = document.querySelector("#lastModified");

  if (year) {
    year.textContent = `${new Date().getFullYear()}`;
  }

  if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
  }
}

function populateProducts() {
  const productSelect = document.querySelector("#product");

  if (!productSelect) {
    return;
  }

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
}

function updateReviewCounter() {
  const reviewCount = document.querySelector("#review-count");

  if (!reviewCount) {
    return;
  }

  let count = Number(localStorage.getItem("reviewCount")) || 0;
  count += 1;
  localStorage.setItem("reviewCount", `${count}`);

  if (count === 1) {
    reviewCount.textContent = `You have submitted 1 review.`;
  } else {
    reviewCount.textContent = `You have submitted ${count} reviews.`;
  }
}