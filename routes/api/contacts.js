const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, authenticate } = require("../../middlewares");
const {
  contactJoiSchema,
  contactUpdateFavoriteSchema,
} = require("../../model/contact");

router.get("/", authenticate, ctrl.listContacts);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post("/", authenticate, validation(contactJoiSchema), ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.put(
  "/:contactId",
  authenticate,
  validation(contactJoiSchema),
  ctrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validation(contactUpdateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
