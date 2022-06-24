const express = require('express');
const route = express.Router();
const User = require('../mongodb/models/user_model');
const bcryptjs = require('bcryptjs');
const Account = require('../mongodb/models/account_model');
// const { Router } = require('express');

//? body: password, name, email
route.post('/new_user', async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await bcryptjs.hash(user.password, 8);

    const accaount = new Account({ owner: user._id });
    user.accouts.push(accaount._id);

    await user.save();
    await accaount.save();

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

//? headers: email, password
route.get('/login', async (req, res) => {
  console.log('Login!');
  try {
    const { email, password } = req.headers;
    const user = await User.findOne({ email });
    if (!user) throw new Error('Login faied');

    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('Login faied');

    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? headers: password, email
//? body: cash, credit
route.post('/new_accaount', async (req, res) => {
  try {
    const { email, password } = req.headers;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send();

    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('No access');

    const accaount = new Account({ ...req.body, owner: user._id });
    user.accaounts.push(accaount._id);

    await accaount.save();
    await user.save();

    res.send(accaount);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? params: user_id
//? headers: password
route.get('/all_acconts/:_id', async (req, res) => {
  const { _id } = req.params;
  try {
    const { password } = req.headers;
    const user = await User.findById({ _id });
    if (!user) return res.status(404).send();

    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('No access');

    const accaounts = await Account.find({ owner: user._id });

    res.send(accaounts);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? headers: password
//? params: account_id
route.get('/accont/:account_id', async (req, res) => {
  try {
    const { account_id } = req.params;
    const accaount = await Account.findById({ _id: account_id });
    if (!accaount) return res.status(404).send();

    const { password } = req.headers;
    const user = await User.findById({ _id: accaount.owner });
    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('No access');

    res.send(accaount);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? headers: password
//? quety: account_id, amount
route.patch('/withdraw', async (req, res) => {
  try {
    const { account_id, amount } = req.query;
    const { password } = req.headers;

    const accaount = await Account.findById({ _id: account_id });
    if (!accaount) return res.status(404).send();

    const user = await User.findById({ _id: accaount.owner });
    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('No access');

    accaount.cash = accaount.cash * 1 - amount * 1;
    if (accaount.cash + accaount.credit < 0)
      throw new Error('Insufishent credit');

    await accaount.save();
    res.send(accaount);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? quety: account_id, amount
route.patch('/deposit', async (req, res) => {
  try {
    const { account_id, amount } = req.query;

    const accaount = await Account.findById({ _id: account_id });
    if (!accaount) return res.status(404).send();

    accaount.cash = accaount.cash * 1 + amount * 1;

    await accaount.save();
    res.send(accaount);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? headers: password
//? params: account_id, credit
route.patch('/update_credit', async (req, res) => {
  try {
    const { account_id } = req.query;
    const credit = req.query.credit * 1;
    const { password } = req.headers;

    if (!credit || credit < 0) throw new Error('Invalid credit');

    const accaount = await Account.findById(account_id);
    if (!accaount) return res.status(404).send();

    const user = await User.findById({ _id: accaount.owner });
    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('No access');

    accaount.credit = credit * 1;
    if (accaount.cash * 1 + accaount.credit < 0)
      throw new Error('Insufishent cash');

    await accaount.save();
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? headers: password
//? quety: account_id_from,account_id_to , amount
route.patch('/transfer', async (req, res) => {
  try {
    const { account_id_from, account_id_to, amount } = req.query;
    const { password } = req.headers;

    const accaountFrom = await Account.findById({ _id: account_id_from });
    const accaountTo = await Account.findById({ _id: account_id_to });
    if (!accaountFrom || !accaountTo) return res.status(404).send();

    const user = await User.findById({ _id: accaountFrom.owner });
    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('No access');

    accaountFrom.cash = accaountFrom.cash * 1 - amount * 1;
    if (accaountFrom.cash + accaountFrom.credit < 0)
      throw new Error('Insufishent credit');

    accaountTo.cash = accaountTo.cash * 1 + amount * 1;

    await accaountFrom.save();
    await accaountTo.save();
    res.send(accaountFrom);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//? headers: password
route.delete('/delete_accaount/:account_id', async (req, res) => {
  try {
    const { account_id } = req.params;
    const { password } = req.headers;

    const accaount = await Account.findById(account_id);
    if (!accaount) return res.status(404).send();

    const user = await User.findById(accaount.owner);

    const passwordIsCorect = await bcryptjs.compare(password, user.password);
    if (!passwordIsCorect) throw new Error('No access');

    await Account.deleteOne({ _id: account_id });
    user.accaounts = user.accaounts.filter(
      (user_accaount) => user_accaount._id !== account_id
    );

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = route;
