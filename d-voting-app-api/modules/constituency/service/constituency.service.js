const { default: mongoose } = require("mongoose");
const constituencyModel = require("../../../models/constituency.model")

const service = {
    async addNewConstituency(data) {
        try{
            const response = await constituencyModel.create(data);
            return {status: 200, message: "New Constituency Addedd", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async updateConstituency(constituency_id,data) {
        try{
            const response = await constituencyModel.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(constituency_id)
            },{
                $set: data
            },{
                new: true
            });
            return {status: 200, message: "Constituency Updated", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async deleteConstituency(constituency_id) {
        try{
            const response = await constituencyModel.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(constituency_id)
            });
            return {status: 200, message: "Constituency Deleted", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async getConstituencyData(getAllData = true, name = '') {
        try{
            let response;
            if(getAllData){
                let aggregatePipeline = [
                    {
                        $lookup: {
                            from: "candidates",
                            let: { const_id: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$const_id", "$constituency_id"] }
                                    }
                                }
                            ],
                            as: "candidates"
                        }
                    },
                    {
                        $addFields:{
                            candidates: {
                                $size: "$candidates"
                            }
                        }
                    }
                ]
                response = await constituencyModel.aggregate(aggregatePipeline);
            }else{
                const searchRegex = new RegExp(name);
                response = await constituencyModel.find({
                    name: { $regex: searchRegex, $options: "i" }
                });
            }
            return {status: 200, message: "All Constituency Data", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    },

}
module.exports = service;