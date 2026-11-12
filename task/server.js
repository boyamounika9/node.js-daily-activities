const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
    if (req.method == "GET" && req.url === "/") {
        res.write("Welcome to server")
        res.end()
    }
    else if (req.method == "GET" && req.url === "/allusers") {

        let usersdata = fs.readFileSync("./users.json", "utf8")
        let data = JSON.parse(usersdata)

        res.write(JSON.stringify(data, null, 2));
        res.end()
    }

    else if (req.method == "GET" && req.url === "/products") {

        let productsdata = fs.readFileSync("./products.json", "utf8")
        let data = JSON.parse(productsdata)

        res.write(JSON.stringify(data, null, 2));
        res.end()
    }

    else if (req.method == "GET" && req.url === "/products/product") {

        let productsdata = fs.readFileSync("./products.json", "utf8")
        let data = JSON.parse(productsdata)

        let product = data.find(ele => ele.id == 1)

        res.write(JSON.stringify(product, null, 2));
        res.end()
    }

    else if (req.method === "POST" && req.url === "/adduser") {
        let body = " "
        req.on("data", (chunk) => {
            body += chunk.toString()
        })

        req.on("end", () => {
            try {

                const newuser = JSON.parse(body)
                const allusers = JSON.parse(fs.readFileSync("./users.json", "utf8"))
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

    else if (req.method === "POST" && req.url === "/updateuser") {
        let body = " "
        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {
                const updatedata = JSON.parse(body)
                const allusersdata = JSON.parse(fs.readFileSync("./users.json", "utf8"))

                const userdata = allusersdata.find(ele => ele.id === updatedata.id)

                if (userdata) {
                    allusersdata.splice(allusersdata.indexOf(userdata), 1, updatedata)
                }

                fs.writeFileSync("./users.json", JSON.stringify(allusersdata, null, 2))

                res.write("User Updated sucessfully !!")
                res.end()


            }

            catch (error) {
                res.write("somthing happening wrong")
                res.end()
            }
        })
    }


    else if (req.method == "POST" && req.url == "/deleteuser") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {

            try {
                let user = JSON.parse(body);

                const allusersdata = JSON.parse(fs.readFileSync("./users.json", "utf8"));

                let newusers = allusersdata.filter(ele => ele.id !== user.id);


                fs.writeFileSync("./users.json", JSON.stringify(newusers, null, 2));

                res.write("User deleted successfully");
                res.end();

            }
            catch (error) {
                res.write("Error is there");
                res.end();
            }

        });
    }




})

server.listen(8090, () => {
    console.log("server is running")
})