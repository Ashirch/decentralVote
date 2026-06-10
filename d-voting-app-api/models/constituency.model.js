var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var constituencySchema = new Schema(
  {
    name: String,
    short_code: String,
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Constituency", constituencySchema);
