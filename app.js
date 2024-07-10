    const express = require('express')
const app = express();
const cors = require("cors");
require("./conn");
const path = require("path");
const auth = require("./routes/auth")
const list = require("./routes/list")
app.use(express.json());
app.use(cors());

app.use("/api/v1",auth);
app.use("/api/v2",list);

app.use(express.static('build'));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "frontend", "build")));
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });

app.listen(1000,() => {
    console.log("server is running ")
})

