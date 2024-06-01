const { number, string } = require("joi");
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 256,
  },
  subtitle: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 1024,
  },
  phone: {
    type: String,
    require: true,
    minlength: 6,
    maxlength: 256,
  },
  email: {
    type: String,
    minlength: 6,
    maxlength: 256,
  },
  web: {
    type: String,
    minlength: 2,
    maxlength: 1024,
  },
  imageUrl: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 1024,
  },
  imageAlt: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
  country: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 256,
  },
  city: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 256,
  },
  street: {
    type: String,
    require: true,
    minlength: 2,
    maxlength: 256,
  },
  houseNumber: {
    type: Number,
    require: true,
    minlength: 1,
    maxlength: 1000,
  },
  zip: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  userId: {
    type: String,
    require: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

exports.Card = Card;
