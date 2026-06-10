var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var electionSchema = new Schema(
  {
    name: String,
    constituency_id: {
        type: Schema.Types.ObjectId,
        ref: "Constituency"
    },
    election_date: Date,
    election_started: {
      type: Boolean,
      default: false
    },
    election_ended: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Election", electionSchema);
