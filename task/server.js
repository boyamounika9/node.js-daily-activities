const http = require("http")
const fs = require("fs")

function passwordvalid(password) {
    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_+]).{8,}$/
    return pattern.test(password)
}
const server = http.createServer((req, res) => {

    if (req.method == "GET" && req.url === "/allusers") {

        let usersdata = fs.readFileSync("./users.json", "utf8")
        let data = JSON.parse(usersdata)
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify(data, null, 2))

    }


    else if (req.method === "POST" && req.url === "/adduser") {
        let body = ""
        req.on("data", (chunk) => {
            body += chunk.toString()
        })

        req.on("end", () => {
            try {

                const newuser = JSON.parse(body)
                const allusers = JSON.parse(fs.readFileSync("./users.json", "utf8"))

                let userid = newuser.name + (Math.floor(Math.random() * 1000))
                newuser.id = userid


                let currentemailcheck = allusers.find(ele => ele.email === newuser.email)

                if (currentemailcheck) {
                    return res.end("This email is already present please add another email");
                }
                if (!newuser.email.endsWith("@gmail.com")) {
                    return res.end("@gmail.com is mandatory")
                }

                if (!passwordvalid(newuser.password)) {
                    return res.end("Password pattern is not matched");
                }

                allusers.push(newuser)

                fs.writeFileSync("./users.json", JSON.stringify(allusers, null, 2))

                res.write("New user added successfully")
                res.end()

            }

            catch (error) {
                res.write("Somthing happening wrongly")
                res.end()
            }
        })
    }

    else if (req.method === "PUT" && req.url === "/updateuser") {
        let body = ""
        req.on("data", (chunck) => {
            body += chunck.toString()
        })
        req.on("end", () => {
            let updateddata = JSON.parse(body)
            let allusers = JSON.parse(fs.readFileSync("./users.json", "utf8"))

            let userid=allusers.find(ele=>ele.id===updateddata.id)

            let existemail=allusers.find(ele=>
                ele.email===updateddata.email && ele.id!=updateddata.id
            )

            

            if(!userid){
                return res.end("user not found")
            }

            if( existemail){
                 return res.end("email is already exist")
            }

            if (!updateddata.email.endsWith("@gmail.com")) {
                return res.end("@gmail.com is mandatory")
            }

            if (!passwordvalid(updateddata.password)) {
                return res.end("Password pattern is not matched");
            }

            allusers.splice(allusers.indexOf(userid),1,updateddata)

            fs.writeFileSync("./users.json",JSON.stringify(allusers,null,2))

            res.write("user updated successfully...")
            res.end()

        })

    }

    else if(req.method==="DELETE" && req.url==="/deleteuser"){
        let body=""
        req.on("data",(chunck)=>{
            body+=chunck.toString()
        })
        req.on("end",()=>{
            let deletedata=JSON.parse(body)
            let allusers=JSON.parse(fs.readFileSync("./users.json","utf8"))
            let userid=allusers.find(ele=>ele.id===deletedata.id)
            if(!userid){
                return res.end("user not found")
            }
            let afterdeleteddata=allusers.filter(ele=>ele.id!==deletedata.id)
            fs.writeFileSync("./users.json",JSON.stringify(afterdeleteddata,null,2))
            res.write("user Deleted sucessfully")
            res.end()
        })
    }


})

server.listen(8080, () => {
    console.log("server is running")
})