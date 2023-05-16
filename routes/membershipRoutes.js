const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin');
const requireAdminAccess = require("../middlewares/requireAdminAccess");
const logError = require("../services/utils");



module.exports = (app) => {
    const Offer = mongoose.model('danceoasismembershipoffers');

    app.get("/api/membership", async (req, res) => {

        const offers = await Offer.find()
        res.send(offers);

    })

    app.post("/api/membership", requireLogin, requireAdminAccess, async (req, res) => {
        const { name, description, price } = req.body;
        const offer = new Offer({
            name,
            description,
            price
        });
        offer.save().then((res) => {

        }).catch((err) => { //logError(err) 
        });
        try {
            res.send(offer);
        } catch (error) {
            res.status(422).send(error);
        }

    });

};