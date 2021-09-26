const { Contact } = require("../model/contacts");

async function listContacts(req, res, next) {
  try {
    const contacts = await Contact.find({}, "_id name email phone favorite");
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
    const result = await Contact.findById(
      contactId,
      "_id name email phone favorite"
    );
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
    const result = await Contact.create(req.body);
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
    const result = await Contact.findByIdAndDelete(contactId);
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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
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

async function updateFavorite(req, res, next) {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!favorite) {
      const error = new Error("Missing field favorite");
      error.status = 400;
      throw error;
    }
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!result) {
      const error = new Error("Not found");
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
  updateFavorite,
};
