const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  BasicInfo: {
    Counselor: String,
    SessionNumber: Number,
    DiseaseType: String,
    DateTime: Date,
    PatientName: String,
  },
  PatientBasics: {
    Name: String,
    Height: String,
    Weight: String,
    Gender: String,
  },
  Responses: [
    {
      QuestionNumber: Number,
      Question: String,
      Response: String,
      Tone: String,
      EnergyLevel: String,
      Trustability: String,
      ResponseTime: String,
      ToneValue: String,
      ToneScore: Number,
      EnergyLevelValue: String,
      EnergyLevelScore: Number,
      ResponseTimeValue: String,
      ResponseTimeScore: Number,
      TrustabilityValue: String,
      TrustabilityScore: Number,
    }
  ],
  CounselorSummary: {
    Notes: String,
    Recommendations: [String],
  }
});

const Patient = mongoose.model('patient', patientSchema);

module.exports = Patient;
