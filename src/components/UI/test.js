let test= new Date (2020,03,05)

let test2 = test.getDate()
console.log(test)
console.log(test2)
function date(){

let day = new Date
let newDate = new Date
for (let index = 0; index < 5; index++) {
    console.log(day)
    newDate.setDate(newDate.getDate()+1)
    console.log(newDate)

    
}}
date()


let arrayTest = [1,2,3,5,8,9,4,5,6,54,5,65,2,515]

function minMax(array){
 let min = Math.min(...array)    
console.log(min)
console.log(array)
}
minMax(arrayTest)
