/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  
  let sum = 0;
  for(let each of data){
    sum += each.amount;
  }
  // console.log(sum/data.length)
  postMessage(Math.floor(sum/data.length));
});
