const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const listContacts = require("./listContacts");

const contactsPath = path.resolve("./db/contacts.json");

async function addContact(contact) {
  const { name, email, phone } = contact;
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = addContact;
