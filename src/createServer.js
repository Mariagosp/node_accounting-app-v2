'use strict';

// const { v4: uuidv4 } = require('uuid');

let currentId = 0;
// import express from 'express';
// import cors from 'cors';

const express = require('express');
const data = require('./data');

function createServer() {
  const app = express();

  app.use(express.json());
  // app.use(cors());

  app.get('/users', (req, res) => {
    // res.statusCode = 200;
    // res.send = data.users;
    res.status(200).json(data.users);
  });

  app.post('/users', (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ message: 'Missing required parameter: name' });
    }

    const newUser = {
      id: currentId++,
      name,
    };

    data.users = [...data.users, newUser];

    res.status(201).json(newUser);
  });

  app.get(`/users/:id`, (req, res) => {
    const id = req.params.id;
    // const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: 'Missing required parameter: id' });
    }

    const user = data.users.find((us) => us.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = data.users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    data.users = data.users.filter((user) => user.id !== id);

    res.sendStatus(204);
  });

  app.patch('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: 'Missing required parameter' });
    }

    const user = data.users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;

    res.status(200).json(user);
  });

  return app;
}

module.exports = {
  createServer,
};
