// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'StudentSchema'
const CourseSchema = new Schema({
    id: String,
    code: String,
    name: String,
    section: Number,
    semester: String,
    startingYear: { type: Number, min: 2015, max: 2022},
});

// Create the 'Student' model out of the 'StudentSchema'
module.exports = mongoose.model('Course', CourseSchema)