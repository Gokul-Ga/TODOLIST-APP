const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ictakjobportal:jp1234@cluster0.d2gurng.mongodb.net/TodoApp2?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
