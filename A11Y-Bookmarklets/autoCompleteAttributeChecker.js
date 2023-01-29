function checkAutoCompleteAttribute(field) {
	let p = document.createElement("p");
	
	if (field.hasAttribute("autocomplete")) {
		let result = 'autocomplete="' + field.getAttribute("autocomplete") + '"';
		p.innerText = result;
		field.parentNode.insertBefore(p, field.nextSibling);
		field.setAttribute("aria-description", result);
	}
	else {
		let result = 'MISSING: autocomplete attribute';
		p.innerText = result;
		field.parentNode.insertBefore(p, field.nextSibling);
		field.setAttribute("aria-description", result);
	}
}


/*MAIN PROGRAM*/
let fields = document.querySelectorAll("input, textarea");

for (let i=0; i<fields.length; i++) {
	if ((fields[i].getAttribute("type") == "hidden") || (fields[i].getAttribute("type") == "submit") || (fields[i].getAttribute("type") == "checkbox") || (fields[i].getAttribute("type") == "radio")) {
		continue;
	}
	else {
		checkAutoCompleteAttribute(fields[i]);
	}
}

alert("Processing finished!");