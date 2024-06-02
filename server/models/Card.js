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
  imageUrl: {
    type: String,
    required: false,
  },
  userId: {
    type: String,
    require: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

exports.Card = Card;
