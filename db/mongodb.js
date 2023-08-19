
const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://ictakjobportal:jp1234@cluster0.d2gurng.mongodb.net/TODOAPP?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to ModgoDB Atlas');
})
.catch((e)=>{
    console.log('Error Connecting to Atlas')
})