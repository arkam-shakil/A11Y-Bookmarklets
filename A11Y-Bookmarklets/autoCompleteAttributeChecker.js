function checkAutoCompleteAttribute(field) {
	let p = document.createElement("p");
	
	if (field.hasAttribute("autocomplete")) {
		p.innerText = 'autocomplete="' + field.getAttribute("autocomplete") + '"';
		field.insertBefore(p, field.parent);
	}
	else {
		p.innerText = 'autocomplete="' + field.getAttribute("autocomplete") + '"';
		field.insertBefore(p, field.parent);
	}
}

let fields = document.querySelectorAll("input, textarea");

for (let i=0; i<fields.length; i++) {
	if ((fields[i].getAttribute("type") == "hidden") || (fields[i].getAttribute("type") == "submit")) {
		continue;
	}
	else {
		checkAutoCompleteAttribute(fields[i]);
	}
}

alert("HEY");