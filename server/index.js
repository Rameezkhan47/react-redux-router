const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const RegisteredUsers = require("./models/registeredUsers");
const ToDoList = require("./models/todoList");
const { LocalStorage } = require("node-localstorage");
localStorage = new LocalStorage("./scratch");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

async function passwordHash(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return { hash, salt };
  } catch (error) {
    return null;
  }
}



app.get("/signup", async (req, res) => {
  try {
    const user = await RegisteredUsers.find();

    return res.json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

// signup
app.post("/signup", async (req, res) => {
  const body = req.body;
  console.log("body is", body);
  const passwordRes = await passwordHash(body.password);
  body.salt = passwordRes.salt;
  body.password = passwordRes.hash;
  const isNewUser = await RegisteredUsers.isUniqueUsername(body.username);
  const newRegisteredUsers = new RegisteredUsers(body);
  if (!isNewUser) {
    return res.json({
      success: false,
      message: "username already in use, try logging in",
    });
  }
  await newRegisteredUsers.save();
});

// login
app.post("/login", async (req, res) => {
  const body = req.body;
  try {
    const fetchedUser = await RegisteredUsers.getUserByCredentials(
      body.username,
      body.password
    );
    if (fetchedUser) {
      return res.status(200).json({ data: fetchedUser, message: "success" });
    } else {
      return res.status(400).json({ data: null, message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "server error" });
  }

  if (!isNewUser) {
    return res.json({
      success: false,
      message: "username already in use, try logging in",
    });
  }
});

app.post("/todolist", async (req, res) => {
  try {
    const user = req.body.data.username;

    const userToDo = await ToDoList.find({ username: user });

    return res.json({
      success: true,
      data: userToDo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

app.post("/todo", async (req, res) => {
  const body = req.body;

  const fetchUser = await RegisteredUsers.getUserById(body.user._id);

  const todoUpdate = {
    username: fetchUser.username,
    content: body.todo,
  };
  console.log("todo is", todoUpdate);
  const newToDoList = new ToDoList(todoUpdate);
  await newToDoList.save();
  res.send(todoUpdate);
});

app.delete("/todolist", async (req, res) => {
  try {
    const user = req.body.data.username;

    const userToDo = await ToDoList.find({ username: user });
    const lastUserId = userToDo[userToDo.length - 1]._id;
    ToDoList.findOneAndRemove({ _id: lastUserId }, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      return console.log("all ok");
    });
    const updatedTodo = new ToDoList();
    const updatedTodoList = await ToDoList.find({ username: user });
    console.log("updated todo is", updatedTodoList);
    return res.json({
      success: true,
      data: updatedTodoList,
    });

  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "server error" });
  }
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
