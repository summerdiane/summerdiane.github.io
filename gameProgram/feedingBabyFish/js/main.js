var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic=new Image();

var ane;

var fruit;

var big;
var small;

var mx;
var my;

var smallTail=[];
var smallEye=[];
var smallBody=[];

var bigTail=[];
var bigEye=[];
var bigBodyOra=[];
var bigBodyBlue=[];

var data=[];
var over0=new Image();
var over1=new Image();

var wave;
var halo;

var dust;
var dustPic = [];

document.body.onload=game;
function game()
{
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}

function init()
{
	//获得canvas context
	can1=document.getElementById("canvas1");//fishes,dust,UI,circle
	ctx1=can1.getContext("2d");
	can2=document.getElementById("canvas2");//background,ane,fruits
	ctx2=can2.getContext("2d");

	can1.addEventListener('mousemove',onMouseMove,false);

	bgPic.src="./src/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;

	ane=new aneObj();
	ane.init();

	fruit=new fruitObj();
	fruit.init();

	big=new bigObj();
	big.init();

	small=new smallObj();
	small.init();

	data=new dataObj();
	over0.src="./src/a.jpg";
	over1.src="./src/b.jpg";

	mx=canWidth*0.5;
	my=canHeight*0.5;

	for(var i=0;i<8;i++)
	{
		smallTail[i]=new Image();
		smallTail[i].src="./src/babyTail"+i+".png";
	}
	for(var i=0;i<2;i++)
	{
		smallEye[i]=new Image();
		smallEye[i].src="./src/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++)
	{
		smallBody[i]=new Image();
		smallBody[i].src="./src/babyFade"+i+".png";
	}

	for(var i=0;i<8;i++)
	{
		bigTail[i]=new Image();
		bigTail[i].src="./src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++)
	{
		bigEye[i]=new Image();
		bigEye[i].src="./src/bigEye"+i+".png";
	}
	for(var i=0;i<8;i++)
	{
		bigBodyOra[i]=new Image();
		bigBodyBlue[i]=new Image();
		bigBodyOra[i].src="./src/bigSwim"+i+".png";
		bigBodyBlue[i].src="./src/bigSwimBlue"+i+".png";		
	}

	ctx1.font = "25px Verdana";
	ctx1.textAlign = "center";

	for(var i = 0; i < 7; i++)
	{
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}

	wave = new waveObj();
	wave.init();
	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

}	
function gameloop()
{
	window.requestAnimFrame(gameloop);//setInterval,setTimeout,frame per second当前绘制完成后根据机器性能确定间隔多长时间绘制下一帧
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
		//为了维持游戏中角色的运动平滑，需要使用时间差来调整物体的运动速度
	if(deltaTime>40) deltaTime=40;
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	ctx1.clearRect(0,0,canWidth,canHeight);
	big.draw();
	small.draw();
	bigFruitseat();
	bigSmallCollision();
	data.draw();
	dust.draw();
	wave.draw();
	halo.draw();
}
function onMouseMove(e)
{
	if(!data.gameOver)
	{
		if (e.offSetX||e.layerX) 
		{
			mx=e.offSetX==undefined? e.layerX:e.offSetX;
			my=e.offSetY==undefined? e.layerY:e.offSetY;	
		}
	}

}