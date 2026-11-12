const http=require("http")
const fs=require("fs")
const server=http.createServer((req,res)=>{
    if(req.method=="GET" && req.url==="/"){
        res.write("Welcome to server")
        res.end()
    }
    else if(req.method=="GET" && req.url==="/allusers"){

        let usersdata=fs.readFileSync("./users.json","utf8")
        let data=JSON.parse(usersdata)

       res.write(JSON.stringify(data,null,2));
        res.end()
    }

    else if(req.method=="GET" && req.url==="/products"){

        let productsdata=fs.readFileSync("./products.json","utf8")
        let data=JSON.parse(productsdata)

       res.write(JSON.stringify(data,null,2));
        res.end()
    }

    else if(req.method=="GET" && req.url==="/products/product"){

        let productsdata=fs.readFileSync("./products.json","utf8")
        let data=JSON.parse(productsdata)

        let product=data.find(ele=>ele.id==1)

       res.write(JSON.stringify(product,null,2));
        res.end()
    }

   else if (req.method == "POST" && req.url == "/adduser") {

    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {

        let data = JSON.parse(body);

        console.log(data);

        res.write("User added successfully");
        res.end();

    });
}

})

server.listen(8090,()=>{
    console.log("server is running")
})