
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

async function data(){
    const name=await getInput("enter your name")
    console.log(name)
    rl.close()
}
data()