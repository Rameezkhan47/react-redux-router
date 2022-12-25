const mongoose = require("mongoose");

const loggedinUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// loggedinUserSchema.statics.isUniqueUsername = async function (username) {
//   try {
//     const user = await this.findOne({ username });
//     if (user) {
//       return false;
//     }
//     return true;
//   } catch (error) {
//     console.log("loggedin user already exists");
//     console.log(error.message);
//     return false;
//   }
// };

const LoggedinUser = mongoose.model(
  "LoggedinUser",
  loggedinUserSchema
);
module.exports = LoggedinUser;
