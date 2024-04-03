const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/certificates');


const CertificateSchema = new mongoose.Schema({
  certificateId: String,

});

const Certificate = mongoose.model('Certificate', CertificateSchema);


app.use(express.json());

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
