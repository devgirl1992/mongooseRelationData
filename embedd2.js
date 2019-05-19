
const mongoose = require('mongoose');

const express = require('express');
const app = express()



mongoose.connect('mongodb://localhost:27017/playground3', { useNewUrlParser: true })
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
    authors: [authorSchema]
}));


//Create Course
async function createCourse(name, authors) {
    const course = new Course({
        name,
        authors
    });

    const result = await course.save();
    console.log(result);
}


/*
async function courseUpdate(courseId){
    const course = await Course.findById(courseId);
    course.author.name = 'Mosh Hamedani';
    course.save();
    console.log(course)
}
*/


async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
    console.log(course);
}


async function removeAuthor(courseId, authorId){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
    console.log(course);
}
async function updateAuthor(courseId, authorId, authorname, authorbio, authorwebsite){
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.name = authorname;
    author.bio = authorbio;
    author.website = authorwebsite;
    course.save();
    console.log(course)
}


//get Course list
async function listCourses() {
    const courses = await Course.find();
    console.log(courses);
}

// Author is subDocument
/*createCourse('React Course', [
    new Author ({ name: 'Roman', bio:'RomanBio', website: 'RomanWebSite' }),
    new Author({ name: 'Ryan', bio: 'RyanBio', website: 'RyanWebSite' }),
    new Author({ name: 'Martina', bio: 'MartinaBio', website: 'MartinaWebSite' })
]);
*/

//addAuthor('5c83cbb811eb237c73ab3ace',  new Author({ name: 'Ashok', bio:'AshokBio', website: 'AshokWebSite' }))
//removeAuthor('5c83cbb811eb237c73ab3ace', "5c83ceebebab727dc71a55f7")
updateAuthor('5c83cbb811eb237c73ab3ace', "5c83cbb811eb237c73ab3acd", 'Tommy', 'TommyBio','TommyWebSite')


const port = process.env.PORT || 5757;
app.listen(port, () => console.log(`listen on port ${ port }...`));