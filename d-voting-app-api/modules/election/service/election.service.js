const mongoose = require("mongoose");
const electionModel = require("../../../models/election.model");

const service = {
  async addElection(data) {
    try {
      const saveResponse = await electionModel.create(data);
      if (saveResponse) {
        const response = await electionModel
          .findOne({ _id: new mongoose.Types.ObjectId(saveResponse._id) })
          .populate("constituency_id", "_id name");
        return { status: 200, message: "New Election Addedd", data: response };
      } else {
        return { status: 500, message: "Something Went Wrong" };
      }
    } catch (err) {
      console.log(err);
      return { status: 500, message: "Something Went Wrong" };
    }
  },
  async deleteElection(election_id) {
    try{
        const response = await electionModel.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(election_id)
        });
        return {status: 200, message: "Election Deleted", data: response};
    }catch(err){
        console.log(err);
        return {status: 500, message: "Something Went Wrong"}
    }
},
  async updateElection(election_id, data) {
    try {
      const response = await electionModel
        .findByIdAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(election_id),
          },
          {
            $set: data,
          },
          {
            new: true,
          }
        )
        .populate("constituency_id", "_id name");
      return { status: 200, message: "Constituency Updated", data: response };
    } catch (err) {
      return { status: 500, message: "Something Went Wrong" };
    }
  },
  async getElections(getAllData = true, name = "") {
    let response;
    if (getAllData) {
      response = await electionModel
        .find({})
        .populate("constituency_id", "_id name");
    } else {
      const searchRegex = new RegExp(name);
      response = await candidateModel.find({
        name: { $regex: searchRegex, $options: "i" },
      });
    }
    return { status: 200, message: "All Elections Data", data: response };
  },
  async getConstituencyElections(filters) {
    console.log(filters);
    const aggregatePipeline = [
      {
        $match: filters,
      },
      {
        $lookup: {
          from: "candidates",
          let: { elect_id: "$_id", constitute_id: "$constituency_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$$elect_id", "$election_id"] },
                    { $eq: ["$$constitute_id", "$constituency_id"] },
                  ],
                },
              },
            },
            {
              $lookup: {
                from: "parties",
                localField: "party_id",
                foreignField: "_id",
                as: "party",
              },
            },
            {
              $project: {
                _id: 1,
                first_name: 1,
                last_name: 1,
                party: 1,
              },
            },
            {
              $addFields: {
                party: { $arrayElemAt: ["$party", 0] },
              },
            },
          ],
          as: "candidates",
        },
      },
      {
        $lookup: {
          from: "constituencies",
          let: { constitute_id: "$constituency_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$$constitute_id", "$_id"],
                },
              },
            },
            {
              $project: {
                name: 1,
              },
            },
          ],
          as: "constituency_id",
        },
      },
      {
        $addFields: {
            constituency_id: { $arrayElemAt: ["$constituency_id", 0] },
        },
      },
    ];
    const response = await electionModel.aggregate(aggregatePipeline);
    return { status: 200, message: "All Elections Data", data: response };
  }
};

module.exports = service;
