// Populate current copyright year
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = new Date().getFullYear();

// Populate last modified date string
const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;