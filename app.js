// import {add,sub,mul,div} from './demo.js'



const x=10,y=20;

const {add,sub,mul,div} =require("./demo.js")

console.log( `Addion of ${x} and ${y} : ${add(x,y)}`)
console.log( `Subtraction of ${x} and ${y}  : ${sub(x,y)}`)
console.log( `Multiplication of ${x} and ${y}  : ${mul(x,y)}`)
console.log( `Division of ${x} and ${y}  : ${div(x,y)}`)

