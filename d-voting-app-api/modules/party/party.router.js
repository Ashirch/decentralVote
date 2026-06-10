const router = require("express").Router();
const controller = require("./controller/party.controller");

router.route("/addNewParty").post(async (req, res, next) => {
    controller(req, next).addNewParty(res);
});
router.route("/updateParty").post(async (req, res, next) => {
    controller(req, next).updateParty(res);
});
router.route("/deleteParty").post(async (req, res, next) => {
    controller(req, next).deleteParty(res);
});
router.route("/getParties").post(async (req, res, next) => {
    controller(req, next).getParty(res);
});
router.route("/getConstituencyParties").post(async (req, res, next) => {
    controller(req, next).getConstituencyParties(res);
});
router.route("/getConstituencyElections").post(async (req, res, next) => {
    controller(req, next).getConstituencyElections(res);
});
router.route("/castVote").post(async (req, res, next) => {
    controller(req, next).castVote(res);
});
module.exports = router;
