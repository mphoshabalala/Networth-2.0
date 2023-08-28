const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { databaseConnection } = require("./database.js");
const authenticationRouter = require("./authentication_and_authorization.js");

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

app.get("/just", verifyToken, (req, res) => {
  const authenticatedUser = req.user_id;
  res.json({ user_id: authenticatedUser });
});

//post admin data to the database
app.post("/admin", (req, res) => {
  const { brand, marketDemand, warranty, updateRate } = req.body;
  const sql = `
        INSERT INTO application_data (data_id, item_name, market_demand, warranty, product_update_rate)
        VALUES (DEFAULT, ?, ?, ?, ?);
    `;

  connection.query(
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

  connection.query(sql, (err, results) => {
    err
      ? console.log("Error fetching data", err)
      : res.status(200).json(results);
  });
});

app.post("/phone-data", (req, res) => {
  // const user_id = req.user_id;
  //get phone data from client
  const {
    brand,
    model,
    age,
    os,
    osVersion,
    productUpdateRate,
    warranty,
    color,
    marketDemand,
    price,
    user_id,
  } = req.body;

  //send data to the database
  const sql = `
      INSERT INTO phone 
      (phone_id, phone_brand,phone_model, phone_age, phone_os, phone_os_version, phone_update_rate, phone_warranty, phone_market_demand, phone_color, phone_price, user_id)
      VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  connection.query(
    sql,
    [
      brand,
      model,
      age,
      os,
      osVersion,
      productUpdateRate,
      warranty,
      marketDemand,
      color,
      price,
      user_id,
    ],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ Error: "Did not add data to the database succesfylly" });
      }
      return res.status(200).json({
        Message: "Data submited succesfully",
      });
    }
  );
  console.log(req.body, user_id);
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
