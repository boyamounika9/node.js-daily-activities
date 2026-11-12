
const http = require("http")
const fs = require("fs")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const server = http.createServer((req, res) => {

    // Home route
    if (req.method === "GET" && req.url === "/") {

        res.end("WELCOME TO MY SERVER")

    }

    // Get all employees
    else if (req.method === "GET" && req.url === "/allemployees") {

        let data = fs.readFileSync("./employee.json", "utf8")

        res.setHeader("Content-Type", "application/json")
        res.end(data)

    }

    // Get employee by terminal input
    else if (req.method === "GET" && req.url === "/search") {

        console.log("Browser requested employee search")

        rl.question("Enter employee ID: ", (empid) => {

            let employeedata = fs.readFileSync("./employee.json", "utf8")

            let data = JSON.parse(employeedata)

            let empdata = data.find(ele => ele.id == empid)

            res.setHeader("Content-Type", "application/json")

            if (empdata) {

                res.end(JSON.stringify(empdata, null, 2))

            } else {

                res.statusCode = 404

                res.end(JSON.stringify({
                    message: "Employee not found"
                }))

            }

        })

    }

    // Invalid route
    else {

        res.statusCode = 404
        res.end("Route not found")

    }

})

server.listen(8090, () => {
    console.log("Server is running on port 8090")
})
