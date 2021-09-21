const path = require("path");
const fs = require("fs/promises");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = listContacts;
