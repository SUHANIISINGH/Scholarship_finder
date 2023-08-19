const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Haha123',
  database: 'scholarshiplogin'
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database: ', error);
    return;
  }
  console.log('Connected to the database');
});

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// Handle POST request for login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.sendStatus(500);
    } else if (results.length === 1) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  });
});

app.get('/scholarshipspage5.html', (req, res) => {
  res.sendFile(__dirname + '/public/scholarshipspage5.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
