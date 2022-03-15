const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const likedFun = require("./controllers/likeSocket");

const graphqlHttp = require("express-graphql");

const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@nodeshop-s8bpd.gcp.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    // graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        console.log("기술적 오류!");
        console.log(err);
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "에러 발생";
      const code = err.originalError.code || 500;
      return { message: message, status: code, data: data };
    },
  })
);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    const server = app.listen(process.env.PORT || 4000);
    const io = require("./socket").init(server);
    io.on("connection", (socket) => {
      console.log("Client Connected");
      socket.on("liked", ({ data, alreadyClicked }) => {
        const splitData = data.split("_");
        console.log("alreadyClicked", alreadyClicked);
        // 식별 데이터, like unlike 데이터
        likedFun.putLike(splitData[0], splitData[1], alreadyClicked);
      });
    });
    io.on("disconnect", () => {
      console.log("user disconnected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
