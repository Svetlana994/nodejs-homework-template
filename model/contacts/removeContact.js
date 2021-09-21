const fs = require("fs/promises");
const path = require("path");
const listContacts = require("./listContacts");

const contactsPath = path.resolve("./db/contacts.json");

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const newContacts = contacts.filter(({ id }) => id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    return "Success remove";
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = removeContact;
