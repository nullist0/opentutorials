var number = [1, 400, 12, 34, 5, 1000];

var sum = 0;
var i = 0;
while(i < number.length){
  //console.log(number[i]);
  sum += number[i];
  i++;
}

console.log(`total : ${sum}`);
