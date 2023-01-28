let ariaLabel = document.querySelectorAll("[aria-label]");
let ariaLabelledby = document.querySelectorAll("[aria-labelledby]");

for (let i=0; i<ariaLabel.length; i++) {
	ariaLabel[i].removeAttribute("aria-label");
}

for (let i=0; i<ariaLabelledby.length; i++) {
	ariaLabelledby[i].removeAttribute("aria-labelledby");
}

alert("Processing finished!");