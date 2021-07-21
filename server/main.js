import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/db/TaskCollection.js";
import "../imports/api/tasksMethods";
import "../imports/api/tasksPublications";

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });
const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";
Meteor.startup(() => {
  // If the Links collection is empty, add some data.
  const user = Accounts.findUserByUsername(SEED_USERNAME);
  if (TasksCollection.find().count() === 0) {
    ["FirstCollection", "SecondCollection", "Third", "Fourth"].forEach(
      (taskText) => insertTask(taskText, user)
    );
  }
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
