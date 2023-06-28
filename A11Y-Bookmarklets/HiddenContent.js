let count = 1;

function createA11YResultSection(IDSuffix) {
	let IDValue = "a11yResult" + IDSuffix;
	let section = document.createElement("section");
	section.setAttribute("id", IDValue);
	section.setAttribute("aria-label", IDSuffix + " Result");
	document.body.appendChild(section);
	return IDValue;
}

function createA11YResultTable(IDValue) {
	let table = document.createElement("table");
	table.setAttribute("id", IDValue + "Table");
	table.setAttribute("role", "table");
	document.querySelector("#" + IDValue).appendChild(table);
}

function createA11YResultTableCell(data) {
	let cell = document.createElement("td");
	cell.innerText = data;
	return cell;
}

function createA11YResultTableRowHeader(IDValue, details) {
	let row = document.createElement("tr");
	row.setAttribute("role", "row");
	row.setAttribute("id", IDValue + "TableColumnwHeader");
	
	for (let i=0; i<details.length; i++) {
		let td = createA11YResultTableCell(details[i]);
		row.appendChild(td);
	}
	document.querySelector("#" + IDValue + "Table").appendChild(row);
}

function createA11YResultTableRowBody(IDValue, details, element) {
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
	
	document.querySelector("#" + IDValue + "Table").appendChild(row);
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

function headerCellMarkUpForResultTable(IDValue) {
	let th = document.querySelectorAll(IDValue + "TableColumnwHeader td");
	let td = document.querySelectorAll(IDValue + "Table tr td:first-child");
	
	for (let i=0; i<th.length; i++) {
		th[i].setAttribute("role", "columnheader")
	}
	
	for (let i=1; i<td.length; i++) {
		td[i].setAttribute("role", "rowheader")
	}
}

function isElementOffScreen(element) {
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

function isElementSizeZero(element) {
	let isElementSizeZero = false;
	let elementStyles = window.getComputedStyle(element, null);
	let elementWidth = parseFloat(elementStyles.width);
	let elementHeight = parseFloat(elementStyles.height);
	
	if (elementWidth === 0 && elementHeight === 0) {
		isElementSizeZero = true;
	}
	else {
		isElementSizeZero = false;
	}
	return isElementSizeZero;
}

function isElementHiddenThroughOpacityOrTransparentBackground(element) {
	let elementStyles = window.getComputedStyle(element);
	
	// Check if the element is explicitly hidden by opacity
	let opacity = parseFloat(elementStyles.getPropertyValue('opacity'));
	let isHiddenByOpacity = opacity === 0;
	
	// Check if the element is explicitly hidden by transparent background
	let backgroundColor = elementStyles.getPropertyValue('background-color');
	let isHiddenByTransparentBackground = backgroundColor === 'transparent';
	
	// Return true if the element is explicitly hidden by either opacity or transparent background
	return isHiddenByOpacity || isHiddenByTransparentBackground;
}

function isElementHidden(element) {
	let hidden = false;
	
	if (isElementOffScreen(element) == true) {
		hidden = true;
	}
	else if (isElementSizeZero(element) == true) {
		hidden = true;
	}
	else if (isElementHiddenThroughOpacityOrTransparentBackground(element) == true) {
		hidden = true;
	}
	return hidden;
}

function gatherElementDetails(element) {
	let details = [];
	details.push(element.innerText);
	details.push(element.innerHTML);
	return details;
}

function mainFunction(elements) {
	let tableColumnHeaders = ["ID", "Hidden Content", "SRC", "Action"];
	let IDValue = createA11YResultSection("HiddenContent");
	createA11YResultTable(IDValue);
	createA11YResultTableRowHeader(IDValue, tableColumnHeaders);
	let parentHiddenElement = 0;
	
	for (let i=0; i<elements.length; i++) {
		let isHidden = isElementHidden(elements[i]);
		if (isHidden == true) {
			if (parentHiddenElement == 0) {
				parentHiddenElement = elements[i];
			}
			else if (parentHiddenElement.contains(elements[i])) {
				continue;
			}
			let elementDetails = gatherElementDetails(elements[i]);
			createA11YResultTableRowBody(IDValue, elementDetails, elements[i]);
			count++;
			parentHiddenElement = elements[i];
		}
	}
	headerCellMarkUpForResultTable(IDValue);
}

//MAIN PROGRAM
let selectorOfSectionToBeProcessed = prompt("Enter the selector of section you want to automate (Enter 'body' if you want to process entire page):", "body");
let elementss = document.querySelectorAll(selectorOfSectionToBeProcessed + " *");
mainFunction(elementss);
alert("Processing finished!");