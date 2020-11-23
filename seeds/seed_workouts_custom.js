require("../config/db"); 
const mongoose = require("mongoose");

// to run
// node ./seeds/seed

const Workout = require("../model/workout.model")
let workouts = [{
            "workout_name": "Friendly Fran",
            "workout_type": "custom",
            "description": "3 rounds: 21 thrusters, 21 chest-to-bar pull-ups",
            "prescribed_male": 85,
            "prescribed_female": 115
        },
        {
            "workout_name": "Damn Diane",
            "workout_type": "custom",
            "description": "3 rounds: 15 deadlifts, 15 strict deficit HSPU. Deficit: M-3.5in, W-2in",
            "prescribed_male": 315,
            "prescribed_female": 205
        },
        {
            "workout_name": "Nasty Nancy",
            "workout_type": "custom",
            "description": "500m run, 15 overhead squats, 15 bar-facing burpees.",
            "prescribed_male": 185,
            "prescribed_female": 125
        },
        {
            "workout_name": "Awful Annie",
            "workout_type": "custom",
            "description": "50-40-30-20-10 Double-unders & GHD sit-up, 5-4-3-2-1 Clean",
            "prescribed_male": 275,
            "prescribed_female": 185
        },
        {
            "workout_name": "2007 Reload",
            "workout_type": "custom",
            "description": "1,500m row. Then, 5 rounds of 10 BMU, 7 S2OH",
            "prescribed_male": 145,
            "prescribed_female": 235
        },
        {
            "workout_name": "T2B, Lunge",
            "workout_type": "custom",
            "description": "30-20-10 reps for time T2B, KB Lunge(yards)",
            "prescribed_male": 70,
            "prescribed_female": 53,
        },
        {
            "workout_name": "Happy Star",
            "workout_type": "custom",
            "description": "4 rounds: 200 to 300m hill run.  5-7-9-11 reps of burpee and increasing weight thrusters (add 10lb each round).",
            "prescribed_male": 135,
            "prescribed_female": 95,
        },
        {
            "workout_name": "Sprint sled sprint",
            "workout_type": "custom",
            "description": "100-yard sprint, 100-yard sled push, 100-yard sprint",
            "prescribed_male": 105,
            "prescribed_female": 80,
        },
        {
            "workout_name": "Atalanta",
            "workout_type": "custom",
            "description": "1 mile run, 100 HSPU, 200 Pistol Squats, 300 pull ups, 1 mile run. With vest.",
            "prescribed_male": 20,
            "prescribed_female": 14,
        },
        
    ]

let user_id = new mongoose.Types.ObjectId("5f490686cfa6411951645972")

workouts.forEach((w,i) => {
    Workout.create({
        workout_name : w.workout_name,
        workout_type : w.workout_type,
        description : w.description,
        prescribed_male : w.prescribed_male,
        prescribed_female : w.prescribed_female,
        owner: user_id,
    })
    .then((e)=>{
        console.log(`Seeding workout ${i}`)
    })
    .catch(()=>{
        process.exit(1);
    })
});