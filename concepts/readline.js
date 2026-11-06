
const readline=require("readline")

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function getInput(question){
    return new Promise((resolve)=>{
        rl.question(question,(answer)=>{
            resolve(answer)
        })
    })
}

async function name(params) {
    const inputdata=await getInput("enter your name")
    console.log(inputdata)

    rl.close()
}
name()