const router = require("express").Router();
const partyRouter = require ("./modules/party/party.router");
const constituencyRouter = require ("./modules/constituency/constituency.router");
const candidateRouter = require ("./modules/candidates/candidates.router");
const electionRouter = require("./modules/election/election.router")
const userRouter = require("./modules/user/user.router")
const voterRouter = require("./modules/voters/voters.router")

router.use("/party", partyRouter);
router.use("/constituency", constituencyRouter);
router.use("/candidate", candidateRouter);
router.use("/election", electionRouter);
router.use("/voters", voterRouter);
router.use("/user", userRouter);
module.exports = router;