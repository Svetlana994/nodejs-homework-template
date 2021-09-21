const fs = require("fs/promises");
const path = require("path");
const listContacts = require("./listContacts");

const contactsPath = path.resolve("./db/contacts.json");

async function updateContact(contactId, newData) {
  const contacts = await listContacts();

  const idx = contacts.findIndex((contact) => contact.id === Number(contactId));
  if (idx === -1) return null;

  const updatedContact = { ...contacts[idx], ...newData };
  contacts[idx] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = updateContact;
