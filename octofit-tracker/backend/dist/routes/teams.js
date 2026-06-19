"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const teamsRouter = (0, express_1.Router)();
teamsRouter.get('/', async (_req, res) => {
    try {
        const teams = await team_1.default.find()
            .populate('captain', 'name email')
            .populate('members', 'name email')
            .lean();
        res.status(200).json({ resource: 'teams', count: teams.length, data: teams });
    }
    catch {
        res.status(500).json({ resource: 'teams', message: 'Failed to fetch teams' });
    }
});
exports.default = teamsRouter;
