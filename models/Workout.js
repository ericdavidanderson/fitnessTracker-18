const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
   
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter exercise type",
        },
        name: {
          type: String,
          trim: true,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
  }
);

const workout = mongoose.model("workout", WorkoutSchema);

module.exports = Workout;
