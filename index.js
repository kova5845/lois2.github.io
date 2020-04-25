// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнена студентом группы 721701 БГУИР Коваленко Алексеем Васильевичем
// Проверить является ли формула СДНФ
// 24.02.2020
//
// https://learn.javascript.ru автор Коваленко Алексей
//

var symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function replaceSymbols(str, arrOfSymbols, arr) {
	console.log(arr);
	let newStr = str;
	for (let i = 0; i < arrOfSymbols.length; i++) {
		newStr = newStr.replace(new RegExp(arrOfSymbols[i], 'g'), arr[i]);
	}
	let i = 0;
	while(newStr.length > 1) {
		newStr = newStr.replace(/!1/g, '0');
		newStr = newStr.replace(/!0/g, '1');

		newStr = newStr.replace(/0&0/g, '0');
		newStr = newStr.replace(/0&1/g, '0');
		newStr = newStr.replace(/1&0/g, '0');
		newStr = newStr.replace(/1&1/g, '1');

		newStr = newStr.replace(/0\|0/g, '0');
		newStr = newStr.replace(/0\|1/g, '1');
		newStr = newStr.replace(/1\|0/g, '1');
		newStr = newStr.replace(/1\|1/g, '1');

		newStr = newStr.replace(/0->0/g, '1');
		newStr = newStr.replace(/0->1/g, '1');
		newStr = newStr.replace(/1->0/g, '0');
		newStr = newStr.replace(/1->1/g, '1');

		newStr = newStr.replace(/0~0/g, '1');
		newStr = newStr.replace(/0~1/g, '0');
		newStr = newStr.replace(/1~0/g, '0');
		newStr = newStr.replace(/1~1/g, '1');

		newStr = newStr.replace(/\(0\)/g,'0');
		newStr = newStr.replace(/\(1\)/g,'1');

		i++;
	}
	arr[arr.length - 1] = newStr;
}

function toBinaryString(str, number_of_var){
	while(str.length < number_of_var){
		str = '0' + str;
	}
	return str;
}

function arrOfTable(str){
	let arr = new Array();
	for (let i = 0; i < str.length; i++){
		if(symbols.includes(str[i])){
			symbols = symbols.replace(str[i], "");
			arr.push(str[i]);
		}
	}
	return arr;
}

function createArray(arr){
	let number_of_var = arr.length;
	let row = Math.pow(2, number_of_var) + 1;
	let col = number_of_var + 1;
	let table = new Array();
	for (let i = 0; i < row; i++){
	    table[i] = [];
	    for (let j = 0; j < col; j++)
	        table[i][j] = 0;
	}
	for (let i = 1; i < row; i++){
	    let str = (i - 1).toString(2);
	    str = toBinaryString(str, number_of_var);
	    for (let j = 0; j < col - 1; j++)
	        table[i][j] = parseInt(str[j], 10);
	}
	for(let i = 0; i < col - 1; i++){
		table[0][i] = arr[i];
	}
	table[0][col - 1] = "";
	return table;
}

function createTable(table, arr){
	let cells = new Array();
	for(let i = 0; i < cells.length; i++){
		cells[i].remove();
	}
	for(let i = 0; i < arr.length; i++){
		let tr = document.createElement("tr");

		for(let j = 0; j < arr[i].length; j++){
			let td = document.createElement("td");
			td.innerHTML = arr[i][j];
			cells.push(tr.appendChild(td));
		}
		cells.push(table.appendChild(tr));
	}
}

function isFormula(str){
	if (str.replace('f', '') != str){
		return false;
	}
	let length = str.length + 1;
	while (length > str.length){
		length = str.length;
		str = str.replace(/\([A-Zf0-1](&|\||->|~)[A-Zf0-1]\)|\(![A-Zf0-1]\)|[A-Zf0-1]/g,"f")
	}
	console.log(str);
	if(str == "f")
		return true;
	else {
		console.log("isFormula")
		return false;
	}
}

function clear(){
	document.getElementById("lab").innerHTML = '';
	if (document.getElementById('tab'))
		document.getElementById('tab').parentNode.removeChild(document.getElementById('tab'));
	vars = document.getElementById('vars');
	while (vars.firstChild) {
		vars.removeChild(vars.firstChild);
	}
	return null;
}

function parse(str) {
	symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	if (!isFormula(str)){
		document.getElementById("lab").innerHTML = 'Это не формула';
		return null;
	}
	let arrOfSymbols = arrOfTable(str);
	let arr = createArray(arrOfSymbols);
	for(let i = 1; i < arr.length; i++){
		replaceSymbols(str, arrOfSymbols, arr[i]);
	}
	if (document.getElementById('tab'))
		document.getElementById('tab').parentNode.removeChild(document.getElementById('tab'));
	let table = document.querySelector('#table');
	tab = document.createElement('table');
	tab.id = 'tab';
	table.appendChild(tab)

	return arr;
}

function deleteVars(arr){
	err = document.getElementById('err');
	err.innerHTML = '';
	vars = document.getElementById('vars');
	if (arr.length > 0){
		console.log(arr);
		for (let i = 0; i < arr[0].length - 1; i++){
			let el = document.getElementById(arr[0][i]).value;
			if (parseInt(el) != 0 && parseInt(el) != 1 && el != ''){
				err.innerHTML = 'Некорректные переменные';
				return null;
			}
			for (let j = 1; j < arr.length; j++){
				if(arr[j][i] !== parseInt(el) && el !== ''){
					arr.splice(j, 1);
					j--;
				}
			}
		}
	}
	return arr;
}

function write_answer(str){
	tab = document.createElement('table');
	arr = parse(str);
	arr = deleteVars(arr);
	if (arr != null){
		createTable(tab, arr);
	}
}

function write_vars(str){
	symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	vars = document.getElementById('vars');
	clear();
	if (!isFormula(str)){
		document.getElementById("lab").innerHTML = 'Это не формула';
		return null;
	}
	arr = arrOfTable(str);
	for (a in arr){
		text = document.createElement('label');
		text.innerHTML = arr[a] + '= ';
		field = document.createElement('input');
		field.id = arr[a];
		field.type = 'text';
		field.size = '5';
		vars.appendChild(text);
		vars.appendChild(field);
	}
}

// (A&B)|(A&!B)