var express = require("express");
var router = express.Router();
const users = require("../controllers/users");
const auth = require("../middleware/auth");

router.get("/", users.getUsers);
router.get("/:_id/favs", auth, users.getUserFavoriteCards);
router.post("/signup", users.signup);
router.post("/login", users.login);
router.post("/:_id", users.setFavorite);
router.patch("/:_id", users.edit);
router.delete("/:_id", users.delete);
module.exports = router;
