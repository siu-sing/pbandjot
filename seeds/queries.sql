with a as (
select
    w.id,
    pb_weight,
    pb_time,
    pb_date,
    user_id,
    workout_id,
    pb_time_min,
    pb_time_sec,
    prescribed,
    w.workout_name,
    w.workout_type
from
    records
    left join workouts w on records.workout_id = w.id
)
select json_agg(a) from a


