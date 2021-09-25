const contactsOperations = require("../model/contacts");

async function listContacts(req, res, next) {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        results: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      const error = new Error(`Contact by id=${contactId} is not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function addContact(req, res, next) {
  try {
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      const error = new Error(`Contact by id=${contactId} is not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "Success delete",
    });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      const error = new Error(`Contact by id=${contactId} is not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
