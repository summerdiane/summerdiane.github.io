alert("欢迎来到打飞机V1.0小游戏");

// 单例模式
window.onload = function(){
	Game.exe();
};

var Game = {

	//启动程序
	exe : function(){
		var oDiv = document.createElement('div');
			oDiv.id = 'GameBox';
			oDiv.style.cssText = 'width:300px;height:500px;border:10px solid #fff;margin:50px auto;text-align:center;position:relative;overflow:hidden;';
		document.body.appendChild(oDiv);
		this.init();
	},

	score : 0,
	isEnd : false,

	//初始化
	init : function(){
		var oDiv = document.getElementById('GameBox');
		oDiv.innerHTML = '';
		Game.score = 0;
		Game.isEnd = false;
		var oH = document.createElement('h2');
			oH.innerHTML = '打飞机v1.0';
			oH.style.cssText = 'color:#fff;font-weight:normal;padding-top:50px;';
			oDiv.appendChild(oH);
		for (var i=0;i<4;i++){
			var oP = document.createElement('p');
				oP.index = i;
				oP.style.cssText = 'font-size:14px;color:#000;width:150px;height:40px;margin:50px auto;text-align:center;line-height:40px;background:#fff;cursor:pointer;'
			var html = '';
			oP.onmouseenter = function(){
				this.style.background = '#f60';
				this.style.color = '#fff';
			};
			oP.onmouseleave = function(){
				this.style.background = '#fff';
				this.style.color = '#000';
			};
			oP.onclick = function(e){
				e = e||window.event;
				Game.start(this.index , oDiv , e );
			};
			switch(i){
				case 0:
					html = '简单';
					break;
				case 1:
					html = '中等';
					break;
				case 2:
					html = '困难';
					break;
				case 3:
					html = '春哥附体';
					oP.style.background = '#ffccff';
					oP.style.color = '#f00';
					oP.style.fontWeight = 'bold';			
					oP.onmouseleave = function(){
						this.style.background = '#ffccff';
						this.style.color = '#f00';
					};
					break;
			}
			oP.innerHTML = html;
			oDiv.appendChild(oP);
		};
	},	

	//游戏开始
	start : function(index , oGameBox , e ){
		oGameBox.innerHTML = '';

		var oS = document.createElement('span');
			oS.innerHTML = this.score;
			oS.style.cssText = 'position:absolute;left:15px;top:15px;font-size:14px;color:#fff;';
		oGameBox.appendChild(oS);
		this.plane(oGameBox , e , index);
		this.enemy(oGameBox , oS , index);
		this.enemy2(oGameBox , oS , index);
	},

	//关于飞机玩家
	plane : function(oGameBox , e , index){
		var x = e.pageX,
			y = e.pageY;
		var oPlane = new Image();
			oPlane.src = 'img/plane.png';
			oPlane.width = 50;
			oPlane.height = 60;
			oPlane.id = 'plane';

		var tY = oGameBox.offsetTop+parseInt(oGameBox.style.borderWidth)+oPlane.height/2;
		var lX = oGameBox.offsetLeft+parseInt(oGameBox.style.borderWidth)+oPlane.width/2
		window.onresize = function(){
			lX = oGameBox.offsetLeft+parseInt(oGameBox.style.borderWidth)+oPlane.width/2

		};
		var top = y-tY;
		var left = x-lX;
			oPlane.style.cssText = 'display:block;position:absolute;left:'+left+'px;top:'+top+'px;';
		oGameBox.appendChild(oPlane);

		var leftMin = - oPlane.width/2;
		var leftMax = oGameBox.clientWidth - oPlane.width/2;
		var topMin = 0;
		var topMax = oGameBox.clientHeight - oPlane.height;

		document.onmousemove = function(e){
			if( !Game.isEnd){
				e = e||window.event;
				var top = e.pageY - tY;
				var left = e.pageX - lX;

				top = Math.min( top , topMax ); //取两个中最小值
				top = Math.max( top , topMin );
				left = Math.min( left , leftMax );
				left = Math.max( left , leftMin );

				oPlane.style.left = left + 'px';
				oPlane.style.top = top + 'px';
			}
		};
		this.biubiubiu(oPlane , oGameBox, index);
	},

	//子弹发射
	biubiubiu : function(oPlane , oGameBox , index){
		var speed;
		switch ( index ){
			case 0:
				speed = 100;
				break;
			case 1:
				speed = 300;
				break;
			case 2:
				speed = 400;
				break;
			case 3:
				speed = 100;
				break;
		}
		this.BiuTimer = setInterval( function(){
			var oBiu = new Image();
				oBiu.src = 'img/biu.png';
				oBiu.width = 16;
				oBiu.height = 30;
				oBiu.className = 'biubiubiu';
			var top = oPlane.offsetTop - oBiu.height + 3;
			var left = oPlane.offsetLeft + oPlane.width/2 - oBiu.width/2;
				oBiu.style.cssText = 'position:absolute;top:'+top+'px;left:'+left+'px;'
			oGameBox.appendChild(oBiu);

			oBiu.timer = setInterval( function(){
				if( !oBiu.parentNode){
					clearInterval(oBiu.timer);
				}
				oBiu.style.top = oBiu.offsetTop - 5 + 'px';
				if(oBiu.offsetTop< - oBiu.height)
				{
					clearInterval(oBiu.timer);
					oBiu.parentNode.removeChild(oBiu);
				}
			} , 13);

		} , speed);   //子弹速度

	},

	//敌军1
	enemy : function( oGameBox , oS , index){
		var a;
		switch ( index ){
			case 0:
				a = 500;
				break;
			case 1:
				a = 400;
				break;
			case 2:
				a = 300;
				break;
			case 3:
				a = 200;
				break;
		}
		this.EnemyTimer = setInterval( function(){
			var a;
			switch ( index ){
				case 0:
					a = Math.random() * 2 + 1; //1,3  1.2,3.2   1.5,3.5   2,4
					break;
				case 1:
					a = Math.random() * 2 + 1.2;
					break;
				case 2:
					a = Math.random() * 2 + 1.5;
					break;
				case 3:
					a = Math.random() * 2 + 2;
					break;
			}
			// var a = Math.random() * 2 + 1;   //所有飞机有无数个随机的a而不是每一架飞机有无数个a，所以var a不能放在oEnemy.timer里面。

			var oEnemy = new Image();
			if( a>2.5 ){
				oEnemy.src = 'img/enemy.png';
				oEnemy.width = 50;
				oEnemy.height = 50;
			}else{
				oEnemy.src = 'img/enemy2.png';
				oEnemy.width = 30;
				oEnemy.height = 40;
			}


			var lMin = 0;
			var lMax = oGameBox.clientWidth - oEnemy.width;
			var left = Math.random() * (lMax-lMin) + lMin;
			oEnemy.style.cssText = 'position:absolute;top:'+(-oEnemy.height)+'px;left:'+left+'px;';
			oGameBox.appendChild(oEnemy);


			oEnemy.timer = setInterval(function(){
				
				oEnemy.style.top = oEnemy.offsetTop + a + 'px'; //敌军下落速度
				if(oEnemy.offsetTop >= oGameBox.clientHeight){
					clearInterval(oEnemy.timer);
					oEnemy.parentNode.removeChild(oEnemy);
				};
			}, 13);

			//和子弹的碰撞检测
			var allBiu = Game.getClass('biubiubiu');
			oEnemy.pzBiu = setInterval(function(){

				for (var i = 0; i < allBiu.length; i++) {
					if(Game.boom(oEnemy , allBiu[i])){
						Game.score ++;
						oS.innerHTML = Game.score;
						clearInterval(oEnemy.pzBiu);
						clearInterval(oEnemy.pzPlane);
						allBiu[i].parentNode.removeChild(allBiu[i]);
						oEnemy.src = 'img/boom.png';
						oEnemy.width = 30;
						oEnemy.height = 30;
						setTimeout(function(){
							if(oEnemy.parentNode){
								oEnemy.parentNode.removeChild(oEnemy);
							}
						},500);
					}
				};
			},50);

			//和战机的碰撞检测
			var oPlane = document.getElementById('plane');
			oEnemy.pzPlane = setInterval(function(){

				if( Game.isEnd){
					clearInterval(oEnemy.pzPlane);
					clearInterval(oEnemy.pzBoom);
					clearInterval(Game.enemy);
				}

				if( Game.boom(oEnemy , oPlane)){
					Game.isEnd = true;
					clearInterval(oEnemy.pzPlane);
					clearInterval(oEnemy.pzBoom);
					clearInterval(Game.BiuTimer);
					clearInterval(Game.EnemyTimer);
					clearInterval(Game.enemy);
					oEnemy.src = 'img/boom.png';
					oPlane.src = 'img/boom2.png';
					setTimeout(function(){
						if(oEnemy.parentNode){
							oEnemy.parentNode.removeChild(oEnemy);
						}
						Game.over(oGameBox);
					},2000);
				}
			},50);

			//和地板的碰撞检测
			oEnemy.pzBoom = setInterval(function(){

				if(Game.isEnd){
					clearInterval(oEnemy.pzBoom);
					clearInterval(oEnemy.pzPlane);
				}

				if( Game.boom2(oEnemy , oGameBox)){
					Game.isEnd = true;
					clearInterval(oEnemy.pzPlane);
					clearInterval(oEnemy.pzBoom);
					clearInterval(Game.BiuTimer);
					clearInterval(Game.EnemyTimer);
					oEnemy.src = 'img/boom.png';
					setTimeout(function(){
						if(oEnemy.parentNode){
							oEnemy.parentNode.removeChild(oEnemy);
						}
						Game.over(oGameBox);
					},1000);
				}
			},50);
		
		} , a );    //敌军生成速度

	},



	//碰撞检测
	boom : function(obj1 , obj2 ){

		var T1 = obj1.offsetTop;
		var B1 = T1 + obj1.clientHeight;
		var L1 = obj1.offsetLeft;
		var R1 = L1 + obj1.clientWidth;

		var T2 = obj2.offsetTop;
		var B2 = T2 + obj2.clientHeight;
		var L2 = obj2.offsetLeft;
		var R2 = L2 + obj2.clientWidth;

		// console.log(R1);

		if( R2 < L1 || L2 > R1 || B2 < T1 || T2 > B1 ){
			return false;
		}else{
			return true;
		}
	},

	//碰撞检测地板
	boom2 : function(obj3 , obj4){
		var B1 = obj3.offsetTop + obj3.clientHeight;
		var B2 = obj4.clientHeight ;

		if( B1 < B2 ){
			console.log(B1);
			return false; 
		}else{
			console.log(B2);
			return true;
		}
	},

	//游戏结束
	over : function(oGameBox){
		oGameBox.innerHTML = '';
		var oDiv = document.createElement('div');
			oDiv.style.cssText = 'width:200px;height:400px;margin:50px;background:#fff;';
		var oT = document.createElement('h3');
			oT.innerHTML = 'Game Over';
			oT.style.cssText = 'padding-top:40px;';
		var oP1 = document.createElement('p');
			oP1.innerHTML ='二狗子的得分是' + '<br>' + '<br>' + '<span style="color:#f00;font-weight:bold;">' + this.score + '</span>';
			oP1.style.cssText = 'font-size:16px;color:#000';
		var achievementTxt = document.createElement('h4');
		var achievement = new Image();


		if(Game.score>10){
			achievementTxt.innerHTML = '成功解锁勋章';
			achievementTxt.style.cssText = 'padding-top:0px;';
			achievement.src = 'img/boom.png';
			achievement.width = 50;
			achievement.height = 50;
		}




		var oRestart = document.createElement('div');
			oRestart.style.cssText = 'width:100px;height:40px;font-size:14px;text-align:center;line-height:40px;color:#000;background:#990;margin:30px auto;cursor:pointer;';
			oRestart.innerHTML = '重新开始';
		oRestart.onclick = function(){
			Game.init();
		};

		oDiv.appendChild(oT);
		oDiv.appendChild(oP1);
		oDiv.appendChild(achievementTxt);
		oDiv.appendChild(achievement);
		oDiv.appendChild(oRestart);
		oGameBox.appendChild(oDiv);
	},

	//getClass方法
	getClass : function( cName , parent ){
		parent = parent || document;
		if(document.getElementsByClassName){
			return parent.getElementsByClassName(cName);
		}else{
			var all = parent.getElementsByTagName('*');
			var arr = [];
			for(var i=0;i<all.length;i++){
				var arrClass = all.className.split(' ');
				for(var j=0;j<arrClass.length;j++){
					if (arrClass[j] == cName) {
						arr.push(all[i]);
						break;
					}
				}
			}
			return arr;
		}
	},
};


