const mongoose = require("mongoose");
const userModel = require("../../../models/user.model")
const constituencyModel = require("../../../models/constituency.model")

const service = {
    async updateUser(user_id,data){
        try{
            const response = await userModel.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(user_id)
            },{
                $set: data
            },{
                new: true
            });
            return {status: 200, message: "User Updated", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async getAllVoters(){
        try{
            const response = await userModel.find({is_admin: false}).populate("constituency_id","_id name");
            return {status: 200, message: "User Updated", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async convertVotertoAdmin(user_id){
        try{
            const response = await userModel.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(user_id)},
            {
                $set: {
                    is_admin: true,
                    vote_status: "verified"
                }
            },{
                new: true
            });
            return {status: 200, message: "User Converted to Admin", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async getConstituencies() {
        try{
            const response = await constituencyModel.find({is_active: true});
            return {status: 200, message: "All Constituencies", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async deleteVoter(user_id) {
        try{
            const response = await userModel.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(user_id)
            });
            return {status: 200, message: "User Deleted"};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
}

module.exports = service