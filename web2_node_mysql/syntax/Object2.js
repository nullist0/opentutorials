// 데이터 저장 : array, object
// 처리 : function

var f = function(a){
  console.log(a);
}
console.log(f);
f(1);

var fs = [f];
fs[0](10);

var o = {
  func:f
}
o.func(10);

// conditional is not a data
// var i = if(true){
//   console.log(30);
// }
// i();
// while is not a data
// var i = while(true){console.log(30);};
