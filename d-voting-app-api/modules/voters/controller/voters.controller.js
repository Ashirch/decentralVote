const service = require("../service/voters.service");
const awsService = require("../../../shared/aws.service");
const CONFIG = require("../../../config/config");
const bucket = CONFIG.AWS.BUCKET_NAME;
const controller = (req, next) => {
  return {
    getAllVoters: async (res) => {
      try {
        const serviceResponse = await service.getAllVoters();
        for await (const voter of serviceResponse.data) {
          if (voter.imageURL !== "") {
            voter.imageURL = await awsService.generateAWSPresignedUrl(
              bucket,
              "user/" + voter.imageURL
            );
          }
        }
        res.send(serviceResponse);
      } catch (err) {
        console.log(err);
        return { status: 500, message: "Something Went Wrong" };
      }
    },
    voterToAdmin: async (res) => {
      try {
        const jsonDetails = req.body.details;
        const serviceResponse = await service.convertVotertoAdmin(
          jsonDetails.user_id
        );
        res.send(serviceResponse);
      } catch (err) {
        console.log(err);
        return { status: 500, message: "Something Went Wrong" };
      }
    },
    updateVoter: async(res) => {
      try {
        const jsonDetails = req.body.details;
        const serviceResponse = await service.updateUser(jsonDetails.voter_id, jsonDetails.voter_data);
        res.send(serviceResponse);
      } catch (err) {
        console.log(err);
        return { status: 500, message: "Something Went Wrong" };
      }
    },
    deleteVoter: async (res) => {
      try {
        const jsonDetails = req.body.details;
        const serviceResponse = await service.deleteVoter(jsonDetails.user_id);
        res.send(serviceResponse);
      } catch (err) {
        console.log(err);
        return { status: 500, message: "Something Went Wrong" };
      }
    },
  };
};

module.exports = controller;
