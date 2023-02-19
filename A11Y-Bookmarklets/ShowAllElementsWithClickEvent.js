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
	let details = ["ID", "Element Name", "Element Type", "Function Names", "SRC", "Action"];
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

function mainFunction() {
	let selectorOfSectionToBeProcessed = prompt("Enter the selector of section you want to automate (Enter 'body' if you want to process entire page):", "body");
	let elements = document.querySelectorAll(selectorOfSectionToBeProcessed + " *");
	let clickedElements = Array.from(elements).filter(function(element) {
		let listeners = getEventListeners(element);
		return listeners && listeners.click && listeners.click.length > 0;
	});
	
	createA11YResult();
	createA11YResultTable();
	createA11YResultTableRowHeader();
	
	for (let i=0; i<clickedElements.length; i++) {
		let details = [];
		let functionNames = getEventListeners(clickedElements[i]).click.map(listener => listener.name);
		
		details.push(clickedElements[i].innerText);
		details.push(clickedElements[i]);
		details.push(functionNames);
		details.push(clickedElements[i].parentNode.innerHTML);
		createA11YResultTableRowBody(details, clickedElements[i]);
		count++;
	}
	headerCellMarkUpForResultTable();
}

mainFunction();
alert("Processing finished!");