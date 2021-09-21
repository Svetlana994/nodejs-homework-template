const listContacts = require("./listContacts");

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === Number(contactId));
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = getContactById;
