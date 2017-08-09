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
app.get("/api",(req,res) => {
  const param = req.query.q;
  if(!param) {
    res.json({
      req:req.query.q,
      error:"Miss parameter `q`"
    });
    return;
  }
  res.json({
    req:req.query.q + "aa"
  });
});

app.listen(app.get("port"),() =>{
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
