var express = require("express");
var router = express.Router();
const cards = require("../controllers/cards");
const auth = require("../middleware/auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.get("/:_id/favs", auth, cards.getUserFavoriteCards);
router.get("/:_id/myCards", auth, cards.myCards);
router.get("/", cards.getAll);
router.get("/:_id", auth, cards.getItem);
router.post("/", upload.single("imageFile"), cards.add);
router.patch("/", upload.single("image"), cards.edit);
router.delete("/:_id", auth, cards.delete);

module.exports = router;
