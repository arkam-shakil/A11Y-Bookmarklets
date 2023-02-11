let count = 1;

function headerCellMarkUpForResultTable() {
	let th = document.querySelectorAll("#a11yResultTableColumnwHeader td");
	let td = document.querySelectorAll("#a11yResultTable tr td:first-child");

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
	element.setAttribute("tabindex", "-1");

	btn.addEventListener("click", function () {
		element.focus();
	});

	cell.appendChild(btn);
	return cell;
}

function createA11YResult() {
	let section = document.createElement("section");
	section.setAttribute("id", "a11yResult");
	section.setAttribute("aria-label", "Result");
	document.body.appendChild(section);
}

function createA11YResultTable() {
	let table = document.createElement("table");
	table.setAttribute("id", "a11yResultTable");
	table.setAttribute("role", "table");
	document.querySelector("#a11yResult").appendChild(table);
}

function createA11YResultTableCell(data) {
	let cell = document.createElement("td");
	cell.innerText = data;
	return cell;
}

function createA11YResultTableRowHeader() {
	let details = ["ID", "Content", "Inserted Using", "Forground Color", "SRC", "Action"];
	let row = document.createElement("tr");
	row.setAttribute("role", "row");
	row.setAttribute("id", "a11yResultTableColumnwHeader");

	for (let i=0; i<details.length; i++) {
		let td = createA11YResultTableCell(details[i]);
		row.appendChild(td);
	}
	document.querySelector("#a11yResultTable").appendChild(row);
}

function createA11YResultTableRowBody(details, element) {
	let row = document.createElement("tr");
	row.setAttribute("role", "row");

	let tdCount = createA11YResultTableCell(count);
	row.appendChild(tdCount);

	for (let i=0; i<details.length; i++) {
		let td = createA11YResultTableCell(details[i]);
		row.appendChild(td);
	}
	let actionCell = actionButtonForFocusing(element);
	row.appendChild(actionCell);

	document.querySelector("#a11yResultTable").appendChild(row);
}

function getPseudoElementForgroundColor(element, pseudoElement) {
	let computedStyle = window.getComputedStyle(element, pseudoElement);
	return computedStyle.getPropertyValue("color");
}

function formatRGBColorCode(RGBColor) {
	let formattedColor1 = RGBColor.split("(");
	let formattedColor2 = formattedColor1[1].split(")");
			let finalColorCode = formattedColor2[0].split(",");
	return finalColorCode;
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

function mainFunction() {
	let elements = document.querySelectorAll("*");
	createA11YResult();
	createA11YResultTable();
	createA11YResultTableRowHeader();

	for (let element of elements) {
		let computedStyleBefore = window.getComputedStyle(element, "::before");
		let computedStyleAfter = window.getComputedStyle(element, "::after");
		let details = [];
		
		if (window.getComputedStyle(element, null).display == "none") {
			continue;
		}
		else {
			if (computedStyleBefore.content !== "none") {
				let RGBColor = getPseudoElementForgroundColor(element, "::after");
				let formattedRGBColorCode = formatRGBColorCode(RGBColor);
				let PseudoElementForgroundColor = rgbToHex(formattedRGBColorCode);
				
				details.push(computedStyleBefore.content);
				details.push("::before");
				details.push(PseudoElementForgroundColor);
				details.push(element.parentNode.innerHTML);
				createA11YResultTableRowBody(details, element.parentNode);
				count++;
			}
			if (computedStyleAfter.content !== "none") {
				let RGBColor = getPseudoElementForgroundColor(element, "::after");
				let formattedRGBColorCode = formatRGBColorCode(RGBColor);
				let PseudoElementForgroundColor = rgbToHex(formattedRGBColorCode);
				
				details.push(computedStyleBefore.content);
				details.push("::after");
				details.push(PseudoElementForgroundColor);
				details.push(element.parentNode.innerHTML);
				createA11YResultTableRowBody(details, element.parentNode);
				count++;
			}
		}
	}
	headerCellMarkUpForResultTable();
}

mainFunction();
alert("Processing finished!");