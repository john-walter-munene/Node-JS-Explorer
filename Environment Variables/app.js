require('dotenv').config();
// console.log("dotenv loaded:", process.env); // Debug line

if (process.env.NODE_ENV === "prod") {
    console.log("Running in production!");
}

if (process.env.VIDEO_URL) {
    console.log(`Video URL is: ${process.env.VIDEO_URL}`);
}

if (process.env.TRIAL_VAR) {
    console.log(`This application is written by Goldenstar${Number(process.env.TRIAL_VAR)}`);
}