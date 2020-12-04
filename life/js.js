const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
let mas=[];
let timer;

canvas.onclick = function(event){
	let x = event.offsetX; //определяю нахождение мыши относительно canvas
	let y = event.offsetY;//определяю нахождение мыши относительно canvas
	x = Math.floor(x/10); //300 /10 = 30 - перевожу поле из 300 пикселей, в поле из 30 КУБИКОВ по 10 пикс.
	y = Math.floor(y/10); //300 /10 = 
	mas[y][x]=1;//заполнение игрового поля, куда
	drawField();
}

function goLife(){ //объявляю игрово поле
	let n=30, m=30;  //ось по ху
	for (let i=0; i<m; i++){ 	 // 
		mas[i]=[];				 //Заполняю массивом поле
		for (let j=0; j<n; j++){ // 
			mas[i][j]=0;		 // 
		}
	}
}
goLife();

function drawField(){
	ctx.clearRect(0, 0, 300, 300); //чищу все поле

	//запускаю перебор по массивам.
	for (let i=0; i<30; i++){
		for (let j=0; j<30; j++){
			if (mas[i][j]==1){
				ctx.fillRect(j*10, i*10, 10, 10);
			}
		}
	}
}

function startLife(){
	//моделирование жизни. если у клетки 2-3 живых соседа, то живет. 
	let mas2 = [];
	for (let i=0; i<30; i++){ //
		mas2[i]=[]; //
		for (let j=0; j<30; j++){  // перебор массива
			let neighbors = 0;  //считаю кол-во соседей
			if (mas[fpm(i)-1][j]==1) neighbors++;//верх. КРАЕВОЕ УСЛОВИЕ
			if (mas[i][fpp(j)+1]==1) neighbors++;//право. КРАЕВОЕ УСЛОВИЕ
			if (mas[fpp(i)+1][j]==1) neighbors++;//низ. КРАЕВОЕ УСЛОВИЕ
			if (mas[i][fpm(j)-1]==1) neighbors++;//лево. КРАЕВОЕ УСЛОВИЕ
			//диагональ
			if (mas[fpm(i)-1][fpp(j)+1]==1) neighbors++; // вправо вверх
			if (mas[fpp(i)+1][fpp(j)+1]==1) neighbors++;//вправо вверх
			if (mas[fpp(i)+1][fpm(j)-1]==1) neighbors++;//влево ввниз
			if (mas[fpm(i)-1][fpm(j)-1]==1) neighbors++;//влево верх
			(neighbors==2 || neighbors==3) ? mas2[i][j]=1 : mas2[i][j]==0;   //проверка на соседей. еЕсли кол-во соседей =2 или 3
																			//то mas2 =1(зарождается жизнь), в противнорм случае =смерть 0
		}
	}
	mas = mas2; //миру mas , присваиваю новое состояние (mas2)  и запускаю отрисовку 
	drawField();
	timer = setTimeout(startLife, 300);
}

function fpm(i){  //если при краевом массиве параметр =0, то возвращается 30
	if(i==0) return 30; 
	else return i;
}
function fpp(i){  //если при краевом массиве параметр =29, то возвращается 0
	if(i==29) return -1;
	else return i;
}

document.getElementById('start').onclick = startLife;