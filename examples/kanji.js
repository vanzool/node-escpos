"use strict";
const escpos = require("escpos");
const nodeHtmlToImage = require("node-html-to-image");
const fs = require("fs");
escpos.USB = require("escpos-usb");
escpos.Network = require("escpos-network");

var bodyParser = require("body-parser");
var app = require("express")();
var http = require("http");
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.post("/print", (req, res) => {
  res.json({ status: "success" });
  print(req.body.text);
});

http.Server(app).listen(port, () => {
  console.log(`Printer: http://localhost:${port}`);
});

const print = async (text) => {
  const device = new escpos.Network("192.168.30.201");
  const options = { encoding: "GB18030", width: 48 };
  const printer = new escpos.Printer(device, options);

  device.open(function (error) {
    printer
      .setCharSet()
      .size(0, 0)
      .testChinese()
      .text("Selamat Pagi")
      .text("早上好", "GB18030")
      .text("おはよう", "EUC-JP")
      .feed()
      .cut()
      .close();
  });
};
