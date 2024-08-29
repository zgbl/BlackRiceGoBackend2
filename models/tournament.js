// models/Tournament.js
import mongoose from 'mongoose';


const tournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  rounds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Round',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tournament = mongoose.models.Tournament || mongoose.model('Tournament', tournamentSchema);

export default Tournament;
