const event=require("events")

const ev=new event()

ev.on("greet",()=>{
    console.log("hello everyone")
})

ev.emit("greet")