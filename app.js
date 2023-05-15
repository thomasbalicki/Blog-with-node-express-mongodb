//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homeStartingContent = "A dedicated space where I share my experiences, insights, and solutions to various programming challenges, including LeetCode problems. This blog serves as a platform for programming enthusiasts to immerse themselves in the world of code and gain valuable knowledge. Through my carefully crafted posts, I aim to provide you with thought - provoking content, practical tips, and in-depth analysis of programming concepts. Whether you're a beginner seeking guidance or an experienced programmer looking for new perspectives, this blog is here to inspire and inform.";

const contactContent = "If you're interested in collaborating on a project, have any questions about my work, or simply want to say hi, I'd be delighted to hear from you! Feel free to reach out using the contact form below. I'm open to exploring new opportunities, sharing insights, and connecting with fellow enthusiasts in the programming community. Don't hesitate to drop me a message—I'm looking forward to connecting with you!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose
  .connect("mongodb://127.0.0.1:27017/blogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`DB Connection Success`))
  .catch((err) => {
    console.log(`DB Connection Failed`)
    console.log(err.message);
  });

const postSchema = {
  title: String,
  content: String
};

const contactSchema = {
  name: String,
  email: String,
  message: String
};


const Post = mongoose.model("Post", postSchema);
const Contact = mongoose.model("Contact", contactSchema);


app.get("/", function (req, res) {
  Post.find({})
    .then(function (posts) {
      res.render("home", {
        startingContent: homeStartingContent,
        posts: posts
      });
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });

});

app.post("/contact", function (req, res) {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  contact.save()
    .then(() => {
      res.render("success", { message: "Your message was sent successfully!" });
    })
    .catch((err) => {
      console.log(err);
      res.render("error", { message: "Sorry, something went wrong. Please try again later." });
    });

});


app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId })
    .then(function (post) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    })
    .catch(function (err) {
      console.log(err);
    });


});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started");
});