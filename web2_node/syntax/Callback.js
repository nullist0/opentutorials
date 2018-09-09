/*
function a(){
  console.log('A');
}
*/
//익명함수
var a = function(){
  console.log('A');
};
var a = ()=>{
  console.log('A');
};

function slowFunc(callback){
  callback();
}

slowFunc(a);
