const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Transaction, Patient, DentistProfile, Appointment } = require('./models/userSchema');
const SECRET_KEY = 'secretkey'

const app = express();

// MongoDB connection
const dbURI = 'mongodb+srv://2109401:toothtalksdc@cluster0.khpbpme.mongodb.net/toothtalksdcDB?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
    useNewUrlParser: true, // Corrected option name
    useUnifiedTopology: true, // Corrected option name
})
    .then(() => {
        app.listen(3001, () => {
            console.log('Server is connected to port 3001 and connected to MongoDB');
        });
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB');
    });

// Middleware
app.use(bodyParser.json());
app.use(cors());

// USER REGISTRATION
//POST REGISTER
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new User({ firstname, lastname, email, password: hashedPass });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Error signing up' });
    }
});

//GET REGISTERED USERS
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
    }catch (error) {
        res.status(500).json({error: 'Unable to get users'})
    }
})

// POST LOGIN
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }); 

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });

        res.json({ message: 'Login successful', token }); 
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// ADD PATIENT with authentication
app.post('/patients', verifyToken, async (req, res) => {
    try {
      const { userId, name, age, dateOfBirth, phoneNumber, email, gender, address } = req.body;
  
      if (userId !== req.userId) {
        return res.status(403).json({ error: 'Forbidden - Invalid user ID' });
      }
  
      const newPatient = new Patient({ userId, name, age, dateOfBirth, phoneNumber, email, gender, address });
  
      await newPatient.save();
  
      res.status(201).json({ message: 'Patient added successfully' });
    } catch (error) {
      console.error('Error adding patient:', error);
      res.status(500).json({ error: 'Error adding patient' });
    }
  });
  
  // GET ALL PATIENTS
  app.get('/patients', verifyToken, async (req, res) => {
    try {
      const patients = await Patient.find({ userId: req.userId });
  
      res.status(200).json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ error: 'Error fetching patients' });
    }
  });
  
  // ... (other routes and logic for patient-related operations)
  
  app.get('/', (req, res) => {
    res.send('Welcome to the server!');
  });