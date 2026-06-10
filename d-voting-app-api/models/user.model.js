var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    reg_no: String,
    password: String,
    is_admin: {
        type: Boolean,
        default: false
    },
    vote_status: {
        type: String,
        enum : [
            "verified",
            "rejected",
            "in_progress",
        ],
        default: "in_progress"
    },
    constituency_id: {
      type: Schema.Types.ObjectId,
      ref: "Constituency",
    },
    // role_id: {

    // }
    imageURL: String
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
