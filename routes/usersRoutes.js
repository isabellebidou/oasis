const _ = require('lodash')



const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireAdminAccess = require("../middlewares/requireAdminAccess");


module.exports = (app) => {

  const User = mongoose.model('danceusers');
  const UserData = mongoose.model("danceuserdata");

  app.get("/api/users_all", requireLogin, requireAdminAccess, async (req, res) => {
    const users = await User.aggregate([
      {
        $lookup: {
          from: "feedbacks",
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_user", "$$userId"] }
              }
            }
          ],
          as: "feedbacks"
        }
      },
      {
        $addFields: {
          hasUnattendedFeedback: {
            $size: {
              $filter: {
                input: "$feedbacks",
                cond: { $eq: ["$$this.dateCompleted", null] }
              }
            }
          }
        }
      },
      {
        $sort: {
          hasUnattendedFeedback: -1
        }
      }
    ]);
  
    res.send(users);
  });
  

  app.get("/api/selected_user/:id", async (req, res) => {
    try {
      const userData = await User.find({ _user: req.params.id  });
      res.send(userData);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
}

