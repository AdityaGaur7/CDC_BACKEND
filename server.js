const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const PORT  = process.env.PORT || 5000;

// Connect to MongoDB database
const URL = 'mongodb+srv://adkumar7112:ECFLZi6EPvP8aSI0@cluster0.nvhcrpa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const LOCAL_URL = 'mongodb://localhost:27017/certificates';
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(URL);


const CertificateSchema = new mongoose.Schema({
  certificateId: String,

});

const Certificate = mongoose.model('Certificate', CertificateSchema);


app.use(express.json());

app.get('/',async(req,res)=>{
  try{

    res.send('backend running successfully');
  }catch(e){
    res.send(e);
  }
})

app.post('/verify/add',async(req,res)=>{
  try{
    let certi = new Certificate(req.body);

    let result = await certi.save();
    // result  = result.toObject();
    res.send(result);
  } catch(e){
    res.send(e);
    console.warn('not possible');
  }    
})
// app.get('/verify/all',async(req,res)=>{
//   try{
//     let certificates = await Certificate.find();
//        certificates = JSON.parse(certificates);
   
//       res.send(certificates);
//       console.log(certificates)
   
    
    
//   }catch(e){
//     res.status(404).send("No data found");
//   }
  
// })

app.get('/verify/:id', async (req, res) => {
  const certificateId = req.params.id;

  try {
 
    const certificate = await Certificate.findOne({certificateId});
    
    if (certificate) {
    
      res.status(200).json({ success: true, certificate });
    } else {
     
      res.status(404).json({ success: false, message: 'Certificate not found' });
    }
  } catch (error) {
   
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
