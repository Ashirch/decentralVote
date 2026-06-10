const service = require("../service/user.service");
const awsService = require("../../../shared/aws.service");
const CONFIG = require("../../../config/config");
const bucket = CONFIG.AWS.BUCKET_NAME;
const controller = (req, next) => {
  return {
    register: async (res) => {
        try{
            let bodyData = req.body.data;
            let files = null;
            if (typeof bodyData === "string") {
              bodyData = JSON.parse(bodyData);

            }

            const serviceResponse = await service.register(bodyData);
            if(serviceResponse.data){
                if(req.files){
                    files = req.files;
                    for (const key in files) {
                        const awsResult = await awsService.uploadIntoS3Bucket(files[key].name,"user", bucket, files[key].data, serviceResponse.data._id);
                        if(awsResult){
                            const urlkey = awsResult.key.split('/')[1];
                            await service.updateUser(serviceResponse.data._id,{imageURL: urlkey})
                        }
                    }
                }
            }
            delete serviceResponse.data;
            res.send(serviceResponse);
        }catch(err){
            console.log(err);
            res.send({ status: 500, message: "Something went Wrong" });
        }
    },
    getConstituencies: async (res) => {
        try{
            const serviceResponse = await service.getConstituencies();
            res.send(serviceResponse);
        }catch(err){
            console.log(err);
            res.send({ status: 500, message: "Something went Wrong" });
        }
    },
    login: async (res) => {
        try {
            const bodyData = req.body.details;
            const serviceResponse = await service.loginUser(req,bodyData.email,bodyData.password);
            res.send(serviceResponse);
        }catch(err){
            console.log(err);
            res.send({ status: 500, message: "Something went Wrong" });
        }
    }
  }
}

module.exports = controller