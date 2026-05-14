USE WorkoutBuilder;

INSERT INTO User
(user_id, first_name, last_name, email, date_joined, last_login)
VALUES
('U001', 'Kail', 'McGuire', 'kail@example.com', '2026-05-01', NOW());

INSERT INTO WorkoutPrograms
(program_id, user_id, program_name, goal, start_date, end_date, created_by)
VALUES
('P001', 'U001', 'Strength Builder', 'Build strength', '2026-05-01', '2026-07-01', 'Kail');

INSERT INTO Exercise
(exercise_id, exercise_name, muscle_group, equipment, tracking, use_sets, use_reps, use_weight, use_time)
VALUES
('E001', 'Bench Press', 'Chest', 'Barbell', 'Sets, reps, weight', TRUE, TRUE, TRUE, FALSE);

INSERT INTO Workout
(workout_id, user_id, program_id, workout_date, duration, workout_name, completed, date_completed)
VALUES
('W001', 'U001', 'P001', '2026-05-10', '01:05:00', 'Push Day', TRUE, '2026-05-10 09:05:00'),
('W002', 'U001', 'P001', '2026-05-12', '00:55:00', 'Pull Day', FALSE, NULL);

INSERT INTO WorkoutExercises
(workout_exercise_id, workout_id, exercise_id, sets_completed, reps_completed, weight_used, length_exercise, logged_at)
VALUES
('WE001', 'W001', 'E001', 4, 8, 185, '00:20:00', '2026-05-10');