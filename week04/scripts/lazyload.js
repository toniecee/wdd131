// Output current year
const currentYearElement = document.querySelector("#currentyear");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

// Output last modified date
const lastModifiedElement = document.querySelector("#lastModified");
if (lastModifiedElement) {
  lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}