var mima;
var yaoshi = false;
	while(!yaoshi){
		mima = parseInt(prompt("想偷看？报上暗号",""));
		if(mima==123456789){
			alert('emmm....算你通过');
			yaoshi = true;
		}else{
			alert('密码都不知道还想偷看？给你看个锤子');
		}
	};