exports.getUserPhones = (req, res) => {
  const user_id = req.user_id;
  const sql = `
    SELECT *
    FROM phone
    WHERE user_id = ?
  `;
  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Could not access phones data from the database succesfully",
      });
    }
    // console.log(results);
    res.status(200).json({ assets: results });
  });
};

exports.getUserLaptops = (req, res) => {
  const user_id = req.user_id;
  const sql = `
    SELECT * 
    FROM laptop
    WHERE user_id = ?
  `;

  connection.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        error: "Could not access laptops data from the database succesfully",
      });
    }
    res.status(200).json({ laptops: results });
  });
};

exports.createAdminData = (req, res) => {
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
};

exports.getAdminData = (req, res) => {
  const sql = `
        SELECT * 
        FROM application_data
    `;

  connection.query(sql, (err, results) => {
    err
      ? console.log("Error fetching data", err)
      : res.status(200).json(results);
  });
};

exports.createPhone = (req, res) => {
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
};

exports.createLaptop = (req, res) => {
  const {
    brand,
    model,
    age,
    os,
    os_version,
    productUpdateRate,
    warranty,
    marketDemand,
    color,
    price,
    ramSize,
    cpuCores,
    driveStorage,
    driveType,
    user_id,
  } = req.body;

  const sql = `
    INSERT INTO laptop 
      (laptop_id, laptop_brand,laptop_model, laptop_age, laptop_os, laptop_os_version, laptop_update_rate, laptop_warranty, laptop_market_demand, laptop_color, laptop_price, laptop_ram_size, laptop_cpu_cores, laptop_storage_size, laptop_drive_type, user_id)
      VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      brand,
      model,
      age,
      os,
      os_version,
      productUpdateRate,
      warranty,
      marketDemand,
      color,
      price,
      ramSize,
      cpuCores,
      driveStorage,
      driveType,
      user_id,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Could not send laptop data succesfully to the database",
        });
      }

      return res.status(200).json({ message: "Laptop data sent succesfully" });
    }
  );
};
