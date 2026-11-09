const fs=require("fs")

//creation of file

fs.writeFileSync("./file1.txt","this is creation of file")

//deletion of file

// fs.unlinkSync("./file1")


//appending data

fs.appendFileSync("./file1.txt","this is the appending data")

// fs.writeFileSync("./file1.txt","this is second creation of file")

fs.writeFileSync("./file2.txt","this is second file")

fs.copyFileSync("./file2.txt","./file1.txt")

// fs.mkdirSync("./newfoled")
let folder=fs.readdirSync("./newfoled")
console.log(folder)

fs.rmdirSync("./newfoled")