var express = require("express");
var router = express.Router();
const cards = require("../controllers/cards");
const auth = require("../middleware/auth");
router.get("/:_id/myCards", auth, cards.myCards);
router.get("/", cards.getAll);
router.get("/:_id", auth, cards.getItem);
router.post("/", cards.add);
router.patch("/", cards.edit);
router.delete("/:_id", auth, cards.delete);

module.exports = router;
