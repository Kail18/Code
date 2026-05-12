# Part 1

## Question 1

<p The database is in 3rd normal form all the non key attributes depend onf the primary key. I also do not see any transitive dependencies>

## Question 2

### Original FD

#### Uer

- user_id -> first_name, last_name, email, date_joined, last_login

#### WorkoutPrograms

- program_id -> user_id, program_name, goal, start_date, end_date, created_by

#### Exercise

- exercise_id -> exercise_name, muscle_group, equipment, use_sets, use_reps, use_weight, use_time

#### Workout

- workout_id -> user_id, program_id, workout_date, duration, workout_name, date_completed

#### WorkoutExercises

- workout_exercise_id -> workout_id, exercise_id, sets_completed, reps_completed, weight_used, length_exercise, logged_at

### Anomaly Identification

- I will ask Professor Farlow on this one

### Decomposition Steps

- I dont see any transitive dependencies

### Final Relational Schema

- I will ask Professor Farlow on this one.
