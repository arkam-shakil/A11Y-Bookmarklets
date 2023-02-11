function getPseudoElementForgroundColor(element, pseudoElement) {
	let computedStyle = window.getComputedStyle(element, pseudoElement);
	return computedStyle.getPropertyValue("color");
}

function getPseudoElementBackgroundColor(element) {
	let computedStyle = window.getComputedStyle(element.parentNode);
	return computedStyle.getPropertyValue("background-color");
}

let element = document.querySelector("body > div.idm-main > div:nth-child(5) > div > div.row > div:nth-child(2) > p.normal-text.text-center > a > i");
let pseudoElementForgroundColor = getPseudoElementForgroundColor(element, "::before");
let pseudoElementBackgroundColor = getPseudoElementBackgroundColor(element);
alert(pseudoElementForgroundColor + pseudoElementBackgroundColor);
