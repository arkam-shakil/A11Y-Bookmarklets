let x = document.querySelectorAll("[aria-label]");
let y = document.querySelectorAll("[aria-labelledby]");

for (let i=0; i<x.length; i++) {
	x[i].removeAttribute("aria-label");
}

for (let i=0; i<y.length; i++) {
	y[i].removeAttribute("aria-labelledby");
}