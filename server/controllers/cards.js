const { Card } = require('../models/Card');
const joi = require('joi');

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await Card.find({});
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting cards' });
        }
    },

    getItem: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await Card.findOne({ _id: value._id });
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the card" });
        }
    },

    add: async function (req, res, next) {
        try {
            const scheme = joi.object({
            title: joi.string().required().min(2).max(256),
            subtitle: joi.string().required().min(2).max(256),
            description: joi.string().required().min(2).max(1024),
            email: joi.string().min(6).max(255).required().email(),
            web: joi.string().min(2).max(1024),
            imageUrl: joi.string().min(6).max(1024),
            imageAlt: joi.string().min(6).max(1024),
            state: joi.string().min(2).max(256),
            country: joi.string().min(2).max(256).required(),
            city: joi.string().min(2).max(256).required(),
            street: joi.string().min(2).max(256).required(),
            houseNumber: joi.number().min(1).max(20).required(),
            zip: joi.string().min(5).max(20),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const newCards = new Card(value);
            const result = await newCards.save();

            res.json({
                ...value,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add card" });
        }
    },

    delete: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const deleted = await Card.findOne({ _id: value._id });

            await Card.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete card" });
        }
    },

    edit: async function (req, res, next) {
        try {
            const scheme = joi.object({
               title: joi.string().required().min(2).max(256),
            subtitle: joi.string().required().min(2).max(256),
            description: joi.string().required().min(2).max(1024),
            email: joi.string().min(6).max(255).required().email(),
            web: joi.string().min(2).max(1024),
            imageUrl: joi.string().min(6).max(1024),
            imageAlt: joi.string().min(6).max(1024),
            state: joi.string().min(2).max(256),
            country: joi.string().min(2).max(256).required(),
            city: joi.string().min(2).max(256).required(),
            street: joi.string().min(2).max(256).required(),
            houseNumber: joi.number().min(1).max(20).required(),
            zip: joi.string().min(5).max(20),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const card = await Card.findOneAndUpdate({
                _id: req.params.id
            }, value);

            if (!card) return res.status(404).send('Given ID was not found.');

            const updated = await Card.findOne({ _id: req.params.id });
            res.json(updated);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "fail to update data" });
        }
    },
}