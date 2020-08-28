const seed = {
    workouts: [{
            "id": 1,
            "workout_name": "Back Squat",
            "workout_type": "weightlifting",
            "description": "The Back Squat is a lower-body exercise that strengthens the glutes, hamstrings and quads. It's often referred to as the king of all exercises due to its ability to build strength, power and size. ",
            "prescribed_male": null,
            "prescribed_female": null
        },
        {
            "id": 2,
            "workout_name": "Front Squat",
            "workout_type": "weightlifting",
            "description": "The Front Squat is a lower-body exercise that will strengthen your legs and hips, particularly your quads (thigh muscles) and glutes (butt muscles). Front Squats are similar to Back Squats, however the barbell is placed across the front side of your shoulders instead of your upper back.",
            "prescribed_male": null,
            "prescribed_female": null
        },
        {
            "id": 3,
            "workout_name": "Bench Press",
            "workout_type": "weightlifting",
            "description": "The bench press is an upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles.",
            "prescribed_male": null,
            "prescribed_female": null
        },
        {
            "id": 4,
            "workout_name": "Clean & Jerk",
            "workout_type": "weightlifting",
            "description": "The clean and jerk is a composite of two weightlifting movements, most often performed with a barbell: the clean and the jerk. During the clean, the lifter moves the barbell from the floor to a racked position across the deltoids, without resting fully on the clavicles. During the jerk the lifter raises the barbell to a stationary position above the head, finishing with straight arms and legs, and the feet in the same plane as the torso and barbell.",
            "prescribed_male": null,
            "prescribed_female": null
        },
        {
            "id": 5,
            "workout_name": "Snatch",
            "workout_type": "weightlifting",
            "description": "The objective of the snatch is to lift the barbell from the ground to overhead in one continuous motion. There are four main styles of snatch used: squat snatch (or full snatch), split snatch, power snatch, and muscle snatch. The squat snatch and split snatch are the most common styles used in competition while power snatch and muscle snatch are mostly used for training purposes.",
            "prescribed_male": null,
            "prescribed_female": null
        },
        {
            "id": 6,
            "workout_name": "Power Clean",
            "workout_type": "weightlifting",
            "description": "An exercise in which a person lifts a barbell from the floor to shoulder height in a single movement. A power clean is typically distinguished from a clean in that the weightlifter catches the bar in a quarter squat as opposed to a full squat.",
            "prescribed_male": null,
            "prescribed_female": null
        },
        {
            "id": 7,
            "workout_name": "Power Snatch",
            "workout_type": "weightlifting",
            "description": "A power snatch involves taking the bar from the ground position to an overhead position as efficiently as possible, with as much weight as possible. This movement is a staple in the Crossfit and Olympic weightlifting worlds.",
            "prescribed_male": null,
            "prescribed_female": null
        },
        {
            "id": 8,
            "workout_name": "Isabel",
            "workout_type": "benchmark",
            "description": "30 snatches for time",
            "prescribed_male": 135,
            "prescribed_female": 95
        },
        {
            "id": 9,
            "workout_name": "Grace",
            "workout_type": "benchmark",
            "description": "30 clean & jerks for time",
            "prescribed_male": 135,
            "prescribed_female": 95
        },
        {
            "id": 10,
            "workout_name": "Karen",
            "workout_type": "benchmark",
            "description": "150 wall balls",
            "prescribed_male": 20,
            "prescribed_female": 14
        }
    ],
    records: [{
            "id": 1,
            "pb_weight": 200,
            "pb_time": null,
            "pb_date": "2020-08-15",
            "user_id": 1,
            "workout_id": 1,
            "pb_time_min": null,
            "pb_time_sec": null,
            "prescribed": null,
            "workout_name": "Back Squat",
            "workout_type": "weightlifting"
        },
        {
            "id": 8,
            "pb_weight": 95,
            "pb_time": null,
            "pb_date": "2020-08-15",
            "user_id": 1,
            "workout_id": 8,
            "pb_time_min": 3,
            "pb_time_sec": 0,
            "prescribed": null,
            "workout_name": "Isabel",
            "workout_type": "benchmark"
        },
        {
            "id": 10,
            "pb_weight": 20,
            "pb_time": null,
            "pb_date": "2020-08-15",
            "user_id": 1,
            "workout_id": 10,
            "pb_time_min": 15,
            "pb_time_sec": 0,
            "prescribed": null,
            "workout_name": "Karen",
            "workout_type": "benchmark"
        },
        {
            "id": 2,
            "pb_weight": 185,
            "pb_time": null,
            "pb_date": "2020-08-17",
            "user_id": 1,
            "workout_id": 2,
            "pb_time_min": null,
            "pb_time_sec": null,
            "prescribed": null,
            "workout_name": "Front Squat",
            "workout_type": "weightlifting"
        },
        {
            "id": 4,
            "pb_weight": 265,
            "pb_time": null,
            "pb_date": "2019-11-17",
            "user_id": 1,
            "workout_id": 4,
            "pb_time_min": null,
            "pb_time_sec": null,
            "prescribed": null,
            "workout_name": "Clean & Jerk",
            "workout_type": "weightlifting"
        },
        {
            "id": 6,
            "pb_weight": 185,
            "pb_time": null,
            "pb_date": "2020-05-13",
            "user_id": 1,
            "workout_id": 6,
            "pb_time_min": null,
            "pb_time_sec": null,
            "prescribed": null,
            "workout_name": "Power Clean",
            "workout_type": "weightlifting"
        },
        {
            "id": 10,
            "pb_weight": 20,
            "pb_time": null,
            "pb_date": "2020-08-17",
            "user_id": 1,
            "workout_id": 10,
            "pb_time_min": 10,
            "pb_time_sec": 0,
            "prescribed": null,
            "workout_name": "Karen",
            "workout_type": "benchmark"
        },
        {
            "id": 8,
            "pb_weight": 95,
            "pb_time": null,
            "pb_date": "2020-08-17",
            "user_id": 1,
            "workout_id": 8,
            "pb_time_min": 2,
            "pb_time_sec": 0,
            "prescribed": null,
            "workout_name": "Isabel",
            "workout_type": "benchmark"
        },
        {
            "id": 9,
            "pb_weight": 95,
            "pb_time": null,
            "pb_date": "2020-08-17",
            "user_id": 1,
            "workout_id": 9,
            "pb_time_min": 5,
            "pb_time_sec": 0,
            "prescribed": null,
            "workout_name": "Grace",
            "workout_type": "benchmark"
        },
        {
            "id": 9,
            "pb_weight": 95,
            "pb_time": null,
            "pb_date": "2020-08-17",
            "user_id": 1,
            "workout_id": 9,
            "pb_time_min": 3,
            "pb_time_sec": 0,
            "prescribed": false,
            "workout_name": "Grace",
            "workout_type": "benchmark"
        },
        {
            "id": 10,
            "pb_weight": 135,
            "pb_time": null,
            "pb_date": "2020-08-17",
            "user_id": 1,
            "workout_id": 10,
            "pb_time_min": 3,
            "pb_time_sec": 0,
            "prescribed": true,
            "workout_name": "Karen",
            "workout_type": "benchmark"
        },
        {
            "id": 1,
            "pb_weight": 135,
            "pb_time": null,
            "pb_date": "2020-08-19",
            "user_id": 1,
            "workout_id": 1,
            "pb_time_min": null,
            "pb_time_sec": null,
            "prescribed": null,
            "workout_name": "Back Squat",
            "workout_type": "weightlifting"
        },
        {
            "id": 8,
            "pb_weight": 195,
            "pb_time": null,
            "pb_date": "2020-08-19",
            "user_id": 1,
            "workout_id": 8,
            "pb_time_min": 3,
            "pb_time_sec": 0,
            "prescribed": true,
            "workout_name": "Isabel",
            "workout_type": "benchmark"
        }
    ]

}

export default seed;