"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', async (_req, res) => {
    try {
        const users = await user_1.default.find().populate('team', 'name city').lean();
        res.status(200).json({ resource: 'users', count: users.length, data: users });
    }
    catch {
        res.status(500).json({ resource: 'users', message: 'Failed to fetch users' });
    }
});
exports.default = usersRouter;
