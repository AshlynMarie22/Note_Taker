const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./Develop/public"));

//GET ROUTES
app.get("/api/notes", (req, res) => {
  fs.readFile("./Develop/db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "unable to retrieve notes ",
      });
    }
    res.json({
      error: false,
      data: JSON.parse(data),
      message: "Successfully retrieved notes",
    });
  });
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  // If no matching route is found default to home
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  app.get("/api/notes", function(req,res){
    return res.sendFile(path.join(__dirname, "./Develop/db/db.json"))
})


//POST ROUTES
app.post("/api/notes", (req, res) => {
  console.log(req.body);
  fs.readFile("./Develop/db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        error: true,
        data: null,
        message: "unable to retrieve notes ",
      });
    }
    //console.log(data);
    const updatedData = JSON.parse(data);
    updatedData.push(req.body);
    //console.log(updatedData);
    fs.writeFile("./Develop/db/db.json", JSON.stringify(updatedData), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          error: true,
          data: null,
          message: "Unable to save new notes.",
        });
      }
      res.json({
        error: false,
        data: updatedData,
        message: "Successfully added new note.",
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});


