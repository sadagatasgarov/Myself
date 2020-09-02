const express = require("express");
const {
  getAccesToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth");
const { blockUser, deleteUser } = require("../controller/admin");
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers");
const router = express.Router();
//router.use(checkUserExist);
router.use([getAccesToRoute, getAdminAccess]);

/* router.get("/",(req,res,next)=>{
    res.status(200)
    .json({
        success:true,
        message:"admin page"
    })
}); */
router.get("/block/:id", checkUserExist, blockUser);
router.delete("/user/:id", checkUserExist, deleteUser);

module.exports = router;
