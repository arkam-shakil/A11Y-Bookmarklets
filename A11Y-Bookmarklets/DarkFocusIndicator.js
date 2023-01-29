let elements = document.querySelectorAll("a, button, [role='button'], [role='link'], input, textarea, select, [tabindex='0']");

for (let i=0; i<elements.length; i++) {
	elements[i].addEventListener("focus", function() {
		elements[i].setAttribute("style", "color: white; background-color: black;");
	});
	
	elements[i].addEventListener("blur", function() {
		elements[i].removeAttribute("style");
	});
}

alert("Processing finished!");