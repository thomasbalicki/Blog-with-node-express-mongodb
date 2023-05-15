# Blog-with-node-express-mongodb


This is a blog app built with Node.js and Express that allows users to create, read, update, and delete blog posts. The app uses MongoDB for data storage and the EJS templating engine for rendering views.

# Installation
Clone the repository to your local machine using git clone.
Install the necessary dependencies using npm install.
Start the server using node app.js.
Navigate to http://localhost:3000 in your web browser to view the app.

# Usage
The app has the following main routes:

/: This is the home page that displays all the blog posts in the database. Users can click on a post to view it in detail.

/compose: This is the page where users can create new blog posts. Users must provide a title and content for the post.

/posts/:postId: This is the page that displays a single blog post in detail. Users can edit or delete the post from this page.

/about: This is the about page that provides information about the app and its creator.

/contact: This is the contact page that allows users to send a message to the creator of the app.

# Dependencies
The app uses the following dependencies:

body-parser: This middleware is used to parse incoming request bodies in a middleware before the handlers.

ejs: This is the templating engine used for rendering views.

express: This is the web framework used for building the app.

lodash: This library provides utility functions for working with arrays, objects, and strings.

mongoose: This is the ODM used for interacting with MongoDB.