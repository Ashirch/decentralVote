var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var candidateSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    gender: String,
    email: String,
    mobile_no: String,
    date_of_birth: Date,
    imageURL: {
      type: String,
      default: ""
    },
    docURL: {
      type: String,
      default: ""
    },
    country: String,
    state: String,
    city: String,
    address_1: String,
    address_2: String,
    election_id: {
      type: Schema.Types.ObjectId,
      ref: "Election",
    },
    constituency_id: {
      type: Schema.Types.ObjectId,
      ref: "Constituency",
    },
    party_id: {
      type: Schema.Types.ObjectId,
      ref: "Party",
    },
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Candidate", candidateSchema);
