const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [1, 'Name must be at least 1 character long'],
    maxlength: [40, 'Name cannot be more than 40 characters']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [1, 'Age must be at least 1'],
    max: [140, 'Age cannot be more than 140'],
    validate: {
      validator: function(value) {
        return value >= 18 || this.hasParentalConsent;
      },
      message: 'Sorry, we need a parental signature for patients under 18'
    }
  },
  symptoms: {
    type: String,
    required: [true, 'Symptoms are required'],
    minlength: [4, 'Symptoms must be at least 4 characters']
  },

}, { timestamps: true });

module.exports = mongoose.model('Patient', PatientSchema);
