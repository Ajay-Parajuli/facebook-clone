import mongoose from "mongoose";
import bcrypt from "bcrypt";

// ========== models ========== //
const userSchema = new mongoose.Schema(
  {
    image: String,
    mail: {
      type: String,
      required: true, // Ensure user emails are required
      unique: true // Ensure user emails are unique
    },
    firstname: String,
    lastname: String,
    title: String,
    birthdate: Date,
    bio: String,
    educations: [String],
    workat: String,
    placeofbirth: String,
    gender: String,
    password: {
      type: String,
      required: true, // Ensure user passwords are required
      select: false // Automatically exclude from query results
    }
  },
  { timestamps: true }
);
const postSchema = new mongoose.Schema(
  {
    caption: String,
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    likes: Number,
    tags: [String]
  },
  { timestamps: true }
);

const storySchema = new mongoose.Schema(
  {
    caption: String,
    image: String,
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true
    },
    likes: Number,
  },
  { timestamps: true }
);

// pre save password hook
userSchema.pre("save", async function (next) {
  const user = this; // this refers to the user document

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next(); // continue
  }

  const salt = await bcrypt.genSalt(10); // generate a salt
  user.password = await bcrypt.hash(user.password, salt); // hash the password
  next(); // continue
});

export const models = [
  { name: "User", schema: userSchema, collection: "users" },
  { name: "Post", schema: postSchema, collection: "posts" },
  { name: "Story", schema: storySchema, collection: "stories" }
];

// ========== add users ========== //
export async function initData() {
  // check if data exist
  const userCount = await mongoose.models.User.countDocuments();
  const postCount = await mongoose.models.Post.countDocuments();

  if (userCount < 2 || postCount === 0)  {
    await insertData();
  }
  
}

async function insertData() {
  const User = mongoose.models.User;
  const Post = mongoose.models.Post;

  console.log("Dropping collections...");
  await User.collection.drop();
  await Post.collection.drop();
  
const rasmus = await User.create({
  _id: new mongoose.Types.ObjectId("65cde4cb0d09cb615a23db17"),
  image: "https://share.cederdorff.dk/images/race.webp",
  mail: "race@eaaa.dk",
  firstname: "Rasmus",
  lastname: "Cederdorff",
  bio: "I am a lecturer at EAAA and I love to teach and inspire students.",
  title: "Senior Lecturer",
  educations: ["Multimedia Design", "Web Development", "Digital Concept Development"],
  password: "123456",
  workat: "EAAA",
  placeofbirth: "Aarhus",
  gender: "Male",

});


const anne = await User.create({
  image:
    "https://www.baaa.dk/media/5buh1xeo/anne-kirketerp.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921531600000&format=webp",
  mail: "anki@eaaa.dk",
  firstname: "Anne",
  lastname: "Kirketerp",
  title: "Head of Department",
  educations: ["Multimedia Design", "Web Development", "Digital Concept Development"],
  password: "123456",
  workat: "EAAA",
  placeofbirth: "copehagen",
  bio: "I am the head of department at EAAA and I love to teach and inspire students.",
  gender: "Female"
});

const line = await User.create({
  image: "https://www.eaaa.dk/media/14qpfeq4/line-skjodt.jpg?width=800&height=450&rnd=133178433559770000",
  mail: "lskj@eaaa.dk",
  firstname: "Line",
  lastname: "Skjødt",
  title: "Senior Lecturer & Internship Coordinator",
  educations: ["Multimedia Design"],
  password: "123456",
  workat: "EAAA",
  placeofbirth: "Oddense",
  bio: "I am a senior lecturer at EAAA and I love to teach and inspire students",
  gender: "Female"

});

const dan = await User.create({
  image:
    "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp",
  mail: "dob@eaaa.dk",
  firstName: "Dan Okkels",
  lastName: "Brendstrup",
  title: "Lecturer",
  educations: ["Web Development"],
  password: "123456",
  workat: "EAAA",
  placeofbirth: "London",
  bio: "I am a lecturer at EAAA and I love to teach and inspire students",
  gender: "Male"
});

// Insert posts
await Post.insertMany([
  {
    caption: "Exploring the city streets of Aarhus",
    image:
      "https://images.unsplash.com/photo-1559070169-a3077159ee16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    likes: 33,
    user: rasmus._id,
    tags: ["city", "Aarhus", "exploration"]
  },
  {
    caption: "Delicious food at the restaurant",
    image:
      "https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    likes: 21,
    user: line._id,
    tags: ["food", "restaurant", "delicious"]
  },
  {
    caption: "Exploring the city center of Aarhus",
    image:
      "https://images.unsplash.com/photo-1612624629424-ddde915d3dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    likes: 97,
    user: rasmus._id,
    tags: ["city", "Aarhus", "exploration", "cityhall"]
  },
  {
    caption: "A cozy morning with coffee",
    image:
      "https://images.unsplash.com/photo-1545319261-f3760f9dd64d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    likes: 785,
    user: dan._id,
    tags: ["morning", "coffee", "cozy", "food"]
  },
  {
    caption: "Serenity of the forest",
    image:
      "https://images.unsplash.com/photo-1661505216710-32316e7b5bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    likes: 799,
    user: rasmus._id,
    tags: ["forest", "nature", "serenity"]
  },
  {
    caption: "Rainbow reflections of the city of Aarhus",
    image:
      "https://images.unsplash.com/photo-1558443336-dbb3de50b8b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    likes: 589,
    user: anne._id,
    tags: ["city", "Aarhus", "rainbow", "AROS"]
  },
  {
    caption: "The city streets of Aarhus ✨",
    image:
      "https://images.unsplash.com/photo-1596150368199-1dddc9fc34cc?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 201,
    user: rasmus._id,
    tags: ["city", "Aarhus", "streets"]
  }
]);
}
