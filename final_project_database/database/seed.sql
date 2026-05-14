USE WorkoutBuilder;

-- =========================
-- USERS
-- =========================
INSERT INTO User
(
    first_name,
    last_name,
    email,
    date_joined,
    last_login
)
VALUES
(
    'Kail',
    'McGuire',
    'kail@example.com',
    '2026-05-01',
    NOW()
);

-- =========================
-- WORKOUT PROGRAMS
-- =========================
INSERT INTO WorkoutPrograms
(
    user_id,
    program_name,
    goal,
    start_date,
    end_date,
    created_by
)
VALUES
(
    1,
    'Strength Builder',
    'Build strength',
    '2026-05-01',
    '2026-07-01',
    'Kail'
);

-- =========================
-- EXERCISES
-- =========================
INSERT INTO Exercise
(
    exercise_name,
    muscle_group,
    equipment,
    tracking,
    use_sets,
    use_reps,
    use_weight,
    use_time
)
VALUES
(
    'Bench Press',
    'Chest',
    'Barbell',
    'Sets, reps, weight',
    TRUE,
    TRUE,
    TRUE,
    FALSE
);

-- =========================
-- WORKOUTS
-- =========================
INSERT INTO Workout
(
    user_id,
    program_id,
    workout_date,
    duration,
    workout_name,
    completed,
    date_completed
)
VALUES
(
    1,
    1,
    '2026-05-10',
    '01:05:00',
    'Push Day',
    TRUE,
    '2026-05-10 09:05:00'
),
(
    1,
    1,
    '2026-05-12',
    '00:55:00',
    'Pull Day',
    FALSE,
    NULL
);

-- =========================
-- WORKOUT EXERCISES
-- =========================
INSERT INTO WorkoutExercises
(
    workout_id,
    exercise_id,
    sets_completed,
    reps_completed,
    weight_used,
    length_exercise,
    logged_at
)
VALUES
(
    1,
    1,
    4,
    8,
    185,
    '00:20:00',
    '2026-05-10'
);