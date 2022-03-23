// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSchema = require('./Course')

// Define a new 'StudentSchema'
const StudentSchema = new Schema({
    id: String,
    password: String,
    firstName: String,
    lastName: String,
    address: String,
    number: String,
    email: String,
    program: String,
    startingYear: { type: Number, min: 2015, max: 2022},
    
	
});

// Create the 'Student' model out of the 'StudentSchema'
module.exports = mongoose.model('Student', StudentSchema);