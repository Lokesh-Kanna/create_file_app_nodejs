import express from "express";
import cors from "cors";
import fs from "fs";

const PORT = process.env.PORT || 9000;
const app = express();

let date = new Date(Date.now()).getDate();
let month = new Date(Date.now()).getMonth();
let year = new Date(Date.now()).getFullYear();
let hour = new Date(Date.now()).getHours();
let minutes = new Date(Date.now()).getMinutes();
let seconds = new Date(Date.now()).getSeconds();

let fileName = date + "-" + month + "-" + year + "@" + hour + minutes + seconds;
let fileContent = "Created at: " + hour + ":" + minutes;

const intro =
  "Hi, this api helps you to create a file in your system. Content of the file will be current time stamp. Filename will be current date-time.txt";

const path =
  "Use '/create-file' to create a file and '/retrieve-file' file to retrieve all the files";

app.get("/", (req, res) => {
  res.send(`${intro} \n ${path}`);
});

app.get("/create-file", (req, res) => {
  fs.writeFile(`${fileName}.txt`, fileContent, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send(`File ${fileName}.txt Created Successfully`);
    }
  });
});

app.post("/retrieve-file", async (req, res) => {
  fs.readdir("../create_file", (err, files) => {
    res.send({ "files in the folder": files });
  });
});

app.listen(PORT, () => console.log("The server started in port " + PORT));
