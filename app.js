const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


const mongoURI = "mongodb+srv://ictakjobportal:jp1234@cluster0.d2gurng.mongodb.net/TodDoApp2?retryWrites=true&w=majority"; 
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const path = require('path'); 
app.use(express.static(path.join(__dirname,'/build')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
})



const todoRoute = require('./routes/TodoRoute');
app.use('/api', todoRoute);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname,'/build/index.html'));
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
