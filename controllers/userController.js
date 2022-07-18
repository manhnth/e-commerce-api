const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions, createPayload, attachCookiesToResponse } = require('../utils');


const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users: users, count: users.length })
}

const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user })
}

const getSingleUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.userId }).select('-password');
  if (!user) {
    throw new CustomError.BadRequestError(`No user found with id: ${req.params.userId}`);
  }
  checkPermissions(req.user, user._id);

  res.status(StatusCodes.OK).json({ user });
}

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomError.BadRequestError('Please provide all values');
  }
  const user = await User.findOne({ _id: req.user.userId }, { name: 1, email: 1, _id: 0 });

  user.name = name;
  user.email = email;
  await user.save();
  const newPayload = createPayload(user);
  attachCookiesToResponse({ res, payload: newPayload });

  res.status(StatusCodes.OK).json({ user: user });
}

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomError.BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new CustomError.UnAuthenticatedError('Credentials Invalid');
  }
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Success! your password Updated' });
}


module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword
};