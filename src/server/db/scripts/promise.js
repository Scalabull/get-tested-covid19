var p1 = new Promise((resolve, reject) => { 
    setTimeout(() => resolve('one'), 1000); 
  }); 
  var p2 = new Promise((resolve, reject) => { 
    setTimeout(() => resolve('two'), 2000); 
  });
  var p3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('three'), 3000);
  });
  var p4 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('four'), 4000);
  });
  var p5 = new Promise((resolve, reject) => {
    reject(new Error('reject'));
  });
  
async function testme(){
    try{
        const fin = await Promise.all([p1, p2, p3, p4, p5])
        console.log('success: ', fin);
    } catch(e){
        console.log('caught err');
    }
}  

testme();