
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

// async function studentdetails(params) {
//     const name=await getInput("enter stu name:\n")
//     const age=await getInput("enter stu age:\n")
//     const college=await getInput("enter stu college:\n")

//     let data={
//         name:name,
//         age:age,
//         college:college
//     }

//     fs.writeFileSync("./student.json",JSON.stringify(data,null,2))
//     rl.close();

// }
// studentdetails()



//Add Multiple Students	-- Get details of 5 students and store them in one JSON array.
// let i = 0
// let des=[]
// async function addstu(params) {
//     for (i; i <= 5; i++) {
//         const stuname = await getInput("enter stu name:\n")
//         const stuage = await getInput("enter stu age:\n")
//         const stucollege = await getInput("enter stu college:\n")

//         let data={
//         name:stuname,
//         age:stuage,
//         college:stucollege
//         }
//         des.push(data)

//         fs.writeFileSync("./student.json",JSON.stringify(des,null,2))
//         console.log("data added")
//     }

// rl.close()
// }
// addstu()



// async function employee(params) {
//     const empid = await getInput("enter employee id:\n")
//     const changedname=await getInput("enter changed name:\n")
//     let employeedata = fs.readFileSync("./employees.json", "utf8")
//     let data = JSON.parse(employeedata)

//     let employee = data.find((ele) => ele.id == empid);

//     if (employee) {
//        employee.name=changedname
//         fs.writeFileSync(
//             "./employees.json",
//             JSON.stringify(data, null, 2)
//         );

//     } else {
//         console.log("Employee not found");
//     }

//     rl.close()
// }
// employee()




async function employee(params) {
    const empid = await getInput("enter employee id:\n")
    let employeedata = fs.readFileSync("./employees.json", "utf8")
    let data = JSON.parse(employeedata)

    let employee = data.find((ele,ind) => ele.id == empid);

    if (employee) {
       let updatedData = data.filter((ele) => ele.id != empid);
        fs.writeFileSync(
            "./employees.json",
            JSON.stringify(updatedData, null, 2)
        );

    } else {
        console.log("Employee not found");
    }

    rl.close()
}
employee()