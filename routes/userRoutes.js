import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });

        await newUser.save();

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, password },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
