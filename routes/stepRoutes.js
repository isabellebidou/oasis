const _ = require('lodash')
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireAdminAccess = require("../middlewares/requireAdminAccess");




module.exports = (app) => {
    const Step= mongoose.model('steps');

    app.get("/api/steps", async (req, res) => {

        const steps = await Step.find()
        res.send(steps);

    })

    app.post("/api/step", requireLogin, requireAdminAccess, async (req, res) => {
        const { name } = req.body;
        const step = new Step({
            name
        });
        step.save().then((res) => {

        }).catch((err) => { //logError(err)
         });
        try {
            res.send(step);
        } catch (error) {
            res.status(422).send(error);
        }

    });

};