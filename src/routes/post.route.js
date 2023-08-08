const express = require("express");
const {create, read, update, deletePost} = require("../controllers/post.controller");
const {verifyToken} = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/read", verifyToken, read);
router.put("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, deletePost);

module.exports = router;
