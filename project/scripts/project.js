const cropData = [
  {
    id: "cassava-01",
    name: "Cassava",
    type: "Tuber",
    season: "Rainy Season (March - June)",
    durationMonths: 11,
    avgYieldPerHectareTons: 22.5,
    imageUrl: "images/cassava.webp",
    description: "Drought-tolerant root crop adapted to well-drained soils across sub-humid zones."
  },
  {
    id: "maize-02",
    name: "White Maize",
    type: "Grain",
    season: "Early and Late Rains",
    durationMonths: 3.5,
    avgYieldPerHectareTons: 4.8,
    imageUrl: "images/maize.webp",
    description: "High-energy cereal crop that requires timely planting, balanced fertilizer, and prompt weeding."
  },
  {
    id: "yam-03",
    name: "White Guinea Yam",
    type: "Tuber",
    season: "Dry Season Pre-Planting (November - February)",
    durationMonths: 8,
    avgYieldPerHectareTons: 14,
    imageUrl: "images/yam.webp",
    description: "High-value crop that performs well in loose, mound-tilled soils with early staking support."
  },
  {
    id: "tomato-04",
    name: "Tomato",
    type: "Vegetable",
    season: "Dry Irrigation Season",
    durationMonths: 3,
    avgYieldPerHectareTons: 28,
    imageUrl: "images/tomato.webp",
    description: "Processing tomato variety that benefits from irrigation, mulching, and disease monitoring."
  },
  {
    id: "soybean-05",
    name: "Grain Soybean",
    type: "Legume",
    season: "Mid Rainy Season (June - July)",
    durationMonths: 4,
    avgYieldPerHectareTons: 2.4,
    imageUrl: "images/soybean.webp",
    description: "Nitrogen-fixing legume that improves soil fertility and provides protein-rich grain."
  },
  {
    id: "pepper-06",
    name: "Habanero Pepper",
    type: "Vegetable",
    season: "Year-Round with Irrigation",
    durationMonths: 5,
    avgYieldPerHectareTons: 12,
    imageUrl: "images/pepper.webp",
    description: "Warm-season cash crop that responds well to fertile soils, mulching, and steady moisture."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initFooterDates();
  initVisitorCounter();

  if (document.querySelector("#crop-gallery")) {
    initCatalogPage();
  }

  if (document.querySelector("#calculator-form")) {
    initEstimatorPage();
  }

  if (document.querySelector("#consultation-form")) {
    initContactPage();
  }
});

function initNavigation() {
  const menuBtn = document.querySelector("#menu-btn");
  const nav = document.querySelector("#primary-nav");

  if (!menuBtn || !nav) {
    return;
  }

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
    const isOpen = nav.classList.contains("open");
    menuBtn.textContent = isOpen ? "X" : "☰";
    menuBtn.setAttribute("aria-expanded", `${isOpen}`);
  });
}

function initFooterDates() {
  const yearElement = document.querySelector("#currentyear");
  const modifiedElement = document.querySelector("#lastModified");

  if (yearElement) {
    yearElement.textContent = `${new Date().getFullYear()}`;
  }

  if (modifiedElement) {
    modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }
}

function initVisitorCounter() {
  const counterElement = document.querySelector("#visit-count");

  if (!counterElement) {
    return;
  }

  let visitCount = Number(localStorage.getItem("agrigrow_visits")) || 0;
  visitCount += 1;
  localStorage.setItem("agrigrow_visits", `${visitCount}`);

  if (visitCount === 1) {
    counterElement.textContent = `Welcome to AgriGrow Hub. This is your first visit.`;
  } else {
    counterElement.textContent = `Welcome back. You have visited this hub ${visitCount} times.`;
  }
}

function initCatalogPage() {
  const gallery = document.querySelector("#crop-gallery");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const totalCropsBadge = document.querySelector("#total-crops-stat");

  function renderCropCards(items) {
    gallery.innerHTML = items
      .map((crop) => `
        <article class="crop-card">
          <h3>${crop.name}</h3>
          <img src="${crop.imageUrl}" alt="${crop.name} crop image" loading="lazy" width="400" height="220">
          <div class="card-content">
            <p><span>Category:</span> ${crop.type}</p>
            <p><span>Planting Window:</span> ${crop.season}</p>
            <p><span>Maturity:</span> ${crop.durationMonths} months</p>
            <p><span>Benchmark Yield:</span> ${crop.avgYieldPerHectareTons} t/ha</p>
            <p>${crop.description}</p>
          </div>
        </article>
      `)
      .join("");
  }

  renderCropCards(cropData);

  if (totalCropsBadge) {
    const totalBenchmarkYield = cropData.reduce((accumulator, crop) => accumulator + crop.avgYieldPerHectareTons, 0);
    const avgYield = (totalBenchmarkYield / cropData.length).toFixed(1);
    totalCropsBadge.textContent = `${cropData.length} documented crops | Average benchmark: ${avgYield} t/ha`;
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      filterButtons.forEach((filterButton) => filterButton.classList.remove("active"));
      event.target.classList.add("active");

      const filterType = event.target.getAttribute("data-filter");
      const filteredCrops = filterType === "all"
        ? cropData
        : cropData.filter((crop) => crop.type.toLowerCase() === filterType.toLowerCase());

      renderCropCards(filteredCrops);
    });
  });
}

function initEstimatorPage() {
  const form = document.querySelector("#calculator-form");
  const cropSelect = document.querySelector("#calc-crop");
  const outputDiv = document.querySelector("#calculator-output");

  cropSelect.innerHTML = `<option value="">-- Choose a crop --</option>${cropData
    .map((crop) => `<option value="${crop.id}">${crop.name} (${crop.type})</option>`)
    .join("")}`;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedCropId = cropSelect.value;
    const hectares = Number.parseFloat(document.querySelector("#calc-hectares").value);
    const managementLevel = document.querySelector("#calc-management").value;

    if (!selectedCropId || Number.isNaN(hectares) || hectares <= 0) {
      outputDiv.innerHTML = `<p class="error">Please select a crop and enter a valid farm size.</p>`;
      return;
    }

    const selectedCrop = cropData.find((crop) => crop.id === selectedCropId);
    let managementMultiplier = 1;

    if (managementLevel === "optimal") {
      managementMultiplier = 1.25;
    } else if (managementLevel === "basic") {
      managementMultiplier = 0.75;
    }

    const estimatedPerHa = (selectedCrop.avgYieldPerHectareTons * managementMultiplier).toFixed(2);
    const estimatedTotalTons = (selectedCrop.avgYieldPerHectareTons * hectares * managementMultiplier).toFixed(2);

    localStorage.setItem("agrigrow_last_crop", selectedCrop.name);
    localStorage.setItem("agrigrow_last_estimate", `${estimatedTotalTons} metric tons`);

    outputDiv.innerHTML = `
      <div class="result-card">
        <h3>Harvest Projection: ${selectedCrop.name}</h3>
        <p><strong>Total Land Area:</strong> ${hectares} hectares</p>
        <p><strong>Management Level:</strong> ${managementLevel}</p>
        <p><strong>Projected Productivity:</strong> ${estimatedPerHa} tons per hectare</p>
        <p><strong>Estimated Total Output:</strong> ${estimatedTotalTons} metric tons</p>
        <p><em>Typical production cycle: about ${selectedCrop.durationMonths} months.</em></p>
      </div>
    `;
  });
}

function initContactPage() {
  const form = document.querySelector("#consultation-form");
  const confirmation = document.querySelector("#form-confirmation");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.querySelector("#full-name").value.trim();
    const email = document.querySelector("#email-address").value.trim();
    const topic = document.querySelector("#inquiry-topic").value;

    localStorage.setItem("agrigrow_last_user", fullName);
    form.reset();

    confirmation.innerHTML = `
      <div class="result-card">
        <h3>Thank You, ${fullName}!</h3>
        <p>Your demonstration advisory request concerning <strong>${topic}</strong> has been recorded.</p>
        <p>This project form shows how AgriGrow Hub can collect advisory requests. A real deployment would connect this form to a database or email service.</p>
        <p><strong>Contact entered:</strong> ${email}</p>
      </div>
    `;
  });
}