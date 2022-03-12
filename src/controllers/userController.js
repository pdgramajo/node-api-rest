import bcrypt from "bcrypt";
import User from "../models/User.js";

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  console.log(req)
  const { firstName, lastName, phone, email, password } = req.body;
  try {
    const foundUser = await User.findOne({
      email: email,
      isBloqued: false,
      isEnabled: true,
    });

    if (foundUser) return res.sendStatus(409); //Conflict

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: await bcrypt.hash(password, 10),
      phone: phone,
    };
    const newUser = await User.create(data);

    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;
  try {
    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
    };
    const userEdited = await UserSchema.findByIdAndUpdate(req.params.id, data);

    res.json(userEdited);
  } catch (error) {
    console.log(error);
  }
};

export { getAllUser, getUser, createUser, updateUser };
