// import packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// app
const app = express();

// connect database
mongoose
  .connect(
    "mongodb+srv://admin:admin123@ransisarcade-rdqwa.mongodb.net/artcafe?retryWrites=true&w=majority" ||
      "mongodb://localhost:27017/ecommerce",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => console.log("db is running"))
  .catch((err) => console.log(err));

// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce", {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   })
//   .then((result) => console.log("db is running"))
//   .catch((err) => console.log(err));

// load routers
//const authRoutes = require("./routes/api/authRoutes");
//const userRoutes = require("./routes/api/userRoutes");
const typeRoutes = require("./routes/api/typeRoutes");
const adRoutes = require("./routes/api/adRoutes");
//const contactFormRoutes = require("./routes/api/contactFormRoutes");
//const sendingMailsRoutes = require("./routes/api/sendingMailsRoutes");
//const reportRoutes = require("./routes/api/reportRoutes");

// use middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// routes middleware
//app.use("/api", authRoutes);
//app.use("/api", userRoutes);
app.use("/api/type", typeRoutes);
app.use("/api/ad", adRoutes);
//app.use("/api", contactFormRoutes);
//app.use("/api", sendingMailsRoutes);
//app.use("/api", reportRoutes);

// server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

// port
const PORT = process.env.PORT || 5000;

// run server
app.listen(PORT, () => console.log(`server is running in Port ${PORT}`));
