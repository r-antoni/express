require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.SERVER_PORT || 3000;
const {sequelize} = require("./models");

const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));

sequelize
  .authenticate()
  .then(function (error) {
    console.log(`Database connection has been established`);
  })
  .catch(function (error) {
    console.log("Unable to connect into database", error);
  });

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

app.listen(PORT, () => {
  console.log("Server Running");
});
