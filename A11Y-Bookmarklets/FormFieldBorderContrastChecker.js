let count = 1;

function showDetailsAdjacentToRespectedElement(details, element) {
	let p = document.createElement("p");
	
	let result = "Visual boundary color: " + details[0] + "; Background: " + details[1] + "; Current contrast ratio: " + details[3];
	p.innerText = result;
	element.parentNode.insertBefore(p, element.nextSibling);
	element.setAttribute("aria-description", result);
}

function headerCellMarkUpForResultTable() {
	let th = document.querySelectorAll("#a11yContrastResultTableColumnwHeader td");
	let td = document.querySelectorAll("#a11yContrastResultTable tr td:first-child");

	for (let i=0; i<th.length; i++) {
		th[i].setAttribute("role", "columnheader")
	}

	for (let i=1; i<td.length; i++) {
		td[i].setAttribute("role", "rowheader")
	}
}

function actionButtonForFocusing(element) {
	let btn = document.createElement("button");
	let cell = document.createElement("td");
	btn.innerText = "Focus It";

	btn.addEventListener("click", function () {
		element.focus();
	});

	cell.appendChild(btn);
	return cell;
}

function createA11YContrastResult() {
	let section = document.createElement("section");
	section.setAttribute("id", "a11yContrastResult");
	section.setAttribute("aria-label", "Contrast Result");
	document.body.appendChild(section);
}

function createA11YContrastResultTable() {
	let table = document.createElement("table");
	table.setAttribute("id", "a11yContrastResultTable");
	table.setAttribute("role", "table");
	document.querySelector("#a11yContrastResult").appendChild(table);
}

function createA11YContrastResultTableCell(data) {
	let cell = document.createElement("td");
	cell.innerText = data;
	return cell;
}

function createA11YContrastResultTableRowHeader() {
	let details = ["ID", "Border Color", "Inner Background Color", "Outter Background Color", "Inner Contrast Ratio", "Outter Contrast Ratio", "SRC", "Action"];
	let row = document.createElement("tr");
	row.setAttribute("role", "row");
	row.setAttribute("id", "a11yContrastResultTableColumnwHeader");

	for (let i=0; i<details.length; i++) {
		let td = createA11YContrastResultTableCell(details[i]);
		row.appendChild(td);
	}
	document.querySelector("#a11yContrastResultTable").appendChild(row);
}

function createA11YContrastResultTableRowBody(details, element) {
	let row = document.createElement("tr");
	row.setAttribute("role", "row");

	let tdCount = createA11YContrastResultTableCell(count);
	row.appendChild(tdCount);

	for (let i=0; i<details.length; i++) {
		let td = createA11YContrastResultTableCell(details[i]);
		row.appendChild(td);
	}
	let actionCell = actionButtonForFocusing(element);
	row.appendChild(actionCell);

	document.querySelector("#a11yContrastResultTable").appendChild(row);
}

function rgbToHex(rgb) {
	for (let i=0; i<rgb.length; i++) {
		rgb[i] = parseInt(rgb[i]);
		
	}
	let r = rgb[0].toString(16);
	let g = rgb[1].toString(16);
	let b = rgb[2].toString(16);
	let hex = r + g + b;
	hex = hex.toUpperCase();
	return "#" + hex;
}

function sum(a) {
	let result = 0;
	for (let i=0; i<a.length; i++) {
		let j = parseInt(a[0]);
		result += j;
	}
	return result;
}

function getBorderColorCode(element) {
	let styles = getComputedStyle(element);
	let borderColor = styles.getPropertyValue("border-color");
	let formattedColor1 = borderColor.split("(");
	let formattedColor2 = formattedColor1[1].split(")");
	let finalColor = formattedColor2[0].split(",");
	return finalColor;
}

function getOutterBackgroundColorCode(e) {
	let element = e.parentNode;
	let styles = getComputedStyle(element);
	let backgroundColor = styles.getPropertyValue("background-color");
	let formattedColor1 = backgroundColor.split("(");
	let formattedColor2 = formattedColor1[1].split(")");
	let finalColor = formattedColor2[0].split(",");
	return finalColor;
}

function getInnerBackgroundColorCode(element) {
	let styles = getComputedStyle(element);
	let backgroundColor = styles.getPropertyValue("background-color");
	let formattedColor1 = backgroundColor.split("(");
	let formattedColor2 = formattedColor1[1].split(")");
	let finalColor = formattedColor2[0].split(",");
	return finalColor;
}

function calculate_luminace(color_code) {
	let index = parseFloat(color_code) / 255;
	if (index < 0.03928) {
		return index / 12.92;
	}
	else {
		return ( ( index + 0.055 ) / 1.055 ) ** 2.4;
	}
}

function calculate_relative_luminance(rgb) {
	return 0.2126 * calculate_luminace(rgb[0]) + 0.7152 * calculate_luminace(rgb[1]) + 0.0722 * calculate_luminace(rgb[2]);
}


function calculateContrastRatio(element) {
	let details = [];

	let borderColor = getBorderColorCode(element);
	let innerBackgroundColor = getInnerBackgroundColorCode(element);
	let outterBackgroundColor = getOutterBackgroundColorCode(element);

	let light = 0;
	let dark = 0;
	if (sum(borderColor) > sum(innerBackgroundColor)) {
		light = borderColor;
	}
	else {
		light = innerBackgroundColor;
	}
	if (sum(borderColor) < sum(innerBackgroundColor)) {
		dark = borderColor;
	}
	else {
		dark = innerBackgroundColor;
	}

	let contrast_ratio = ( calculate_relative_luminance(light) + 0.05 ) / ( calculate_relative_luminance(dark) + 0.05 );
	let finalContrastRatio = contrast_ratio.toFixed(1) + ":1";

	details.push(rgbToHex(borderColor));
	details.push(rgbToHex(innerBackgroundColor));
	details.push(rgbToHex(outterBackgroundColor));
	details.push(finalContrastRatio);

	light = 0;
	dark = 0;
	if (sum(borderColor) > sum(outterBackgroundColor)) {
		light = borderColor;
	}
	else {
		light = outterBackgroundColor;
	}
	if (sum(borderColor) < sum(outterBackgroundColor)) {
		dark = borderColor;
	}
	else {
		dark = outterBackgroundColor;
	}

	contrast_ratio = ( calculate_relative_luminance(light) + 0.05 ) / ( calculate_relative_luminance(dark) + 0.05 );
	finalContrastRatio = contrast_ratio.toFixed(1) + ":1";
//alert(finalContrastRatio);
	details.push(finalContrastRatio);
	details.push(element.parentNode.innerHTML);

	return details;
}

function mainFunction(elements) {
	createA11YContrastResult();
	createA11YContrastResultTable();
	createA11YContrastResultTableRowHeader();

	for (let i=0; i<elements.length; i++) {
		if ((elements[i].getAttribute("type") == "hidden") || (elements[i].getAttribute("type") == "submit") || (elements[i].getAttribute("type") == "image") || (elements[i].getAttribute("type") == "button") || (elements[i].getAttribute("type") == "color") || (elements[i].getAttribute("type") == "file") || (elements[i].getAttribute("type") == "range") || (elements[i].getAttribute("type") == "reset")) {
			continue;
		}
		let contrastRatioDetails = calculateContrastRatio(elements[i]);
		createA11YContrastResultTableRowBody(contrastRatioDetails, elements[i]);
		showDetailsAdjacentToRespectedElement(contrastRatioDetails, elements[i]);
		count++;
	}
	headerCellMarkUpForResultTable();
}

let selectorOfSectionToBeProcessed = prompt("Enter the selector of section you want to automate (Enter 'body' if you want to process entire page):", "body");
let elements = document.querySelectorAll(selectorOfSectionToBeProcessed + " input, textarea");
mainFunction(elements);

alert("Processing finished!");