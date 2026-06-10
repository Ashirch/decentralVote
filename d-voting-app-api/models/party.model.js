var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var partySchema = new Schema(
  {
    name: String,
    constituency_id: {
      type: Schema.Types.ObjectId,
      ref: "Constituency",
    },
    
    is_active: {
      type: Boolean,
      default: true,
    },
    imageURL: String,
    voters: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);
module.exports = mongoose.model("Party", partySchema);
