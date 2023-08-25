//require dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { databaseConnection } = require("./database.js");

const authenticationRouter = express.Router(); //create express route for authentication
const authentication = databaseConnection();

//connect to authentication database
authentication.connect((err) => {
  if (err) {
    console.log("connection failed: ", err);
  } else {
    console.log("connected to authentication database");
  }
});

//post sign-up data
authenticationRouter.post("/sign-up", (req, res) => {
  //destructured request body
  const { name, email, password, confirmPassword } = req.body;
  console.log(req.body);
  //   check if two passwords match
  if (password !== confirmPassword) {
    res.status(500).json({ message: "Password doesn't match" });
    return;
  }

  // if passwords match, hash the passowrd
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      console.log("Error generating salt: ", err);
      return;
    }

    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.err("Error hashing password", err.message);
        return;
      }

      const sql = `
            INSERT INTO user
            (user_id, user_name, user_gmail, user_password)
            VALUES( DEFAULT, ?, ?, ?)
        `;
      authentication.query(sql, [name, email, hashedPassword], (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  });
});

//post login data
authenticationRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  //sql query statement for selecting user with the provided email
  const sql = `
        SELECT * 
        FROM user
        WHERE user_gmail = ?
    `;

  //select the user
  authentication.query(sql, [email], (err, results) => {
    //if error occured log the error, and respond with appropriate status
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error" });
    }

    //check if email match
    if (results.length === 0) {
      console.log(`invalid email: ${email}`);
      return res.status(500).json({ message: `Invalid email` });
    }
    //get hashed password and compare to the passowrd used
    const hashedPassword = results[0].user_password;
    //compare passwords
    bcrypt.compare(password, hashedPassword, (err, isMatching) => {
      if (err) {
        console.log("error checking password :", err);
        return res
          .status(500)
          .json({ message: `Internal server error: ${err}` });
      }

      //check if compared passwords match
      if (!isMatching) {
        console.log("password doesnt match");
        return res.status(500).json({ message: "Invalid password" });
      }

      //if all tests have passed: create jsonWebtoken with the results from the database
      const user = results[0];
      jwt.sign({ user }, "secret_key_here", (err, token) => {
        res.json({ token }); //send the token to the browser
      });
    });
  });
});

//export authentiactionRouter
module.exports = authenticationRouter;
