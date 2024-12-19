import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseCode:{
        type: String
    },
    semester:{
        type:Number,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],

});

const Course = mongoose.model('Course', courseSchema);

export default Course;
