const service = require("../service/party.service");
const awsService = require("../../../shared/aws.service");
const CONFIG = require("../../../config/config");
const controller = (req, next) => {
  return {
    addNewParty: async (res) => {
      try {
        let bodyData = req.body.data;
        if (typeof bodyData === "string") {
          bodyData = JSON.parse(bodyData);
        }
        const bucket = CONFIG.AWS.BUCKET_NAME;
        let file = req.files.file;
        let awsResult = await awsService.uploadIntoS3Bucket(file.name,"party", bucket, file.data );
        if (awsResult) {
          const url = await awsService.generateAWSPresignedUrl(bucket, awsResult.key);
          bodyData['imageURL'] = awsResult.key.split('/')[1];
          const serviceResponse = await service.addNewParty(bodyData);
          serviceResponse.data.imageURL = url
          res.send(serviceResponse);
        }else{
            res.send({ status: 500, message: "Something went Wrong" });
        }
      } catch (err) {
        console.log(err);
        res.send({ status: 500, message: "Something went Wrong" });
      }
    },
    updateParty: async (res) => {
      try {
        let bodyData = req.body.data;
        const bucket = CONFIG.AWS.BUCKET_NAME;
        if (typeof bodyData === "string") {
          bodyData = JSON.parse(bodyData);
        }
        if(req.files && req.files.file){
            const file = req.files.file;
            const awsResult = await awsService.uploadIntoS3Bucket(file.name,"party", bucket, file.data );
            bodyData.party_data['imageURL'] = awsResult.key.split('/')[1];
        }
        console.log(bodyData.party_data);
        const serviceResponse = await service.updateParty(
            bodyData.party_id,
            bodyData.party_data
        );
        const keyName = "party/" + serviceResponse.data.imageURL;
        const url = await awsService.generateAWSPresignedUrl(bucket, keyName);
        serviceResponse.data['imageURL'] = url;
        res.send(serviceResponse);
      } catch (err) {
        console.log(err);
        res.send({ status: 500, message: "Something went Wrong" });
      }
    },
    deleteParty: async (res) => {
      try {
        const jsonDetails = req.body.details;
        const serviceResponse = await service.deleteParty(jsonDetails.party_id);
        res.send(serviceResponse);
      } catch (err) {
        console.log(err);
        res.send({ status: 500, message: "Something went Wrong" });
      }
    },
    getConstituencyParties: async (res) =>{
      try{
        const jsonDetails = req.body.details;
        const serviceResponse = await service.getConstituencyParty(jsonDetails.constituency_id);
        res.send(serviceResponse);
      }catch(err){
        console.log(err);
        res.send({ status: 500, message: "Something went Wrong" });
      }
    },
    getConstituencyElections: async (res) =>{
      try{
        const jsonDetails = req.body.details;
        const serviceResponse = await service.getConstituencyElections(jsonDetails.constituency_id);
        res.send(serviceResponse);
      }catch(err){
        console.log(err);
        res.send({ status: 500, message: "Something went Wrong" });
      }
    },
    getParty: async (res) => {
      try {
        const jsonDetails = req.body.details;
        const bucket = CONFIG.AWS.BUCKET_NAME;
        if (jsonDetails.searchName == "") {
          const serviceResponse = await service.getPartyData();
          for await (const p of serviceResponse.data){
            const keyName = "party/" + p.imageURL;
            const url =  await awsService.generateAWSPresignedUrl(bucket, keyName);
            p.imageURL = url;
          }
          res.send(serviceResponse);
        } else {
          const serviceResponse = await service.getPartyData(
            false,
            jsonDetails.searchName
          );
          serviceResponse.data.forEach(async (p)=>{
            const keyName = "party/" + p.imageURL;
            p.imageURL =  await awsService.generateAWSPresignedUrl(bucket, keyName);
          })
          res.send(serviceResponse);
        }
      } catch (err) {
        res.send({ status: 500, message: "Something went Wrong" });
      }
    },
    castVote: async (res) => {
      try{
        const jsonDetails = req.body.details;
        const serviceResponse = await service.castVote(jsonDetails.party_id,jsonDetails.user_id);
        res.send(serviceResponse);
      }catch(err){
        console.log(err);
        res.send({ status: 500, message: "Something went Wrong" });
      }
    }
  };
};

module.exports = controller;
