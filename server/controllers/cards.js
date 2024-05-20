const { Card } = require('../models/Card');
const { User } = require('../models/User')
const joi = require('joi');
const multer = require('multer');
const path = require('path');

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
      const paramsUser=JSON.parse(req.paramsׁ.user).id;
      const user = await User.findById(paramsUser).populate('favorites');
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      
      const favoriteCards = user.favorites;

      return res.status(200).json( favoriteCards );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
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
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the card" });
        }
    },

    add: async function (req, res, next) {
try{
            const scheme = joi.object({
                  title: joi.string().required().min(2).max(256),
                  subtitle: joi.string().required().min(2).max(256),
                  description: joi.string().required().min(2).max(1024),
                  phone: joi.string().min(6).max(256).required(),
                  email: joi.string().min(6).max(256).required().email(),
                  web: joi.string().min(2).max(1024).allow('', null).empty(''),
                  imageAlt: joi.string().min(6).max(1024).allow('', null).empty(''),
                  state: joi.string().min(2).max(256).allow('', null).empty(''),
                  country: joi.string().min(2).max(256).required(),
                  city: joi.string().min(2).max(256).required(),
                  street: joi.string().min(2).max(256).required(),
                  houseNumber: joi.number().min(1).max(1000).required(),
                  zip: joi.string().min(5).max(50).allow('', null).empty(''),
                  userId: joi.string().required()
            });
           
            const { error, value } = scheme.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" }).statusText(error.message);
                return;
            }
            const imagefileURL= req.file.path.replace(/\\/g, "/");
            //const newImageUrl = imagefileURL.slice(14)
            const fullUrl= "http://localhost:8080/server/"+imagefileURL
            value.imageUrl = fullUrl;
          
            const newCards = new Card(value);
            const result = await newCards.save();

            res.status(200).json({
                status: 'success',
                ...newCards,
                _id: result._id
            });
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add card" }).statusText(error.message);
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
            phone: joi.string().min(6).max(256).required(),
            email: joi.string().min(6).max(256).required().email(),
            web: joi.string().min(2).max(1024).allow('', null).empty(''),
            imageUrl: joi.string().min(6).max(1024).allow('', null).empty(''),
            imageAlt: joi.string().min(6).max(1024).allow('', null).empty(''),
            state: joi.string().min(2).max(256).allow('', null).empty(''),
            country: joi.string().min(2).max(256).required(),
            city: joi.string().min(2).max(256).required(),
            street: joi.string().min(2).max(256).required(),
            houseNumber: joi.number().min(1).max(1000).required(),
            zip: joi.string().min(5).max(50).allow('', null).empty(''),
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

    setFavorite: async function (req, res, next) {
    const cardId = req.params._id;
    const userId = req.body._id;
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
}