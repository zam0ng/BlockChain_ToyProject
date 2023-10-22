const router = require("express").Router();

const {getMenu} = require("../controllers/insertmenu");
router.get("/getmenu",getMenu)

module.exports = router;