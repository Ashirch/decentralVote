const router = require("express").Router();
const controller = require("./controller/candidates.controller");

router.route("/addNewCandidate").post(async (req, res, next) => {
    controller(req, next).addNewCandidate(res);
});
router.route("/updateCandidate").post(async (req, res, next) => {
    controller(req, next).updateCandidate(res);
});
router.route("/deleteCandidate").post(async (req, res, next) => {
    controller(req, next).deleteCandidate(res);
});
router.route("/getAllCandidates").post(async (req, res, next) => {
    controller(req, next).getAllCandidates(res);
});
module.exports = router;
