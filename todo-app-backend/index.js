const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = require('./db');
const db = mysql.createConnection(dbConfig.connection);

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

// Get all tasks
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const newTask = { title: req.body.title };
  const sql = 'INSERT INTO tasks SET ?';
  db.query(sql, newTask, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const sql = 'UPDATE tasks SET title = ? WHERE id = ?';
  db.query(sql, [req.body.title, req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
