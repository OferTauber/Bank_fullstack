const express = require('express');
const route = express.Router();
const utils = require('./utils');
const path = require('path');

//! Add user
{
  // Can add user (person) to the bank and imidiatly open a new accaount
  // User has the following:
  // passport id (Uniqe, to be provided), name, cash(default 0), credit(default 0)
  //? cases:
  //?   user already exists
  //?   invalid name
  //?   invalid credit (less then 0)
}
route.post('/new_user', (req, res) => {
  const { id, name, cash, credit } = req.body;
  try {
    const returnVal = utils.addUser(id, name, cash, credit);
    res.status(200).send(returnVal);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Open account
{
  // Create new accunt to an exiting user
  // need: user id, , cash(default 0), credit(default 0)
  //? cases:
  //?   user not exist
  //?   invalid credit (less then 0)
}
route.put('/new_account', (req, res) => {
  const { cash, credit } = req.query;
  try {
    const returnVal = utils.openNewAccaunt(req.body.user, cash * 1, credit * 1);
    res.status(200).send(returnVal);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Depositing
{
  // Can deposit cash to an account.
  // need: account id, amount of cash
  //? cases:
  //?   account not exist
  //?   invalid amount of cash (less then 0)
}
route.put('/deposit/', (req, res) => {
  try {
    const { accountId } = req.body;
    const { amount } = req.query;
    const accaount = utils.deposit(accountId, amount * 1);
    res.status(200).send(accaount);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Update credit
{
  // Can update an accunt credit (only positive numbers)
  // need: account id, credit
  //? cases:
  //?   account not exist
  //?   invalid credit (less then 0)
  //?   invalid credit (less then the current balance)
}
route.put('/update_credit/', (req, res) => {
  try {
    const { accountId, credit } = req.body;
    const accaount = utils.updateCredit(accountId, credit * 1);
    res.status(200).send(accaount);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Withdraw money
{
  // Can withdraw money from an accunt
  // need: account id, amount to withdraw
  //? cases:
  //?   account not exist
  //?   out of credit
  //?   invalid withdraw amount (less then 0)
}
route.put('/withdraw/', (req, res) => {
  try {
    const { accountId, amount } = req.body;
    // const { amount } = req.query;
    console.log(req.query);
    console.log(amount);
    console.log(typeof amount);
    const accaount = utils.withdraw(accountId, amount * 1);
    res.status(200).send(accaount);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Transfer
{
  // Can transfer money from one account to another with credit(can
  // transfer money until the cash and credit run out)
  // need: payer account id, payee account id, amount to transfer
  //? cases:
  //?   payer account not exist
  //?   payee account not exist
  //?   payer is out of credit
  //?   invalid transfer amount (less then 0)
}
route.put('/transfer/', (req, res) => {
  try {
    const { payer, payee, amount } = req.body;

    const retanVal = utils.transfer(payer, payee, amount * 1);
    res.status(200).send(retanVal);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Show details of account
{
  // Can fetch all details of a particular account
  // need: account id
  //? cases:
  //?   account not exist
}
route.put('/accaount', (req, res) => {
  const { accaountId } = req.body;
  try {
    const accaount = utils.getAccaunt(accaountId);
    res.status(200).send(accaount);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Show details of user
{
  // Can fetch all details of a particular user
  // need: user id
  //? cases:
  //?   user not exist
}
route.put('/user', (req, res) => {
  try {
    const user = utils.getUser(req.body.user);
    res.status(200).send(user);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

//! Show details of all users
// Can fetch all details of all the users
route.get('/all_users', (req, res) => {
  void req;
  try {
    const users = utils.getAllUsers();
    res.status(200).send(users);
  } catch (e) {
    console.warn(e);
    res.status(400).send(e);
  }
});

route.get('/*', (req, res) => {
  void req;

  console.log('1: ', path.join(__dirname + '../../client/build/index.html'));
  console.log('2: ', path.join(__dirname + '/../../client/build/index.html'));
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = route;
