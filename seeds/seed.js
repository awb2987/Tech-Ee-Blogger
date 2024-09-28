const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' },
];

const postData = [
  {
    title: 'My First Post',
    content: 'This is the content of my first post ever.',
    user_id: 1,
  },
  {
    title: 'And then there were two Post',
    content: 'This is the content about the second post ever.',
    user_id: 2,
  },
];

const commentData = [
  {
    content: 'Well put!',
    user_id: 1,
    post_id: 1,
  },
  {
    content: 'Thanks for your insight!',
    user_id: 2,
    post_id: 1,
  },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true }); // Drop existing data and recreate tables from scratch
    console.log('Database synced!');

    await User.bulkCreate(userData);
    console.log('Users seeded!');

    await Post.bulkCreate(postData);
    console.log('Posts seeded!');

    await Comment.bulkCreate(commentData);
    console.log('Comments seeded!');

    process.exit(0); // Exit the process
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
