const router = require("express").Router();
const controller = require("./controller/constituency.controller");

router.route("/addNewConstituency").post(async (req, res, next) => {
    controller(req, next).addNewConstituency(res);
});
router.route("/updateConstituency").post(async (req, res, next) => {
    controller(req, next).updateConstituency(res);
});
router.route("/deleteConstituency").post(async (req, res, next) => {
    controller(req, next).deleteConstituency(res);
});
router.route("/getConstituencies").post(async (req, res, next) => {
    controller(req, next).getConstituency(res);
});

module.exports = router;
