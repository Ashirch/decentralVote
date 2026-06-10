const router = require("express").Router();
const controller = require("./controller/user.controller");


router.route("/loginUser").post(async (req, res, next) => {
    controller(req, next).login(res);
});

router.route("/register").post(async (req, res, next) => {
    controller(req, next).register(res);
});

router.route("/getConstituencies").post(async (req, res, next) => {
    controller(req, next).getConstituencies(res);
});

module.exports = router;
