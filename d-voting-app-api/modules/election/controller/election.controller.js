const service = require("../service/election.service")
const mongoose = require("mongoose");
const awsService = require("../../../shared/aws.service");
const CONFIG = require("../../../config/config");
const bucket = CONFIG.AWS.BUCKET_NAME;
const controller = (req, next) => {
    return {
        addElection : async (res) => {
            try {
                const jsonDetails = req.body.details;
                console.log(jsonDetails);
                const serviceResponse = await service.addElection(jsonDetails);
                res.send(serviceResponse);
            }catch(err){
                console.log(err);
                res.send({status: 500, message: "Something went Wrong"});
            }
        },
        getElections : async (res) => {
            try {
                const jsonDetails = req.body.details;
                if(jsonDetails.searchName == ''){
                    const serviceResponse = await service.getElections();
                    res.send(serviceResponse);
                }else{
                    const serviceResponse = await service.getElections(false,jsonDetails.searchName);
                    res.send(serviceResponse);
                }
            }catch(err){
                console.log(err);
                res.send({status: 500, message: "Something went Wrong"});
            }
        },
        updateElection: async(res) => {
            try{
                const jsonDetails = req.body.details;
                const serviceResponse = await service.updateElection(jsonDetails.election_id, jsonDetails.election_data);
                res.send(serviceResponse);
            }catch(err){
                console.log(err);
                res.send({status: 500, message: "Something went Wrong"});
            }
        },
        deleteElection: async(res) =>{
            try{
                const jsonDetails = req.body.details;
                const serviceResponse = await service.deleteElection(jsonDetails.election_id);
                res.send(serviceResponse);
            }catch(err){
                console.log(err);
                res.send({status: 500, message: "Something went Wrong"});
            }
        },
        getConstituencyElections: async (res) => {
            try{
                const filter = req.body.details.filter;
                for (const key in filter){
                    if(key === "constituency_id"){
                        filter[key] = new mongoose.Types.ObjectId(filter[key]);
                    }
                }
                const serviceResponse = await service.getConstituencyElections(filter);
                for await(const election of serviceResponse.data){
                    for await(const candidate of election.candidates){
                        if(candidate.party){
                            candidate.party.imageURL = await awsService.generateAWSPresignedUrl(bucket,"party/"+ candidate.party.imageURL);
                        }
                    }
                }
                res.send(serviceResponse);
            }catch(err){
                console.log(err);
                res.send({status: 500, message: "Something went Wrong"});
            }
        }
    }
}

module.exports = controller