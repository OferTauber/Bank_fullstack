const fs = require('fs');
const PATH = 'server/data/';
const uniqid = require('uniqid');
const bcryptjs = require('bcryptjs');

//* Exported utils

const getUser = (userId) => {
  const usersList = getAllUsersFromJSON();
  const user = usersList.find((userFromList) => userFromList.id === userId);

  if (!user) return 'User not exist';

  const accaountsList = getAllAccauntsFromJSON();
  const userCopy = { ...user }; // Don't wan to mutate the original user
  userCopy.accunts = accaountsList.filter((account) =>
    user.accunts.includes(account.id)
  );

  return userCopy;
};

const dataIsValid = (data) => {
  return !(typeof data === 'string');
};

const getAllUsers = () => {
  const rawUsersList = getAllUsersFromJSON();
  return rawUsersList.map((user) => getUser(user.id));
};

const getAccaunt = (accountId) => {
  const accaountsList = getAllAccauntsFromJSON();
  const accaount = accaountsList.find(
    (accaountFromList) => accaountFromList.id === accountId
  );

  return accaount || `No account found with ID ${accountId}`;
};

const openNewAccaunt = (userId, cash, credit) => {
  const usersList = getAllUsersFromJSON();
  const userIndex = usersList.findIndex(
    (userFromArray) => userFromArray.id === userId
  );
  if (-1 === userIndex) return `User ID ${userId} not exist`;

  const newAccaunt = createAndSaveNewAccount(cash, credit);

  if (!dataIsValid(newAccaunt)) return newAccaunt;

  usersList[userIndex].accunts.push(newAccaunt.id);
  saveUsers(usersList);
  return newAccaunt;
};

const deposit = (accaountId, cashToDeposit) => {
  if (typeof cashToDeposit !== 'number' || cashToDeposit < 0)
    return 'Invalid cash value';

  const accaountsList = getAllAccauntsFromJSON();
  const accountIndex = accaountsList.findIndex(
    (accaountFromList) => accaountFromList.id === accaountId
  );

  if (-1 === accountIndex) return `No account found with ID ${accaountId}`;

  accaountsList[accountIndex].cash += cashToDeposit;
  if (!accaountsList[accountIndex].cash) accaountsList[accountIndex].cash = 0;

  saveAccaunts(accaountsList);
  return accaountsList[accountIndex];
};

const withdraw = (accaountId, cashToWithdraw) => {
  if (typeof cashToWithdraw !== 'number' || cashToWithdraw < 0)
    return 'Invalid cash value';

  const accaountsList = getAllAccauntsFromJSON();
  const accountIndex = accaountsList.findIndex(
    (accaountFromList) => accaountFromList.id === accaountId
  );

  if (-1 === accountIndex) return `No account found with ID ${accaountId}`;

  const accaount = accaountsList[accountIndex];
  accaount.cash -= cashToWithdraw;
  if (accaount.cash + accaount.credit < 0)
    return `Failed to withdraw money - exceeded the credit limit`;

  saveAccaunts(accaountsList);
  return accaount;
};

const transfer = (payerAccountId, payeeAccountId, amount) => {
  if (payerAccountId === payeeAccountId) return 'Payer and payee are identical';

  const returnValWithdraw = withdraw(payerAccountId, amount);
  if (!dataIsValid(returnValWithdraw)) return returnValWithdraw;

  const returnValDeposit = deposit(payeeAccountId, amount);
  if (!dataIsValid(returnValDeposit)) {
    deposit(payerAccountId, amount);
  }
  return returnValDeposit;
};

const updateCredit = (accaountId, newCredit) => {
  console.log(accaountId);
  if (!newCredit || typeof newCredit !== 'number' || newCredit < 0)
    return `Invalid credit ${newCredit}`;

  const accaountsList = getAllAccauntsFromJSON();
  const accaount = accaountsList.find(
    (accaountFromList) => accaountFromList.id === accaountId
  );
  if (!accaount) return `No accaount found with ID ${accaountId}`;

  accaount.credit = newCredit;
  if (accaount.cash + accaount.credit < 0)
    return 'The new credit line is smaller than the existing debt in the account - you must first deposit money or choose a larger line.';

  saveAccaunts(accaountsList);
  return accaount;
};

const addUser = (id, name, cash, credit) => {
  const usersList = getAllUsersFromJSON();
  if (usersList.find((user) => user.id === id))
    return 'A user with such an ID already exists';
  const newUser = {
    id,
    name,
    accunts: [],
  };

  usersList.push(newUser);
  saveUsers(usersList);

  const retanVal = openNewAccaunt(id, cash, credit);
  return dataIsValid(retanVal) ? newUser : retanVal;
};

const utils = {
  getUser,
  getAllUsers,
  dataIsValid,
  getAccaunt,
  openNewAccaunt,
  deposit,
  withdraw,
  transfer,
  updateCredit,
  addUser,
};

module.exports = utils;

//* "static" - helper functions,

function pathToFile(fileName) {
  return PATH + fileName + '.json';
}

function getAllUsersFromJSON() {
  return JSON.parse(fs.readFileSync(pathToFile('users')));
}

function getAllAccauntsFromJSON() {
  return JSON.parse(fs.readFileSync(pathToFile('accaunts')));
}

function saveUsers(users) {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync(pathToFile('users'), dataJSON);
}
function saveAccaunts(accaunts) {
  const dataJSON = JSON.stringify(accaunts);
  fs.writeFileSync(pathToFile('accaunts'), dataJSON);
}

function createAndSaveNewAccount(cashIn, creditIn) {
  const cash = cashIn || 0;
  const credit = creditIn || 0;
  if (typeof credit !== 'number' || credit < 0) return 'Invalid credit';

  const accaountsList = getAllAccauntsFromJSON();
  const newAccaunt = {
    id: uniqid(),
    cash,
    credit,
    isActive: true,
  };
  accaountsList.push(newAccaunt);
  saveAccaunts(accaountsList);
  return newAccaunt;
}
