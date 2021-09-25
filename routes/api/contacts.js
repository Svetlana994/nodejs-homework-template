const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const validation = require("../../middlewares/validation");
const contactJoiSchema = require("../../schemas/joi");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validation(contactJoiSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validation(contactJoiSchema), ctrl.updateContact);

module.exports = router;
