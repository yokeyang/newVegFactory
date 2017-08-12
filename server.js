//nodejs offer apis
const express = require("express");
const fs = require("fs");

const app = express();

app.set("port", process.env.PORT || 3001);

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
app.route('/login')
	.get(function(req, res) {
		res.send('this is the login form');
	})
	.post(function(req, res) {
		console.log('processing');
		res.send('processing the login form!');
	});

app.listen(app.get("port"),() =>{
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
