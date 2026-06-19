"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    focus: { type: String, required: true, trim: true },
    difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    equipment: { type: [String], default: [] },
    recommendedFor: { type: [String], default: [] },
}, { timestamps: true });
const Workout = mongoose_1.models.Workout ?? (0, mongoose_1.model)('Workout', workoutSchema);
exports.default = Workout;
