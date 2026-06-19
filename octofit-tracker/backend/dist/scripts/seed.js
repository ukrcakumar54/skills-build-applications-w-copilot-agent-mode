"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const activity_1 = __importDefault(require("../models/activity"));
const database_1 = require("../database");
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await (0, database_1.connectDatabase)();
    await Promise.all([
        activity_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        user_1.default.deleteMany({}),
        workout_1.default.deleteMany({}),
    ]);
    const users = await user_1.default.insertMany([
        {
            name: 'Ava Johnson',
            email: 'ava.johnson@octofit.dev',
            age: 28,
            fitnessLevel: 'intermediate',
            goals: ['Run 10K', 'Improve stamina'],
        },
        {
            name: 'Noah Lee',
            email: 'noah.lee@octofit.dev',
            age: 34,
            fitnessLevel: 'advanced',
            goals: ['Increase VO2 max', 'Maintain consistency'],
        },
        {
            name: 'Mia Patel',
            email: 'mia.patel@octofit.dev',
            age: 26,
            fitnessLevel: 'beginner',
            goals: ['Build core strength', 'Exercise 4x weekly'],
        },
        {
            name: 'Ethan Garcia',
            email: 'ethan.garcia@octofit.dev',
            age: 31,
            fitnessLevel: 'intermediate',
            goals: ['Cycle 100km monthly', 'Lower resting heart rate'],
        },
    ]);
    const teams = await team_1.default.insertMany([
        {
            name: 'Cardio Crew',
            city: 'Seattle',
            captain: users[0]._id,
            members: [users[0]._id, users[2]._id],
            totalPoints: 780,
        },
        {
            name: 'Power Pacers',
            city: 'Austin',
            captain: users[1]._id,
            members: [users[1]._id, users[3]._id],
            totalPoints: 860,
        },
    ]);
    await user_1.default.updateMany({ _id: { $in: [users[0]._id, users[2]._id] } }, { $set: { team: teams[0]._id } });
    await user_1.default.updateMany({ _id: { $in: [users[1]._id, users[3]._id] } }, { $set: { team: teams[1]._id } });
    await activity_1.default.insertMany([
        {
            user: users[0]._id,
            type: 'Running',
            durationMinutes: 52,
            distanceKm: 8.4,
            caloriesBurned: 620,
            performedAt: new Date('2026-06-14T06:45:00Z'),
        },
        {
            user: users[1]._id,
            type: 'HIIT',
            durationMinutes: 38,
            distanceKm: 0,
            caloriesBurned: 540,
            performedAt: new Date('2026-06-15T18:20:00Z'),
        },
        {
            user: users[2]._id,
            type: 'Yoga',
            durationMinutes: 45,
            distanceKm: 0,
            caloriesBurned: 210,
            performedAt: new Date('2026-06-16T07:10:00Z'),
        },
        {
            user: users[3]._id,
            type: 'Cycling',
            durationMinutes: 70,
            distanceKm: 24.2,
            caloriesBurned: 760,
            performedAt: new Date('2026-06-17T05:55:00Z'),
        },
    ]);
    await workout_1.default.insertMany([
        {
            title: 'Tempo 5K Builder',
            focus: 'Endurance',
            difficulty: 'intermediate',
            durationMinutes: 40,
            equipment: ['Running shoes', 'Heart-rate monitor'],
            recommendedFor: ['Ava Johnson', 'Ethan Garcia'],
        },
        {
            title: 'Core and Mobility Circuit',
            focus: 'Core Stability',
            difficulty: 'beginner',
            durationMinutes: 30,
            equipment: ['Yoga mat', 'Resistance band'],
            recommendedFor: ['Mia Patel'],
        },
        {
            title: 'Sprint Ladder Session',
            focus: 'Speed',
            difficulty: 'advanced',
            durationMinutes: 35,
            equipment: ['Running shoes', 'Timer'],
            recommendedFor: ['Noah Lee'],
        },
    ]);
    await leaderboard_1.default.insertMany([
        {
            period: '2026-W24',
            generatedAt: new Date('2026-06-18T23:00:00Z'),
            entries: [
                { user: users[1]._id, points: 320, rank: 1 },
                { user: users[3]._id, points: 290, rank: 2 },
                { user: users[0]._id, points: 275, rank: 3 },
                { user: users[2]._id, points: 240, rank: 4 },
            ],
        },
    ]);
    console.log('Seeding complete: users, teams, activities, leaderboard, workouts');
    await (0, database_1.disconnectDatabase)();
}
seed().catch(async (error) => {
    console.error('Seed failed:', error);
    await (0, database_1.disconnectDatabase)();
    process.exit(1);
});
