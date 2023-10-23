const router = require("express").Router();

const {insertMenu} = require("../controllers/insertmenu");
const {menuimginsert} = require("../middleware/menuimginsert");
router.post("/insert", menuimginsert.single("upload"), insertMenu)
router.post("/getmenu")

module.exports = router;