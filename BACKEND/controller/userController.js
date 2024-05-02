const User = require("../models/Kavishka/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    const name = user.name;

    res.status(200).json({ email, token, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

};


const signupUser = async (req, res) => {
  const {name,email,address,phoneNumber,password } = req.body;

  try {
    const user = await User.signup(name,email,address,phoneNumber,password);

    const token = createToken(user._id);

    res.status(200).json({ email,user});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
