const { User } = require("../models/User");
const { Card } = require("../models/Card");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../config/dev");
const { default: mongoose } = require("mongoose");

module.exports = {
  setFavorite: async function (req, res, next) {
    const cardId = req.params._id;
    const { userId } = req.body;
    let status = false;
    try {
      const user = await User.findById(userId);
      const cardIndex = user.favorites.findIndex((card) => {
        return card._id.toString() === cardId;
      });
      if (cardIndex !== -1) {
        user.favorites.splice(cardIndex, 1);
      } else {
        user.favorites.push(`${cardId}`);
      }

      user.save();

      return res.status(200);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  getUsers: async function (req, res, next) {
    try {
      const result = await User.find();
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting users" });
    }
  },

  login: async function (req, res, next) {
    const schema = joi.object({
      email: joi.string().required().min(6).max(256).email(),
      password: joi.string().required().min(6).max(1024),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(401).send("Unauthorized").text(error.details[0].message);
      return;
    }

    try {
      const user = await User.findOne({ email: value.email });
      if (!user) throw Error;
      const validPassword = await bcrypt.compare(value.password, user.password);
      if (!validPassword) throw "Invalid password";

      const param = { email: value.email };
      const token = jwt.sign(param, config.jwt_token, { expiresIn: "72800s" });

      res.json({
        token: token,
        _id: user._id,
        favorites: user.favorites,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness,
        phone: user.phone,
        country: user.country,
        city: user.city,
        street: user.street,
        houseNumber: user.houseNumber,
        zip: user.zip ? user.zip : "",
        middleName: user.middleName ? user.middleName : "",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send("Invalid data.");
    }
  },
  getUserFavoriteCards: async function (req, res, next) {
    try {
      const _id = req.params._id;
      if (!_id) {
        return res.status(404).json({ message: "User not found" });
      } else {
        const user = await User.findById(_id);
        const idsCards = await user.favorites;
        const favoriteCards = await Card.find({
          _id: { $in: idsCards },
        }).exec();
        console.log("Favorite Cards:", favoriteCards);
        return res.status(200).json(favoriteCards);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
  },
  signup: async function (req, res, next) {
    const schema = joi.object({
      firstName: joi.string().required().min(2).max(256),
      lastName: joi.string().required().min(2).max(256),
      email: joi.string().min(6).max(255).required().email(),
      middleName: joi.string().min(2).max(256).allow("", null).empty(""),
      phone: joi.string().min(6).max(256).required(),
      password: joi.string().min(6).max(1024).required(),
      imageUrl: joi.string().min(6).max(1024).allow("", null).empty(""),
      imageAlt: joi.string().min(6).max(1024).allow("", null).empty(""),
      state: joi.string().min(2).max(256).allow("", null).empty(""),
      country: joi.string().min(2).max(256).required(),
      city: joi.string().min(2).max(256).required(),
      street: joi.string().min(2).max(256).required(),
      houseNumber: joi.number().min(1).max(1000).required(),
      zip: joi.string().min(5).max(50).allow("", null).empty(""),
      isAdmin: joi.boolean().allow("", null).empty(""),
      isBusiness: joi.boolean().required(),
      favorites: joi.array().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message);
      res.status(400).json({ error: "error sign up new user" });
      return;
    }

    try {
      const user = await User.findOne({ email: value.email });
      if (user) {
        return res.status(400).json({ error: "User already registered." });
      }

      const hash = await bcrypt.hash(value.password, 10);

      const newUser = new User({
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        middleName: value.middleName,
        phone: value.phone,
        password: hash,
        imageUrl: value.imageUrl,
        imageAlt: value.imageAlt,
        state: value.state,
        country: value.country,
        city: value.city,
        street: value.street,
        houseNumber: value.houseNumber,
        zip: value.zip,
        isAdmin: value.isAdmin,
        isBusiness: value.isBusiness,
        favorites: value.favorites,
      });

      await newUser.save();

      res.json({
        id: newUser._id,
        firstname: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        middleName: newUser.middleName,
        phone: newUser.phone,
        imageUrl: newUser.imageUrl,
        imageAlt: newUser.imageAlt,
        state: newUser.state,
        country: newUser.country,
        city: newUser.city,
        street: newUser.street,
        houseNumber: newUser.houseNumber,
        zip: newUser.zip,
        isAdmin: newUser.isAdmin,
        isBusiness: newUser.isBusiness,
      });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ error: "error sign up new user" });
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
      const deleted = await User.findOne({ _id: value._id });

      await User.deleteOne(value).exec();
      res.json(deleted);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error delete vacation" });
    }
  },
  edit: async function (req, res, next) {
    try {
      const scheme = joi.object({
        firstName: joi.string().required().min(2).max(256),
        lastName: joi.string().required().min(2).max(256),
        email: joi.string().min(6).max(255).required().email(),
        middleName: joi.string().min(2).max(256).allow("", null).empty(""),
        phone: joi.string().min(6).max(256).required(),
        imageAlt: joi.string().min(6).max(1024).allow("", null).empty(""),
        country: joi.string().min(2).max(256).required(),
        city: joi.string().min(2).max(256).required(),
        street: joi.string().min(2).max(256).required(),
        houseNumber: joi.number().min(1).max(1000).required(),
        zip: joi.string().min(5).max(50).allow("", null).empty(""),
        isBusiness: joi.boolean().required(),
      });

      const { error, value } = scheme.validate(req.body);

      if (error) {
        console.log(error.details[0].message);
        res.status(400).json({ error: "invalid data" });
        return;
      }

      const user = await User.findOneAndUpdate(
        {
          _id: req.params._id,
        },
        value
      );

      if (!user) return res.status(404).send("Given ID was not found.");

      const updated = await User.findOne({ _id: req.params.id });
      res.json(updated);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "fail to update data" });
    }
  },
  getUserDetails: async function (req, res, next) {
    try {
      const _id = req.body().userId;
      const result = await User.findById(userId);
      if (!result) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(result);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "error getting user" });
    }
  },
};
