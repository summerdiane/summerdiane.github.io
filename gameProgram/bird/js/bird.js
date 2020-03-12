var mainBox = document.getElementById('mainBox');
var gameBox = document.getElementById('gameBox');
var bird = document.getElementById('birdBox');
var bg = document.getElementById('bg');
var start = document.getElementById('start');
var startBox = document.getElementById('startBox');
var over = document.getElementById('over');
var again = document.getElementById('again');
var creatTClass = document.getElementsByClassName('creatTClass');
var creatBClass = document.getElementsByClassName('creatBClass');
var gameCount = document.getElementById('gameCount');
var bH = 0;
var birdDownTimer;
var birdFlyTimer;
var bgMoveTimer;
var bgRemove = true;
var isAgain = false;

// 游戏开始
start.onclick = gameStart;
function gameStart() {
	startBox.hidden = true;
	gameBox.hidden = false;
	if(!isAgain){
		gameBox.onclick = birdFly;
	}else{
		bH = 0;
		birdFly();
	}
}

//自由下坠
function birdDown() {
	birdDownTimer = setInterval(function() {
		bH += 3;
		bird.style.top = 200 + bH + "px";
		if (bH >= 260) {
			gameover();
		}
	}, 10)
};

// 点击上飞
function birdFly() {
	var count = 0;
	clearInterval(birdDownTimer);
	gameBox.onclick = null;
	birdFlyTimer = setInterval(function() {
		count++;
		bH -= 5;
		if (count == 10) {
			clearInterval(birdFlyTimer);
			birdDown();
			gameBox.onclick = birdFly;
		} else if (bH <= -200) {
			gameover();
		}
		bird.style.top = 200 + bH + "px";
	}, 10);
	if (bgRemove) {
		bgMove();
	};
	bgRemove = false;
}

//水管增加
var leftI = 400;
function creat() {
	var a = 210;
	var b = randomNumber(-180, 100);
	var c = randomNumber(10, 80);
	var creatT = document.createElement('div');
	creatT.style.cssText = 'width: 50px;background-color: royalblue;position: absolute;top: 0;'
	creatT.className = 'creatTClass';
	creatT.style.height = a - b - c + "px";
	creatT.style.left = leftI + "px";
	bg.appendChild(creatT);
	var creatB = document.createElement('div');
	creatB.style.cssText = 'width: 50px;background-color: royalblue;position: absolute;bottom: 0;'
	creatB.className = 'creatBClass';
	creatB.style.height = a + b + "px";
	creatB.style.left = leftI + "px";
	bg.appendChild(creatB);
	leftI += 200;
	if (leftI > 10000) {
		clearInterval(creatITimer);
	}
}
var creatITimer = setInterval(creat, 2000);

//背景增加
for(var i = 0;i<=20;i++){
	var creatBg = document.createElement('img');
	creatBg.src = 'img/startBg.jpg';
	creatBg.style.cssText = 'width: 500px;height: 500px;float: left;'
	bg.appendChild(creatBg);
}

// 碰撞检测与背景移动
function bgMove() {
	var count = 0;
	var i = -1;
	bgMoveTimer = setInterval(function() {
		count++;
		bg.style.left = -count + "px";
		if (count > 150 && (count - 150) % 200 <= 100 && (count - 150) % 200 != 0) {
			i++;
			var j = Math.floor(i / 100);
			var creatTH = creatTClass[j].style.height;
			var creatBH = creatBClass[j].style.height;
			creatTH = creatTH.split("px");
			creatBH = creatBH.split("px");
			if (200 + bH - creatTH[0] < 0 || 200 + bH + 30 - (500 - creatBH[0]) > 0) {
				gameover();
			}
			gameCount.innerHTML = "积分:" + (j + 1);
		}
	}, 10)
}


// 游戏结束
function gameover() {
	clearInterval(birdDownTimer);
	clearInterval(birdFlyTimer);
	clearInterval(bgMoveTimer);
	clearInterval(creatITimer);
	over.hidden = false;
	again.hidden = false;
	gameBox.onclick = null;
}

// 重新开始
again.onclick = playAgain;
function playAgain(){
	gameBox.hidden = true;
	over.hidden = true;
	again.hidden = true;
	startBox.hidden = false;
	bgRemove = true;
	isAgain = true;
	leftI = 400;
	while(1){
		creatTClass[0].remove();
		creatBClass[0].remove();
		if(!creatTClass[0]){
			break;
		}
	}
	creatITimer = setInterval(creat, 2000);
}


































//封装一个随机数函数！！
function randomNumber(a, b) {
	//产生随机数
	var n = Math.floor(Math.random() * (b - a + 1) + a);
	//返回出去
	return n;
}

//禁止选中页面内字
document.body.onselectstart = document.body.ondrag = function() {
	return false;
}
