const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

app.use(bodyParser.json());

const users = [{
    email: "abc@abc.ca",
    firstName: "ABC",
    id: "5abf6783"
  },
  {
    email: "xyz@xyz.ca",
    firstName: "XYZ",
    id: "5abf674563"
  }
];

// Existing GET API
app.get('/users', (req, res, next) => {
  res.status(200).json({
    message: "Users retrieved",
    success: true,
    users: users
  });
});

// New GET API to retrieve a single user by ID
app.get('/user/:id', (req, res, next) => {
  const id = req.params.id;
  const user = users.find(u => u.id === id);

  if (user) {
    res.status(200).json({
      success: true,
      user: user
    });
  } else {

    //error handling: user doesn't exist
    res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
});

// New POST API to add a new user
app.post('/add', (req, res, next) => {
    const user = req.body;
    
    //error handling: if both values of email and first name are missing
    if (!user.email && !user.firstName) {
        res.status(400).json({
          success: false,
          message: "Missing email and firstName in the request body"
        });
        return;
    }

    //error handling: if only email is missing missing
    if (!user.email) {
      res.status(400).json({
        success: false,
        message: "Missing email in the request body"
      });
      return;
    }
    
    //error handling: if only firstName is missing missing
    if (!user.firstName) {
      res.status(400).json({
        success: false,
        message: "Missing firstName in the request body"
      });
      return;
    }
    

  const id = generateUniqueId();
  user.id = id;

  users.push(user);

  //Adding new user successfuly 
  res.status(201).json({
    message: "User added",
    success: true
  });
});

// New PUT API to update an existing user
app.put('/update/:id', (req, res, next) => {
  const id = req.params.id;
  const updatedUser = req.body;

  if (!updatedUser.email && !updatedUser.firstName) {
    res.status(400).json({
      success: false,
      message: "Missing email and firstName in the request body"
    });
    return;
  }

  if (!updatedUser.email) {
    res.status(400).json({
      success: false,
      message: "Missing email in the request body"
    });
    return;
  }

  if (!updatedUser.firstName) {
    res.status(400).json({
      success: false,
      message: "Missing firstName in the request body"
    });
    return;
  }

  const user = users.find(u => u.id === id);

  if (user) {
    if (updatedUser.email) {
      user.email = updatedUser.email;
    }
    if (updatedUser.firstName) {
      user.firstName = updatedUser.firstName;
    }

    res.status(200).json({
      message: "User updated",
      success: true
    });
  } else {
    //error handling: user doesn't exist
    res.status(404).json({
      success: false,
      message: "User not found"
    });
  }
});

// Function to generate a unique ID for a new user
function generateUniqueId() {
  const id = uuidv4();
  return id;
}

module.exports = app;
