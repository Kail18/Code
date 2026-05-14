DROP DATABASE IF EXISTS WorkoutBuilder;
CREATE DATABASE WorkoutBuilder;
USE WorkoutBuilder;

CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(75) NOT NULL,
    last_name VARCHAR(75) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    date_joined DATE NOT NULL,
    last_login DATETIME
);

CREATE TABLE WorkoutPrograms (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    program_name VARCHAR(75) NOT NULL,
    goal VARCHAR(50),
    start_date DATE NOT NULL,
    end_date DATE,
    created_by VARCHAR(75) NOT NULL,

    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE
);

CREATE TABLE Exercise (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(75) NOT NULL,
    muscle_group VARCHAR(50) NOT NULL,
    equipment VARCHAR(50),
    tracking VARCHAR(75) NOT NULL,
    use_sets BOOLEAN NOT NULL DEFAULT FALSE,
    use_reps BOOLEAN NOT NULL DEFAULT FALSE,
    use_weight BOOLEAN NOT NULL DEFAULT FALSE,
    use_time BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE Workout (
    workout_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    program_id INT,
    workout_name VARCHAR(300) NOT NULL,
    workout_date DATE NOT NULL,
    duration TIME,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    date_completed DATETIME,

    FOREIGN KEY (user_id)
        REFERENCES User(user_id)
        ON DELETE CASCADE,

    FOREIGN KEY (program_id)
        REFERENCES WorkoutPrograms(program_id)
        ON DELETE SET NULL
);

CREATE TABLE WorkoutExercises (
    workout_exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    workout_id INT NOT NULL,
    exercise_id INT NOT NULL,
    sets_completed INT,
    reps_completed INT,
    weight_used INT,
    length_exercise TIME,
    logged_at DATE NOT NULL,

    total_volume_lifted INT GENERATED ALWAYS AS 
        (
            COALESCE(sets_completed, 0) *
            COALESCE(reps_completed, 0) *
            COALESCE(weight_used, 0)
        ) STORED,

    FOREIGN KEY (workout_id)
        REFERENCES Workout(workout_id)
        ON DELETE CASCADE,

    FOREIGN KEY (exercise_id)
        REFERENCES Exercise(exercise_id)
        ON DELETE CASCADE
);