import User from "../models/User";

const getAll = async () => {
  try {
    const users = await User.getAllActiveUsers();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const getById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const create = async ({ firstName, lastName, phone, email, password }) => {
  try {
    const foundUser = await User.emailExists(email);
    if (foundUser) throw new Error(409); //Conflict

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
    };
    const newUser = await User.create(data);

    res.json(newUser);
  } catch (error) {
    console.log(error);
  }
};

const update = async () => {};

const remove = async () => {};

const disable = async () => {};
