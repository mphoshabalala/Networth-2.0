const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { databaseConnection } = require("./database.js");
const authenticationRouter = require("./authentication_and_authorization.js");
const { verify } = require("crypto");

const {
  getUserPhones,
  getUserLaptops,
  createAdminData,
  getAdminData,
  createPhone,
  createLaptop,
} = require("./controllers/dataController.js");

const app = express();

const connection = databaseConnection();

connection.connect((err) => {
  if (err) {
    console.error("connection failed: ", err);
  } else {
    console.log("connected to admin database");
  }
});

app.listen(5000);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the authentication router for authentication and authorization
app.use(authenticationRouter);

app.get("/user-data", verifyToken, (req, res) => {
  const authenticatedUser = req.user_id;
  res.json({ user_id: authenticatedUser });
});

const router = express.Router();

app.get("/user-phones", verifyToken, getUserPhones);

app.get("/user-laptops", verifyToken, getUserLaptops);

//post admin data to the database
router.route("/admin").post(createAdminData).get(getAdminData);

app.post("/phone-data", createPhone);

app.post("/laptop-data", createLaptop);

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, "secret_key_here", (err, decoded) => {
      if (err) {
        return res.sendStatus(401); // Unauthorized
      }

      const userId = decoded.user.user_id;
      req.user_id = userId;

      next();
    });
  } else {
    res.sendStatus(403);
  }
}
