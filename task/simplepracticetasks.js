const readline = require("readline")
const fs = require("fs")


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


// async function username(params) {
//     const username=await getInput("enter your user name:")
//     fs.writeFileSync("./userdetails.txt",username)
//     console.log("user name is stored in file")
// }
// username()

// async function userage(params) {
//     const userage=await getInput("enter your age:")
//     console.log(userage)  
//     rl.close()  
// }
// userage()

// async function collegedetails(params) {
//     const collegename=await getInput("enter your college name:")
//     fs.writeFileSync("./college.txt",collegename)
//  rl.close()  

// }
// collegedetails()


// let filedata=fs.readFileSync("./userdetails.txt","utf8")
// console.log(filedata)

// async function stream(params) {
//     const stream = await getInput("enter your stream:")
//     fs.appendFileSync("./college.txt", stream)
//     rl.close()
// }
// stream()



// async function filename(params) {
    // const filename = await getInput("enter filename:")

    // fs.writeFileSync(`./${filename}.txt`," ")
//    let res= fs.existsSync(filename)
//    console.log(res)

    //   fs.unlinkSync(filename)
    //   console.log("file deleted")


//     const oldfilename = await getInput("enter oldfilename:")
//     const newfilename = await getInput("enter newfilename:")


//     fs.renameSync(oldfilename,newfilename)
//     console.log("file name changed")
//     rl.close()
// }
// filename()


