const Linktree = require("../models/linktreeModel.js");

const adminUser = {
    username: 'admin',
    password: '8bX$3qzP#L9f@7Jv'
};

const adminLogin = (req, res) => {
    const { username, password } = req.body;
    if (username === adminUser.username && password === adminUser.password) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ message: 'Logout successful' });
    });
};

const getLinktree = async (req, res) => {
    try {
        const linktreeAll = await Linktree.find();
        res.status(200).json(linktreeAll);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getSingleLinktree = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const linktree = await Linktree.findById(_id);
        res.status(200).json(linktree);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const createLinktree = async (req, res) => {
    const newLinktree = new Linktree(req.body);
    try {
        await newLinktree.save();
        res.status(201).json(newLinktree);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const updateLinktree = async (req, res) => {
    const { id: _id } = req.params;
    const linktree = req.body;
    try {
        const updatedLinktree = await Linktree.findByIdAndUpdate(_id, linktree, { new: true });
        res.json(updatedLinktree);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const deleteLinktree = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const deletedLinktree = await Linktree.findByIdAndDelete(_id);
        res.json(deletedLinktree);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = {
    adminLogin,
    logout,
    getLinktree,
    getSingleLinktree,
    createLinktree,
    updateLinktree,
    deleteLinktree
};
