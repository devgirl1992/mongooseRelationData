const mongoose = require('mongoose');

const express = require('express');
const app = express()



mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));



app.use(express.json());
app.use(express.urlencoded( { extended: true } ));


//Author schema and Model together
const Author = mongoose.model('Author', new mongoose.Schema({
    name: String,
    bio: String,
    website: String
}));


//Course Schema and Model together
const Course = mongoose.model('Course', new mongoose.Schema({
    name: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Author
    }
}));


//Create Author
async function createAuthor(name, bio, website) {
    const author = new Author({
        name,
        bio,
        website
    });

    const result = await author.save();
    console.log(result);
}


//Create Course
async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    const result = await course.save();
    console.log(result);
}


//get List of Course
async function listCourses() {
    const courses = await Course
        .find()
        .select('name author.name')
        .populate('author', '-_id -bio -website')
    //.populate('category', 'name34c wf')
    console.log(courses);
}




//createAuthor('Ryan', 'Ryan bio', 'Ryan Website');

// createCourse('JavaScript Course', "5c82e2f1d63df73b4ba53c61")

 listCourses();



const port = process.env.PORT || 5757;
app.listen(port, () => console.log(`listen on port ${ port }...`));