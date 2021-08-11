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

/**
 * @description
 * Takes an Array<V>, and a grouping function,
 * and returns a Map of the array grouped by the grouping function.
 *
 * @param list An array of type V.
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.
 *                  K is generally intended to be a property key of V.
 *
 * @returns Map of the array grouped by the grouping function.
 */
//export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
//    const map = new Map<K, Array<V>>();
function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}


// example usage

const pets = [
    {type:"Dog", name:"Spot"},
    {type:"Cat", name:"Tiger"},
    {type:"Dog", name:"Rover"}, 
    {type:"Cat", name:"Leo"}
];
    
const grouped = groupBy(pets, pet => pet.type);
    
console.log(grouped.get("Dog")); // -> [{type:"Dog", name:"Spot"}, {type:"Dog", name:"Rover"}]
console.log(grouped.get("Cat")); // -> [{type:"Cat", name:"Tiger"}, {type:"Cat", name:"Leo"}]

const odd = Symbol();
const even = Symbol();
const numbers = [1,2,3,4,5,6,7];

const oddEven = groupBy(numbers, x => (x % 2 === 1 ? odd : even));
    
console.log(oddEven.get(odd)); // -> [1,3,5,7]
console.log(oddEven.get(even)); // -> [2,4,6]