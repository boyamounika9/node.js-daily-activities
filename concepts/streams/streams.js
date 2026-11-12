const fs=require("fs")

const read=fs.createReadStream("./bigdata.txt")

read.on("data",(chunck)=>{
    console.log(chunck.length)
})

read.on("end",()=>{
    console.log("reading completed")
})