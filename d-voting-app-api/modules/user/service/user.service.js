const mongoose = require("mongoose");
const userModel = require("../../../models/user.model")
const constituencyModel = require("../../../models/constituency.model")

const service = {
    async register(data) {
        try{
            const userResponse = await userModel.findOne({
                $or: [
                    { email: data.email },
                    {reg_no: data.reg_no}
                ]
            });
            if(userResponse){
                return {status: 409, message: "User Already Exists"};
            }else{
                const response = await userModel.create(data);
                return {status: 200, message: "User Registered Successfully", data: response};
            }
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async loginUser(req,email,password){
        try{
            const userResponse = await userModel.findOne({email: email});
            if(userResponse){
                if(userResponse.password === password){
                    delete userResponse.password;
                    return {status: 200, message: "Login Successfully", data: userResponse};
                }else{
                    return {status: 501, message: "Wrong Password"};
                }
            }else{
                return {status: 404, message: "User Not Found"};
            }
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
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
    async getConstituencies() {
        try{
            const response = await constituencyModel.find({is_active: true});
            return {status: 200, message: "All Constituencies", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    }
}

module.exports = service