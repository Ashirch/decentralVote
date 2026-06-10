const service = require("../service/candidates.service");
const awsService = require("../../../shared/aws.service");
const CONFIG = require("../../../config/config");
const controller = (req, next) => {
    const bucket = CONFIG.AWS.BUCKET_NAME;
  return {
    addNewCandidate: async (res) => {
        try{
            let bodyData = req.body.data;
            let files = null;
            if (typeof bodyData === "string") {
              bodyData = JSON.parse(bodyData);
            }
            if(req.files){
                files = req.files;
                for (const key in files) {
                    const awsResult = await awsService.uploadIntoS3Bucket(files[key].name,"candidate", bucket, files[key].data );
                    if(awsResult){
                        bodyData[key] = awsResult.key.split('/')[1];
                    }
                }
            }
            const serviceResponse = await service.addCandidate(bodyData);
            if(serviceResponse.data && files){
                for (const key in files) {
                    const url = await awsService.generateAWSPresignedUrl(bucket, "candidate/"+serviceResponse.data[key]);
                    serviceResponse.data[key] = url
                }
            }
            res.send(serviceResponse);
        }catch(err){
            console.log(err);
            res.send({ status: 500, message: "Something went Wrong" });
        }
    },
    updateCandidate: async (res) => {
        try{
            let bodyData = req.body.data;
            let files = null;
            if (typeof bodyData === "string") {
              bodyData = JSON.parse(bodyData);
            }
            if(req.files){
                files = req.files;
                for (const key in files) {
                    const awsResult = await awsService.uploadIntoS3Bucket(files[key].name,"candidate", bucket, files[key].data );
                    if(awsResult){
                        bodyData.candidate_data[key] = awsResult.key.split('/')[1];
                    }
                }
            }
            const serviceResponse = await service.updateCandidate(bodyData.candidate_id,bodyData.candidate_data);
            if(serviceResponse.data && files){
                for (const key in files) {
                    const url = await awsService.generateAWSPresignedUrl(bucket, "candidate/"+serviceResponse.data[key]);
                    serviceResponse.data[key] = url
                }
            }
            res.send(serviceResponse);
        }catch(err){
            console.log(err);
            res.send({ status: 500, message: "Something went Wrong" });
        }
    },
    deleteCandidate: async (res) => {
        try{
            try {
                const jsonDetails = req.body.details;
                const serviceResponse = await service.deleteCandidate(jsonDetails.candidate_id);
                res.send(serviceResponse);
              } catch (err) {
                console.log(err);
                res.send({ status: 500, message: "Something went Wrong" });
              }
        }catch(err){
            console.log(err);
            res.send({ status: 500, message: "Something went Wrong" });
        }
    },
    getAllCandidates: async (res) => {
        try{
            const serviceResponse = await service.getCandidates();
            for await (const candidate of serviceResponse.data){
                if(candidate.imageURL !== ""){
                    candidate.imageURL =  await awsService.generateAWSPresignedUrl(bucket,"candidate/" + candidate.imageURL);
                }
                if(candidate.docURL !== ""){
                    candidate.docURL =  await awsService.generateAWSPresignedUrl(bucket,"candidate/" + candidate.docURL);
                }
            }
            res.send(serviceResponse);
        }catch(err){
            console.log(err);
            res.send({ status: 500, message: "Something went Wrong" });
        }
    },

  }
}


module.exports = controller;
