
const mongoose = require('mongoose');

const express = require('express');
const app = express()



mongoose.connect('mongodb://localhost:27017/playground2', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));



app.use(express.json());
app.use(express.urlencoded( { extended: true } ));


//Author Schema
const authorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    website: String
});

const Author = mongoose.model('Author', authorSchema);


//Course schema and model
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: authorSchema,
        required: true
    }
}));


//Create Course
async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}

async function courseUpdate(courseId){
   const course = await Course.findById(courseId);
    course.author.name = 'Mosh Hamedani';
    course.save();
    console.log(course)
}

//update directly in Database
 async function updateAuthor(courseId){
    const course = await Course.updateOne({ _id: courseId }, {
        $set: {
            'author.name': 'John Smith'
        }
    })
 }

//remove subDocument
async function removeAuthor(courseId){
    const course = await Course.update({ _id: courseId }, {
        $unset: {
            'author': ''
        }
    })
}



//get Course list
async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// Author is subDocument
createCourse('React Course', new Author({ name: 'Mosh' }));

//courseUpdate("5c83005d9bd438441ea8a4c1")
//updateAuthor("5c83005d9bd438441ea8a4c1")
//removeAuthor("5c83005d9bd438441ea8a4c1")

const port = process.env.PORT || 5757;
app.listen(port, () => console.log(`listen on port ${ port }...`));