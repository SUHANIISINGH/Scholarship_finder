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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));


app.post('/googlesignin', (req, res) => {
    const { username, password } = req.body;
    const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
    
  });

  app.get('/scholarshipspage5.html', (req, res) => {
    res.sendFile(__dirname + '/public/detailsform.html');
  });
  

  app.post('/detailsform', (req, res) => {
    const {preference} = req.body;
    const query = `UPDATE users SET preference='${preference}'order by Id DESC limit 1`;
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing query: ', error);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
    
  });

  app.get('/scholarshipspage5.html', (req, res) => {
    res.sendFile(__dirname + '/public/detailsform.html');
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });