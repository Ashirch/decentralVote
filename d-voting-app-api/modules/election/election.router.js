const router = require("express").Router();
const controller = require("./controller/election.controller");

router.route("/addElection").post(async (req, res, next) => {
    controller(req, next).addElection(res);
});
router.route("/updateElection").post(async (req, res, next) => {
    controller(req, next).updateElection(res);
});
router.route("/deleteElection").post(async (req, res, next) => {
    controller(req, next).deleteElection(res);
});
router.route("/getElections").post(async (req, res, next) => {
    controller(req, next).getElections(res);
});
router.route("/getConstituencyElections").post(async (req, res, next) => {
    controller(req, next).getConstituencyElections(res);
});
// router.route("/getConstituencyParties").post(async (req, res, next) => {
//     controller(req, next).getConstituencyParties(res);
// });

module.exports = router;
