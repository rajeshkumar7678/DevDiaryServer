const express = require("express");
const cors = require("cors");
const { connection } = require("./utils/mongoConnection");
const { userRoute } = require("./routes/user.route");
const blogRouter = require("./routes/blog.routes");
require("dotenv").config();
// const { userRouter } = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/user", userRoute);
app.use("/blogs", blogRouter);
app.listen(port, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port}`);
});
