const yaml = require("yaml");
const { readFileSync } = require("fs");
const { resolve } = require("path");

const file = readFileSync(resolve(__dirname, "../config.yml"), {
  encoding: "utf8"
});
const config = yaml.parse(file);
module.exports = config;
