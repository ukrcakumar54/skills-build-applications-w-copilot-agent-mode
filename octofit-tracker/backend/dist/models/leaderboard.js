"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const leaderboardEntrySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
}, { _id: false });
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, required: true, trim: true },
    entries: { type: [leaderboardEntrySchema], default: [] },
    generatedAt: { type: Date, required: true },
}, { timestamps: true });
const Leaderboard = mongoose_1.models.Leaderboard ?? (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
exports.default = Leaderboard;
