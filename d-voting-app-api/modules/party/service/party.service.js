const mongoose = require("mongoose");
const partyModel = require("../../../models/party.model")
const electionModel = require("../../../models/election.model");
const service = {
    async addNewParty(data) {
        try{
            const response = await partyModel.create(data);
            return {status: 200, message: "New Party Addedd", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async updateParty(party_id,data) {
        try{
            const response = await partyModel.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(party_id)
            },{
                $set: data
            },{
                new: true
            });
            return {status: 200, message: "Party Updated", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async deleteParty(party_id) {
        try{
            const response = await partyModel.findByIdAndDelete({
                _id: new mongoose.Types.ObjectId(party_id)
            });
            return {status: 200, message: "Party Deleted", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async getConstituencyParty(constituency_id) {
        try{
            const aggregatePipeline = [
                {
                    $match: {
                        constituency_id: new mongoose.Types.ObjectId(constituency_id)
                    }
                },{
                    $project: {
                        name: 1
                    }
                }
            ]
            const result = await partyModel.aggregate(aggregatePipeline)
            return {status: 200, message: "Party Data", data: result};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async getConstituencyElections(constituency_id) {
        try{
            const response = await electionModel.find({constituency_id: new mongoose.Types.ObjectId(constituency_id), election_ended: false});
            return {status: 200, message: "Constituency Elections Data", data: response};
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async castVote(part_id, user_id){
        try{
            const checkResponse = await partyModel.findOne({_id: new mongoose.Types.ObjectId(part_id)});
            console.log(checkResponse);
            if(checkResponse){
                console.log(checkResponse);
                let updationResponse = null;
                if(checkResponse.voters.length === 0){
                    const user_ids = [user_id];
                    updationResponse = await partyModel.findOneAndUpdate({
                        _id: new mongoose.Types.ObjectId(part_id)
                    },{
                        $set: {
                            voters: user_ids
                        }
                    })
                }else if(checkResponse.voters.includes(user_id)){
                    return {status: 200, message: "Already Voted"};
                }else{
                    let user_ids = checkResponse.voters;
                    user_ids.push(user_id);
                    updationResponse = await partyModel.findOneAndUpdate({
                        _id: new mongoose.Types.ObjectId(part_id)
                    },{
                        $set: {
                            voters: user_ids
                        }
                    })
                }
                return {status: 200, message: "Voted Successfully", data: updationResponse};
            }
        }catch(err){
            console.log(err);
            return {status: 500, message: "Something Went Wrong"}
        }
    },
    async getPartyData(getAllData = true, name = '') {
        try{
            let response;
            if(getAllData){
                let aggregatePipeline = [
                    {
                        $lookup: {
                            from: "candidates",
                            let: { part_id: "$_id" },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ["$$part_id", "$party_id"] }
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
                response = await partyModel.aggregate(aggregatePipeline);
            }else{
                const searchRegex = new RegExp(name);
                response = await partyModel.find({
                    name: { $regex: searchRegex, $options: "i" }
                });
            }
            return {status: 200, message: "All Party Data", data: response};
        }catch(err){
            return {status: 500, message: "Something Went Wrong"}
        }
    },

}
module.exports = service;