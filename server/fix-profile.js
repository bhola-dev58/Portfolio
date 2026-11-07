/**
 * One-time fix: update profile address fields in MongoDB
 * Run: cd server && node fix-profile.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const { Profile } = require('./models');

const fixProfile = async () => {
    await connectDB();

    const result = await Profile.updateOne({}, {
        $set: {
            address: 'ITPL Main Road Bengaluru, Karnataka, India',
            address_temp: 'ITPL Main Road Bengaluru, Karnataka, India',
            address_perm: 'ITPL Main Road Bengaluru, Karnataka, India',
        }
    });

    if (result.matchedCount === 0) {
        console.log('No profile found in DB. Creating one...');
        await Profile.create({
            address: 'ITPL Main Road Bengaluru, Karnataka, India',
            address_temp: 'ITPL Main Road Bengaluru, Karnataka, India',
            address_perm: 'ITPL Main Road Bengaluru, Karnataka, India',
        });
        console.log('Profile created with address.');
    } else {
        console.log(`Profile address updated. Modified: ${result.modifiedCount}`);
    }

    await mongoose.disconnect();
    process.exit(0);
};

fixProfile().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});

