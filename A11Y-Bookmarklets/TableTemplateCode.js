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

