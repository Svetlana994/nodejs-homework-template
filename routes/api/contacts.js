const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const validation = require("../../middlewares/validation");
const {
  contactJoiSchema,
  contactUpdateFavoriteSchema,
} = require("../../model/contacts/contact");

router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validation(contactJoiSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", validation(contactJoiSchema), ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  validation(contactUpdateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
