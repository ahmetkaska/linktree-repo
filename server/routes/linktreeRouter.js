const express = require("express");
const { adminLogin, getLinktree, createLinktree, getSingleLinktree, deleteLinktree, updateLinktree, logout } = require("../controllers/linktreeController.js");

const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', logout);

router.get("/", getLinktree);
router.get("/:id", getSingleLinktree);
router.post('/', createLinktree);
router.patch('/:id', updateLinktree);
router.delete("/:id", deleteLinktree);

module.exports = router;
