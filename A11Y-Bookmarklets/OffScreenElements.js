function isOffScreen(element) {
	let rect = element.getBoundingClientRect();
	let isElementOffScreen = false;
	
	if (rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight) {
		isElementOffScreen = true;
		
		let elementTop = rect.top + window.pageYOffset;
		window.scrollTo(0, elementTop);
		rect = element.getBoundingClientRect();
		if (rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight) {
			isElementOffScreen = true;
		}
		else {
			isElementOffScreen = false;
		}
	}
	else {
		isElementOffScreen = false;
	}
	return isElementOffScreen;
}

// Example usage:
let elements = document.querySelectorAll("*");
let visibleElementCount = 0;
let offScreenElements = [];

for (let i=0; i<elements.length; i++) {
	if (isOffScreen(elements[i])) {
		offScreenElements.push(elements[i]);
	}
	else {
		visibleElementCount++;
	}
}

for (let i=0; i<offScreenElements.length; i++) {
	for (let j=1; j<offScreenElements.length; j++) {
		if (offScreenElements[i].contains(offScreenElements[j])) {
			offScreenElements.splice(j, 1);
		}
		else {
			break;
		}
	}
}

for (let i=0; i<offScreenElements.length; i++) {
		console.log(offScreenElements[i].innerText + " Is hidden");
}
console.log("Total elements: " + elements.length);
console.log("Visible elements: " + visibleElementCount);
console.log("Offscreen elements: " + offScreenElements.length);