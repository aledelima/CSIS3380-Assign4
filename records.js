const fs = require('fs');
const fileName = 'record.json';

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all users
 * @param None
 */
function getUsers(){
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

/**
 * Gets a specific user by ID
 * @param {number} id - Accepts the ID of the specified quote.
 */
async function getUser(id){
  const users = await getUsers();
  return users.find(record => record.id == id);
}

/**
 * Gets a random user 
 * @param None
 */
async function getRamdomUser(){
  const users = await getUsers();
  const randNum = Math.floor(Math.random() * users.length);
  return users[randNum];
}

/**
 * Creates a new user record 
 * @param {Object} newRecord - Object containing info for new quote: the quote text, author and year 
 */
async function createUser(newRecord) {
  const users = await getUsers(); 
  
  newRecord.id = users.length+1; 
  users.push(newRecord);
  await save(users); 
  return newRecord; 
}

/**
 * Updates a single record 
 * @param {Object} newUser - An object containing the changes to user: email, username
 */
async function updateUser(newUser){
  const users = await getUsers();
  let user = users.find(item => item.id == newUser.id);
  
  user.email = newUser.email;
  user.username = newUser.username;
 
  await save(users);
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted. 
 */
async function deleteUser(record){
  console.log(record);
  let users = await getUsers();
  users = users.filter(item => item.id != record.id);
  await save(users);
}

module.exports = {
  getUsers: getUsers,
  getUser: getUser, 
  createUser: createUser, 
  updateUser: updateUser, 
  deleteUser: deleteUser,
  getRandomUser: getRamdomUser
}
