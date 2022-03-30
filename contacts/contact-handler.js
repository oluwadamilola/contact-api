const express = require('express');
const zod = require('zod');
const httpStatus = require('http-status');
const {
  getAllContacts,
  getContact,
  createNewContact,
  updateContactDetails,
  deleteContactDetails,
} = require('./contact-service');
const AppError = require('../errors/app-error');

const router = express.Router();

router.get('/', function getAllContactsRoute(_req, res) {
  getAllContacts().then((data) => {
    res.status(httpStatus.OK).json(data);
  });
});

router.get('/:contactID', function getContactRoute(req, res, next) {
  getContact(req.params.contactID)
    .then((data) => {
      res.status(httpStatus.OK).json(data);
    })
    .catch((err) => {
      return next(new AppError(httpStatus.NOT_FOUND, err.message));
    });
});

const createContactSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
});

router.post('/', function createContactRoute(req, res, next) {
  const validation = createContactSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: 'Invalid contact Info',
      validationErrors: validation.error.flatten(),
    });
  }

  createNewContact(validation.data)
    .then((data) => {
      res.status(httpStatus.CREATED).json(data);
    })
    .catch((err) => {
      return next(new AppError(httpStatus.CONFLICT, err.message));
    });
});

const updateContactSchema = createContactSchema.partial();

router.put('/:contactID', function updateContactRoute(req, res, next) {
  const contactId = req.params.contactID;
  const validation = updateContactSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(httpStatus.BAD_REQUEST).json({
      error: 'Invalid contact Info',
      validationErrors: validation.error.flatten(),
    });
  }

  updateContactDetails(contactId, validation.data)
    .then((data) => {
      res.status(httpStatus.OK).json(data);
    })
    .catch((err) => {
      return next(new AppError(httpStatus.NOT_FOUND, err.message));
    });
});

router.delete('/:contactID', function deleteContactRoute(req, res, next) {
  const contactId = req.params.contactID;

  deleteContactDetails(contactId)
    .then(() => {
      res.status(httpStatus.OK).json({ data: 'Contact Deleted' });
    })
    .catch((err) => {
      return next(new AppError(httpStatus.NOT_FOUND, err.message));
    });
});

module.exports = router;
