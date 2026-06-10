const router = require("express").Router();
const controller = require("./controller/voters.controller");


router.route("/getAllVoters").post(async (req, res, next) => {
    controller(req, next).getAllVoters(res);
});
router.route("/convertVoterToAdmin").post(async (req, res, next) => {
    controller(req, next).voterToAdmin(res);
});
router.route("/updateVoter").post(async (req, res, next) => {
    controller(req, next).updateVoter(res);
});
router.route("/deleteVoter").post(async (req, res, next) => {
    controller(req, next).deleteVoter(res);
});

router.route("/getConstituencies").post(async (req, res, next) => {
    controller(req, next).getConstituencies(res);
});

module.exports = router;
