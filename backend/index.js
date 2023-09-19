//internal import
const app = require("./app");
const connectDB = require("./configs/db");
const { port } = require("./secret");

//server is listening here
app.listen(port, async () => {
  console.log(`server is running at http://localhost:${port}`);
  await connectDB();
});
