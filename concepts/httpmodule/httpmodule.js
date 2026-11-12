const http=require("http")

const server=http.createServer((req,res)=>{

    if(req.method==="GET" && req.url==="/"){
        res.write("Hello  i am from server")
        res.end()
    }
    if(req.method==="GET" && req.url==="/allusers"){
        res.write("this is all users request")
        res.end()
    }

})

server.listen(8080,()=>{
    console.log("server started")
})