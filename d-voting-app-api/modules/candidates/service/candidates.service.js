const mongoose = require("mongoose");
const candidateModel = require("../../../models/candidate.model")

const service = {
    async addCandidate(data) {
        try{
            const createResponse = await candidateModel.create(data);
            const response = await candidateModel.findOne({_id: new mongoose.Types.ObjectId(createResponse._id)}).populate("constituency_id", "_id name").populate("party_id", "_id name");
            return {status: 200, message: "New Candidate Addedd", data: response};
        }catch(err){
            console.log(err)
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async updateCandidate(candidate_id,data) {
        try{
            const response = await candidateModel.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(candidate_id)
            },{
                $set: data
            },{
                new: true
            }).populate("constituency_id", "_id name").populate("party_id", "_id name").populate("election_id", "_id name");
            return {status: 200, message: "Candidate Updated", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async deleteCandidate(candidate_id) {
        try{
            const response = await candidateModel.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(candidate_id)
            });
            return {status: 200, message: "Candidate Deleted", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async getCandidates(getAllData = true, name = '') {
        try{
            let response;
            if(getAllData){
                response = await candidateModel.find({}).populate("constituency_id", "_id name").populate("party_id", "_id name").populate("election_id", "_id name");
            }else{
                const searchRegex = new RegExp(name);
                response = await candidateModel.find({
                    name: { $regex: searchRegex, $options: "i" }
                });
            }
            return {status: 200, message: "All Candidate Data", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    },
}

module.exports = service