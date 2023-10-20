const mongoose = require("mongoose");
const db = require("../configDB/db");

const moveRoomSchema = new mongoose.Schema({
  roomNumber: String,
  reason: String,
});

const ReportRepai = mongoose.model("ReportRepai", moveRoomSchema);

module.exports = ReportRepai;
