const express = require("express");
const todoModel = require("./schema");
const db = require("./db");

const app = express();
app.use(express.json());

// getting all of the todo list items from the database:

app.get("/todos", (req, res) => {
  todoModel
    .find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//save the new todo item and send back a response of the newly saved item:

app.post("/create/todo", (req, res) => {
  const { task, description, deadline, isCompleted, priority } = req.body;
  const todo = new todoModel({
    task,
    description,
    deadline,
    isCompleted,
    priority,
  });

  todo
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

// getting all the completed todos:

app.get("/todos/complete", (req, res) => {
  todoModel
    .find({ isCompleted: true })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

//updating the todo list item:

app.put("/update/todo", (req, res) => {
  const { task, newTask } = req.body;
  todoModel
    .findOneAndUpdate({ task: task }, { task: newTask })
    .then((result) => {
      res.json("task updated");
    })
    .catch((err) => {
      res.json(err);
    });
});

//deleting the todo list item:

app.delete("/delete/todo", (req, res) => {
  const { task } = req.body;
  todoModel
    .findOneAndRemove({ task: task })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
