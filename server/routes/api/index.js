const router = require("express").Router();

const elkRoutes = require('./elkRoutes')
// const {validateToken} =  require('../../middlewares/JwtValidation');

router.use("/elk", elkRoutes);



module.exports = router;