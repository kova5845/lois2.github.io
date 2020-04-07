// Лабораторная работа 2 по дисциплине ЛОИС
// Выполнена студентом группы 721701 БГУИР Коваленко Алексеем Васильевичем
// Проверить является ли формула СДНФ
// 24.02.2020
//
// https://learn.javascript.ru автор Коваленко Алексей
//

var yes_number = 0;
var no_number = 0;
var symbols = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
var answer = true;


function replaceF(str){
    let frm = ['(f&f)', '(f|f)', '(f->f)', '(f~f)', '(!f)'];
    let num = Math.floor(Math.random()*frm.length);
    return str.replace('f', frm[num]);
}

function replaceS(str){
    let num = Math.floor(Math.random()*symbols.length);
    s = symbols[num];
    return str.replace('f',s);
}

function generate() {
    let str = 'f';
    let num = Math.floor(Math.random()*5);
    for (let i = 0; i < num; i++){
        str = replaceF(str);
    }
    while (str != str.replace('f','')){
        str = replaceS(str);
    }
    return str;
}

function error(arr){
    console.log(arr);
    let num = Math.floor(Math.random()*(arr.length-1) + 1);
    let ran = Math.floor(Math.random()*2);
    if (ran == 0){
        answer = false;
        if (arr[num][arr[num].length-1] == '0'){
            arr[num][arr[num].length-1] = '1';
        }
        else{
            arr[num][arr[num].length-1] = '0';
        }
    }
    else{
        answer = true;
    }
    return arr;
}

function generate_formula() {
    let str = generate();
    console.log(str);
    tab = document.createElement('table');
    arr = parse(str);
    arr1 = error(arr);
    document.getElementById('lab').innerHTML = str;
	createTable(tab, arr1);
}

function yes () {
	if(answer){
		yes_number++;
		document.getElementById("yes").innerHTML = yes_number;
	}
	else {
		no_number++;
		document.getElementById("no").innerHTML = no_number;
	}
	generate_formula();
}

function no () {
	if(!answer){
		yes_number++;
		document.getElementById("yes").innerHTML = yes_number;
	}
	else {
		no_number++;
		document.getElementById("no").innerHTML = no_number;
	}
	generate_formula();
}