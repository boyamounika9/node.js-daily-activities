const event=require("events")

const ev=new event()

ev.on("greet",(data)=>{
    console.log("hello "+ data)
}) 

ev.emit("greet","mounika")


