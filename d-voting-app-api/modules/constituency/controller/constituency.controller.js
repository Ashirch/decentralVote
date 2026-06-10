
const service = require("../service/constituency.service")
const controller = (req, next) => {
    return {
        addNewConstituency: async (res) => {
            try {
                const jsonDetails = req.body.details;
                const serviceResponse = await service.addNewConstituency(jsonDetails);
                res.send(serviceResponse);
            }catch(err){
                console.log(err);
                res.send({status: 500, message: "Something went Wrong"});
            }
        },
        updateConstituency: async (res) => {
            try {
                const jsonDetails = req.body.details;
                const serviceResponse = await service.updateConstituency(jsonDetails.constituency_id, jsonDetails.constituency_data);
                res.send(serviceResponse);
            }catch(err){
                res.send({status: 500, message: "Something went Wrong"});
            }
        },
        deleteConstituency: async (res) => {
            try {
                const jsonDetails = req.body.details;
                const serviceResponse = await service.deleteConstituency(jsonDetails.constituency_id);
                res.send(serviceResponse);
            }catch(err){
                res.send({status: 500, message: "Something went Wrong"});
            }
        },
        getConstituency: async (res) => {
            try {
                const jsonDetails = req.body.details;
                if(jsonDetails.searchName == ''){
                    const serviceResponse = await service.getConstituencyData();
                    res.send(serviceResponse);
                }else{
                    const serviceResponse = await service.getConstituencyData(false,jsonDetails.searchName);
                    res.send(serviceResponse);
                }
            }catch(err){
                res.send({status: 500, message: "Something went Wrong"});
            }
        }
    }
}

module.exports = controller; 