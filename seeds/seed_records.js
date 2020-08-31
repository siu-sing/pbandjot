require("../config/db");
const "mongoose";
const Record = require("../model/workout.model")

// to run
// node ./seeds/seed

let records = [{
        "pb_date": "2020-06-01",
        "pb_weight": 195,
        "pb_time_min": 3,
        "pb_time_sec": 24,
        "workout_id": "5f4a7ae512c7847b86d918a1"
    },
    {
        "pb_date": "2020-06-02",
        "pb_weight": 195,
        "pb_time_min": null,
        "pb_time_sec": null,
        "workout_id": "5f4a7ae512c7847b86d9189a"

    },
    {
        "pb_date": "2020-07-01",
        "pb_weight": 185,
        "pb_time_min": null,
        "pb_time_sec": null,
        "workout_id": "5f4a7ae512c7847b86d9189d"

    },
    {
        "pb_date": "2020-07-02",
        "pb_weight": 200,
        "pb_time_min": null,
        "pb_time_sec": null,
        "workout_id": "5f4a7ae512c7847b86d9189d"

    },
    {
        "pb_date": "2020-07-03",
        "pb_weight": 215,
        "pb_time_min": null,
        "pb_time_sec": null,
        "workout_id": "5f4a7ae512c7847b86d9189d"

    },
    {
        "pb_date": "2020-05-01",
        "pb_weight": 20,
        "pb_time_min": 13,
        "pb_time_sec": 42,
        "workout_id": "5f4a7ae512c7847b86d918a3",
    },
]

records.forEach((r, i) => {
    Record.create({
            pb_date: r.pb_date,
            pb_weight: r.pb_weight,
            pb_time_min: r.pb_time_min,
            pb_time_sec: r.pb_time_sec,
            workout_id: r.workout_id,
            prescribed: r.prescribed,
            user_id: r.user_id,
        })
        .then((e) => {
            console.log(`Seeding record ${i}`)
        })
        .catch((e) => {
            console.log(e)
            process.exit(1);
        })
});