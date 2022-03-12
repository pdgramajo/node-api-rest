import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const cookiesOptions = {
  httpOnly: true,
  sameSite: "None",
  secure: true, // talvez esto no funcione en postman
  maxAge: 24 * 60 * 60 * 1000,
};

const generateToken = (user) => {
  const roles = Object.values(user.roles);
  // create JWTs
  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: user.email,
        roles: roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30000s" }
  );
  const refreshToken = jwt.sign(
    { email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  return {
    accessToken,
    refreshToken,
  };
};

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({
    email: email,
    isBloqued: false,
    isEnabled: true,
  });

  if (!foundUser) return res.sendStatus(401); //Unauthorized

  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const { accessToken, refreshToken } = generateToken(foundUser);

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie("jwt", refreshToken, cookiesOptions);
    res.json({ accessToken });
  } else {
    res.sendStatus(401); //Unauthorized
  }
};

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  //TODO: Is refreshToken in db?
  const foundUser = await User.findOne({
    refreshToken: refreshToken,
    isBloqued: false,
    isEnabled: true,
  });

  if (!foundUser) {
    res.clearCookie("jwt", cookiesOptions);
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  await foundUser.save();

  res.clearCookie("jwt", cookiesOptions);
  res.sendStatus(204);
};

export { handleLogin, handleLogout };
