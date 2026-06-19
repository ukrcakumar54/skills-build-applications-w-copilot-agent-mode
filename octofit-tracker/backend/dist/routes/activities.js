"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const activitiesRouter = (0, express_1.Router)();
activitiesRouter.get('/', async (_req, res) => {
    try {
        const activities = await activity_1.default.find()
            .populate('user', 'name email')
            .sort({ performedAt: -1 })
            .lean();
        res.status(200).json({
            resource: 'activities',
            count: activities.length,
            data: activities,
        });
    }
    catch {
        res.status(500).json({ resource: 'activities', message: 'Failed to fetch activities' });
    }
});
exports.default = activitiesRouter;
