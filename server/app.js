const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { databaseConnection } = require("./database.js");
const authenticationRouter = require("./authentication_and_authorization.js");

const app = express();

const adminData = databaseConnection();

adminData.connect((err) => {
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

app.get("/just", verifyToken, (req, res) => {
  res.send("just checking");
});

//post admin data to the database
app.post("/admin", (req, res) => {
  const { brand, marketDemand, warranty, updateRate } = req.body;
  const sql = `
        INSERT INTO application_data (data_id, item_name, market_demand, warranty, product_update_rate)
        VALUES (DEFAULT, ?, ?, ?, ?);
    `;

  adminData.query(
    sql,
    [brand, marketDemand, warranty, updateRate],
    (err, results) => {
      if (err) {
        console.error("Error posting to application_data: ", err.message);
      } else {
        console.log("data posted succesfully to database");
      }
    }
  );
  res
    .status(200)
    .json({ message: "You have successuly posted data to the backend" });
});

//get admin data from the databse
app.get("/admin", (req, res) => {
  const sql = `
        SELECT * 
        FROM application_data
    `;

  adminData.query(sql, (err, results) => {
    err
      ? console.log("Error fetching data", err)
      : res.status(200).json(results);
  });
});

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
