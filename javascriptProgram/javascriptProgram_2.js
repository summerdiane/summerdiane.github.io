// var sz;
// sz=new Array();
// sz[0]=1;
// sz[1]=2;
// sz[2]=3;
// alert(sz[1]);

// var personObj={name:'wang',age:10};
// alert(personObj.name);

var A;
var B;
var C;

A=30;
B=20;

document.write('交换前的两个变量值：');
document.write('<li>变量A值为：'+A+'</li>');
document.write('<li>变量B值为：'+B+'</li>'+'<br>');

C=A;
A=B;
B=C;

document.write('交换后的两个变量值：');
document.write('<li>变量A值为：'+A+'</li>');
document.write('<li>变量B值为：'+B+'</li>');