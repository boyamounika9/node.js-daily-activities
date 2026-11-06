const fs = require("fs")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function getInput(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer)
        })
    })
}


async function filemanager(params) {
    const option = await getInput(`select any one option \n
        1.create a file \n
        2. read the file \n
        3.update the file \n
        4.detele the file \n`)

    switch (option) {
        case "1":
            filecreation()
            break;
        case "2":
            console.log("file is created");
            break;
        case "3":
            console.log("file is created");
            break;
        case "4":
            console.log("file is created");
            break;
        default:
            console.log("invalid option")
    }
}
filemanager()

async function filecreation(params) {
    const filename=await getInput("enter file name:")

    if(!Number(filename[0])){
        console.log("invalid filename")
        rl.close()
        return
    }
  
}