const bcrypt = require("bcrypt");

const UserModel = require("../models/User");

class Auth {
  static async list(_, res) {
    try {
      const user = await UserModel.find({});

      return res.json({ user });
    } catch (error) {
      return res.json(error);
    }
  }
  static async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) throw new Error("User Not Found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Wrong password");

      return res.json({ user });
    } catch (error) {
      return res.json(error);
    }
  }
  static async signup(req, res) {
    try {
      const { name, username, password } = await req.body;

      const hashPassword = await bcrypt
        .hash(password, Number(process.env.SALTROUND))
        .then((hash) => {
          return hash;
        })
        .catch((err) => {
          throw new Error(err);
        });

      const newUser = new UserModel({
        name,
        username,
        password: hashPassword,
      });

      const savedUser = await newUser.save();

      return res.json(savedUser);
    } catch (error) {
      return res.json(error);
    }
  }
}

module.exports = Auth;
