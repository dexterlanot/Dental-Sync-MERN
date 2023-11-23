const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');
const Patient = require('./models/patient')
const Appointment = require('./models/appointment');
const Transaction = require('./models/transaction');

const SECRET_KEY = 'secretkey'
const multer = require('multer');


const app = express();
const router = express.Router();
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

// Create a new patient
app.post('/patients', async (req, res) => {
  try {
      console.log('Received patient data:', req.body); // Log received data
      const newPatient = new Patient(req.body);
      await newPatient.save();
      console.log('Patient saved successfully:', newPatient); // Log successful save
      res.json(newPatient);
  } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).json({ error: error.message });
  }
});

  
  // Read all patients
  app.get('/patients', async (req, res) => {
    try {
      const patients = await Patient.find().sort({ createdAt: -1 });
      res.json(patients);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a patient by ID
  app.put('/patients/:id', async (req, res) => {
    try {
      const updatedPatient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedPatient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a patient by ID
  app.delete('/patients/:id', async (req, res) => {
    try {
      const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
      res.json(deletedPatient);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint to get the total number of patients
router.get('/patients/count', async (req, res) => {
  try {
      const count = await Patient.countDocuments();
      res.json({ count });
  } catch (error) {
      console.error('Error counting patients:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

//apointment
// Create a new appointment
app.post('/appointments', async (req, res) => {
  try {
    console.log('Received appointment data:', req.body); // Log received data
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    console.log('Appointment saved successfully:', newAppointment); // Log successful save
    res.json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: error.message });
  }
});

// Read all appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ date: 1, time: 1 }); // Sort by date and time
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an appointment by ID
app.put('/appointments/:id', async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an appointment by ID
app.delete('/appointments/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    res.json(deletedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Add these endpoints to your server code
router.get('/appointments/count', async (req, res) => {
  try {
    const { status } = req.query;

    if (status) {
      // Count appointments with the specified status
      const count = await Appointment.countDocuments({ status });
      res.json({ count });
    } else {
      // Count all appointments
      const count = await Appointment.countDocuments();
      console.log('Number of appointments (all statuses):', count);
      res.json({ count });
    }
  } catch (error) {
    console.error('Error counting appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new transaction
app.post('/transactions', async (req, res) => {
  try {
    console.log('Received transaction data:', req.body);
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();
    console.log('Transaction saved successfully:', newTransaction);
    res.json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: error.message });
  }
});

// Read all transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: 1 }); // Sort by date
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a transaction by ID
app.put('/transactions/:id', async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a transaction by ID
app.delete('/transactions/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    res.json(deletedTransaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this route to your backend
app.get('/api/userinfo', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.userId, { firstname: 1, lastname: 1 });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ firstname: user.firstname, lastname: user.lastname });
  } catch (error) {
    console.error('Error fetching user information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const transactionAmounts = [1000, 1500, 2000, 1200, 1800, 2500, 3000];

app.get('/transactions/amounts', (req, res) => {
  res.json(transactionAmounts);
});

// Mount the router on the '/api' path
app.use('/api', router);

module.exports = app;