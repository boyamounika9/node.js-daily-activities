
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




async function task() {

    while (true) {

        const option = await getInput(`
        1. Add New Task \n
        2. View All Tasks \n
        3. Delete Completed Task \n
        4. Change Task to Completed \n
        5. Exit \n

        Enter your choice: `);

        switch (option) {

            case "1":
                await addtask();
                break;

            case "2":
                await viewtask();
                break;

            case "3":
                await deletetask();
                break;

            case "4":
                await updatetask();
                break;

            case "5":
                console.log("Thank you!");
                rl.close();
                return;

            default:
                console.log("Invalid choice!");
        }
    }
}

task();



async function addtask() {
    let jsondata = fs.readFileSync("./tasks.json", "utf8")
    let taskdata = JSON.parse(jsondata)
    const newtask = await getInput("enter you new task:\n")
    let data = {
        id: Math.floor(Math.random() * 10000),
        title: newtask,
        completed: false
    }
    taskdata.push(data)

    fs.writeFileSync("./tasks.json", JSON.stringify(taskdata, null, 2))

}



async function viewtask(params) {
    let jsondata = fs.readFileSync("./tasks.json", "utf8")
    let taskdata = JSON.parse(jsondata)

    console.log("\n===== YOUR TASKS =====");

    taskdata.forEach((ele) => {
        console.log(`ID: ${ele.id}`);
        console.log(`Title: ${ele.title}`);
        console.log(`Status: ${ele.completed ? "Completed" : "Pending"}`);
        console.log("----------------------");
    });
}

async function deletetask(params) {

    let jsondata = fs.readFileSync("./tasks.json", "utf8")
    let taskdata = JSON.parse(jsondata)
    let filtereddata = taskdata.filter((ele) => {
        return ele.completed == false;
    })
    if (taskdata.length == filtereddata.length) {
        console.log("No task is completed ... please finish tasks!!")
    }
    else {
        fs.writeFileSync("./tasks.json", JSON.stringify(filtereddata, null, 2))
        console.log("completed tasks are deleted!")
    }

}


async function updatetask(params) {
    let jsondata = fs.readFileSync("./tasks.json", "utf8")
    let taskdata = JSON.parse(jsondata)
    const taskid=await getInput("enter the task ID which you need to mark as completed :\n")
    let currenttask=taskdata.find(ele=>ele.id==taskid)
    if (currenttask){
        currenttask.completed=true
        fs.readFileSync('./tasks.json',JSON.stringify(taskdata,null,2))
    }
    else{
        console.log("enter valid Task ID!!")
    }
    
}