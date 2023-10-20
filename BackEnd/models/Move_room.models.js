const mongoose = require("mongoose");
const db = require("../configDB/db");

const moveRoomSchema = new mongoose.Schema({
  roomNumber: String,
  reason: String,
});

const MoveRoom = mongoose.model("MoveRoom", moveRoomSchema);

module.exports = MoveRoom;
