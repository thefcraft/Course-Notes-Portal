import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseCode:{
        type: String,
        required: true
    },
    courseInstructor: {
        type: String
    },
    semester:{
        type:Number,
    },
    description: {
        type: String
    },
    branch: [{ // mutiple branch are allowed...
        type: String, // see utils -> user.mjs
        enum: ['AI', 'CB', 'CE', 'CH', 'CM', 'CS', 'CT', 'EC', 'EE', 'ES', 'GT', 'HS', 'MA', 'MC', 'ME', 'MM', 'MT', 'PC', 'PH', 'PR', 'ST', 'VL'],
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],

});

const Course = mongoose.model('Course', courseSchema);

export default Course;
