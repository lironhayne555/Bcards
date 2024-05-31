const { Card } = require("../models/Card");
const { User } = require("../models/User");
const joi = require("joi");
const multer = require("multer");
const path = require("path");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const result = await Card.find({});

      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting cards" });
    }
  },
  // getItemByUser: async function (req, res, next) {
  //     try {
  //         const scheme = joi.object({
  //             userId: joi.string().required(),
  //         });

  //         const { error, value } = scheme.validate({ userId: req.params._id });

  //         if (error) {
  //             console.log(error.details[0].message);
  //             res.status(400).json({ error: "invalid data" });
  //             return;
  //         }

  //         const result = await Card.find({ userId: value.userId });
  //         res.json(result);
  //     }
  //     catch (err) {
  //         console.log(err);
  //         res.status(400).json({ error: "error get the cards" });
  //     }
  // },
  getUserFavoriteCards: async function (req, res, next) {
    try {
      const _id = req.params._id;
      const user = await User.findById(_id).populate("favorites");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const favoriteCards = user.favorites;

      return res.status(200).json(favoriteCards);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  myCards: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string(),
      });

      const { error, value } = scheme.validate({ _id: req.params._id });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const result = await Card.find({ userId: value._id });
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting your cards" });
    }
  },
  getItem: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string().required(),
      });

      const { error, value } = scheme.validate({ _id: req.params._id });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const result = await Card.findOne({ _id: value._id });
      res.json(result);
    } catch (err) {
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
        phone: joi.string().min(6).max(256).required(),
        email: joi.string().min(6).max(256).required().email(),
        web: joi.string().min(2).max(1024).allow("", null).empty(""),
        imageUrl: joi
          .string()
          .min(6)
          .max(1024)
          .allow("", null)
          .empty("")
          .optional(),
        imageAlt: joi.string().min(6).max(1024).allow("", null).empty(""),
        // state: joi.string().min(2).max(256).allow('', null).empty(''),
        country: joi.string().min(2).max(256).required(),
        city: joi.string().min(2).max(256).required(),
        street: joi.string().min(2).max(256).required(),
        houseNumber: joi.number().min(1).max(1000).required(),
        zip: joi.string().min(5).max(50).allow("", null).empty(""),
        userId: joi.string().required(),
      });
      // const imageFile = req.body.imageFile;
      // delete req.body.imageFile;
      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }
      if (req.file) {
let imagefileURL =`http://localhost:8080/images/${req.file.filename}`;
       
        value.imageUrl = imagefileURL;
      }
      const newCards = new Card(value);

      const result = await newCards.save();

      res.status(200).json({
        status: "success",
        ...newCards,
        _id: result._id,
      });
    } catch (err) {
      console.log(err);
      // res.status(400).json({ err: "error add card" }).statusText(err?.message);
    }
  },

  delete: async function (req, res, next) {
    try {
      const scheme = joi.object({
        _id: joi.string().required(),
      });

      const { error, value } = scheme.validate({ _id: req.params._id });

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const deleted = await Card.findOne({ _id: value._id });

      await Card.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
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
        phone: joi.string().min(6).max(256).required(),
        email: joi.string().min(6).max(256).required().email(),
        web: joi.string().min(2).max(1024).allow("", null).empty(""),
        imageUrl: joi
          .string()
          .min(6)
          .max(1024)
          .allow("", null)
          .empty("")
          .optional(),
        imageAlt: joi.string().min(6).max(1024).allow("", null).empty(""),
        state: joi.string().min(2).max(256).allow("", null).empty(""),
        country: joi.string().min(2).max(256).required(),
        city: joi.string().min(2).max(256).required(),
        street: joi.string().min(2).max(256).required(),
        houseNumber: joi.number().min(1).max(1000).required(),
        zip: joi.string().min(5).max(50).allow("", null).empty(""),
      });
      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }
      if (req.file) {
        let imagefileURL = req.file.path.replace(
          /^public\\images\\/,
          "http://localhost:8080/images/"
        );
        value.imageUrl = imagefileURL;
      } else {
        value.imageUrl = "";
      }

      const card = await Card.findOneAndUpdate(
        {
          _id: req.params._id,
        },
        value
      );

      if (!card) return res.status(404).send("Given ID was not found.");

      const updated = await Card.findOne({ _id: req.params._id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },

  setFavorite: async function (req, res, next) {
    const cardId = req.params._id;
    const userId = req.body;
    let status = false;
    try {
      const card = await Card.findById(cardId);
      const user = await User.findById(userId);
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      const cardIndex = card.favorites.indexOf(userId);
      const userIndex = user.favorites.indexOf(cardId);

      if (cardIndex === -1) {
        card.favorites.push(userId);
        status = true;
      } else {
        card.favorites.splice(cardIndex, 1);
        status = false;
      }

      if (userIndex === -1) {
        user.favorites.push(cardId);
      } else {
        user.favorites.splice(userIndex, 1);
      }

      await card.save();
      await user.save();
      const { title } = card;

      return res.status(200).json({ title, status });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
};
