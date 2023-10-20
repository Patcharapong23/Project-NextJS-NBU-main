const router = require("express").Router();
const Usercontroller = require("../controllers/user.controller");

router.post("/register", Usercontroller.register);
router.post("/login-user", Usercontroller.login);

module.exports = router;
