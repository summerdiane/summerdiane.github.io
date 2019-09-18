function bigFruitseat()
{
	if(!data.gameOver)
	{
		for(var i=0;i<fruit.num;i++)
		{
			if (fruit.alive[i]) 
			{
				//calculate length
				var l=calLength2(fruit.x[i],fruit.y[i],big.x,big.y);
				if (l<900) 
				{
					//fruit eaten
					fruit.dead(i);
					data.fruitNum++;
					big.bigBodyCount++;
					if(big.bigBodyCount > 7)
						big.bigBodyCount = 7;
					if(fruit.fruitType[i]=="blue")//blue
					{
						data.double=2;
					}
					wave.born(fruit.x[i], fruit.y[i]);
				}
			}
		}
	}
}

//big chuang small
function bigSmallCollision()
{
	if(data.fruitNum>0 && !data.gameOver)
	{
		var l=calLength2(big.x,big.y,small.x,small.y);
		if (l<900) 
		{
			//small recover
			small.smallBodyCount=0;
			big.bigBodyCount = 0;
			//score update
			data.addScore();
			//draw halo
			halo.born(small.x,small.y);
		}
	}

}