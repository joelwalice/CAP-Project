const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');

const JWT_SECRET = "jwtsupersecret";

const adminModel = require('./admin-data');  // Adjust the path as needed
const patientModel = require('./patient-data');  // Adjust the path as needed

mongoose.connect('mongodb+srv://joelwalice:Joel19leema!@cluster0.qwlhlpv.mongodb.net/?retryWrites=true&w=majority')

 const app = express(); 
 app.use(cors()); 
 app.use(express.json());

  app.get('/', (req, res) => {
    return res.json('Hello World');
  });

  app.post('/admin/login', async (req, res) => {
    const { email, password, role } = req.body;
    const user = await adminModel.findOne({ email });
    if (!user) {
        return res.status(401).send({ status: "User Not exists" });
    }
    if (!user.role.includes(role)) {
        return res.status(401).send({ status: "Role not authorized" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send({ status: "Invalid Credentials" });
    }
    const token = jwt.sign({ email: user.email, role: user.role}, JWT_SECRET);
    return res.status(201).send({ status: "Success", data: {
        token,
        name: user.name,
        role: user.role,
        email: user.email,
    }});
});

  app.post('/admin/register', async (req, res) => {
    const {name, email, password, role} = req.body;
    const epassw = await bcrypt.hash(password, 10);
    try{
        const user = await adminModel.findOne({email});
        if(user){
            return res.send({Status: "User already exists"});
        }

        const data = await adminModel.create({name, email, password:epassw, role})
        res.send({Status: "Success", data:data});
    }
    catch(err){
        res.send({Status: "Error"});
    }
  });
  
  app.get('/admin/diseaseType/:patientId', async (req, res) => {
    const { patientId } = req.params;
    try {
      const patientData = await patientModel.findById(patientId);
      if (patientData) {
        const diseaseType = patientData.BasicInfo.DiseaseType;
        return res.send({ Status: "Success", data: diseaseType });
      } else {
        return res.send({ Status: "error", data: "Patient not found" });
      }
    } catch (err) {
      console.error(err);
      return res.send({ Status: "error", data: "Error retrieving disease type" });
    }
  });

  app.get('/admin/user', async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, JWT_SECRET);
      const userData = await adminModel.findOne({ email: user.email });
      if (userData) {
        return res.send({ Status: "Success", data: userData });
      } else {
        return res.send({ Status: "error", data: "User not found" });
      }
    } catch (err) {
      console.log(err);
      return res.send({ Status: "error", data: "Invalid token" });
    }
  });

  app.all('*', (req, res) => {
    return handle(req, res);  // all other requests be handled by Next.js
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });