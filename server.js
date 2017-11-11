//nodejs offer apis
const express = require("express");
const fs = require("fs");
const moment = require('moment');
const app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.set("port", process.env.PORT || 3001);
server.listen(3002)
if(process.env.NODE_ENV === "production") {
  app.use(express.static("vegfactory/build"));
}
const COLUMNS = [
  "carbohydrate_g",
  "protein_g",
  "fa_sat_g",
  "fa_mono_g",
  "fa_poly_g",
  "kcal",
  "description"
];
app.get("/api/charts",(req,res) => {
  const param = req.query.charts;
  // if(!param) {
  //   res.json({
  //     req:req.query.q,
  //     error:"Miss parameter `charts`"
  //   });
  //   return;
  // }
  res.json({
    temp:10 + Math.random()*10,
    light:10 + Math.random()*10,
    co2:10 + Math.random()*10,
    water:10 + Math.random()*10
  });
});
app.get("/api/lightIntensity",(req,res) => {
  res.json({
    red:parseInt(Math.random()*10)*10,
    green:parseInt(Math.random()*10)*10,
    blue:parseInt(Math.random()*10)*10,
    purple:parseInt(Math.random()*10)*10
  })
})
app.get("/api/record",(req,res) => {
  if(!req.query.results){
    res.json({error:'no param results'})
    return
  }
  let data = []
  let machine = ['红光','蓝光','绿光','紫光']
  for (let i = 0; i < req.query.results; i++) {
    data.push({
      key:i,
      time: `2017-8-${i+1}`,
      machine: machine[parseInt(Math.random() * 3.5)],
      action: '打开',
    });
  }
  res.json({
    result:data
  })
});
app.get("/api/history",(req,res) => {
  let data = []
  for(let i = Date.now();i > Date.now() - 30 * 86400000;i-=86400000){
    data.push({
      date:moment(i).format('YYYY-MM-DD'),

    })
  }
  res.json({result:data})
})
app.get("/api/onekey",(req,res) => {
  if(!req.query.location || !req.query.veg){
    res.json({
      error:"miss param location or veg"
    })
  }
  let lights = {
    [req.query.location]:{
      [req.query.veg]:{
        red:{checked:true,value:parseInt(Math.random() * 10)*10},
        blue:{checked:true,value:parseInt(Math.random() * 10)*10},
        green:{checked:true,value:parseInt(Math.random() * 10)*10},
        purple:{checked:true,value:parseInt(Math.random() * 10)*10}
      }
    }
  }
  res.json({
    lights:lights
  })
});

app.listen(app.get("port"),() =>{
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});

io.on('connection',(socket)=>{
  socket.on('light',(light)=>{
    socket.emit('lightIntensity',{
      red:parseInt(Math.random()*10)*10,
      green:parseInt(Math.random()*10)*10,
      blue:parseInt(Math.random()*10)*10,
      purple:parseInt(Math.random()*10)*10
    })
  })
  socket.on('getcharts',(req)=>{
    socket.emit('charts',{
      temp:10 + Math.random()*10,
      light:10 + Math.random()*10,
      co2:10 + Math.random()*10,
      water:10 + Math.random()*10
    })
  })
})
