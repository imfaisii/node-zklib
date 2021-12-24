const ZKLib = require("./zklib");
const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

const test = async () => {
  let zkInstance = new ZKLib("110.93.246.50", 4370, 10000, 4000);
  try {
    // Create socket to machine
    await zkInstance.createSocket();

    // Get general info like logCapacity, user counts, logs count
    // It's really useful to check the status of device
    console.log(await zkInstance.getInfo());
  } catch (e) {
    console.log(e);
    if (e.code === "EADDRINUSE") {
    }
  }

  // Get users in machine
  const users = await zkInstance.getUsers();
  console.log(users);

  // Get all logs in the machine
  // Currently, there is no filter to take data, it just takes all !!
  try {
    const logs = await zkInstance.getAttendances();
    console.log(logs);
  } catch (e) {
    console.log(e);
    if (e.code === "EADDRINUSE") {
    }
  }

  //   const attendances = await zkInstance.getAttendances((percent, total) => {
  //     // this callbacks take params is the percent of data downloaded and total data need to download
  //   });

  // YOu can also read realtime log by getRealTimelogs function

  // console.log('check users', users)

  // zkInstance.getRealTimeLogs((data) => {
  //   // do something when some checkin
  //   console.log(data);
  // });

  // delete the data in machine
  // You should do this when there are too many data in the machine, this issue can slow down machine
  //   zkInstance.clearAttendanceLog();

  //   Get the device time
  try {
    const getTime = await zkInstance.getTime();
    console.log(getTime.toString());
  } catch (e) {
    console.log(e);
    if (e.code === "EADDRINUSE") {
    }
  }
  // Disconnect the machine ( don't do this when you need realtime update :)))
  // await zkInstance.disconnect()
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/abc", (req, res) => {
  test();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
