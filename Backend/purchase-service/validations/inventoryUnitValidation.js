const Joi = require('joi');

const InventoryUnitIdRegex = /^[a-zA-Z0-9]{4}$/;
const factoryUnitCodeRegex = /^[a-zA-Z0-9]{4}$/;
const nameRegex = /^[a-zA-Z0-9 ]{1,30}$/;
const controlMethods = ['FIFO', 'LIFO', 'FEFO', 'Specific Identification'];
const streetAddressRegex = /^[a-zA-Z0-9 ,.-]{1,50}$/;
const cityRegex = /^[a-zA-Z ]{1,30}$/;
const regionRegex = /^[a-zA-Z0-9 ]{1,20}$/;
const countryRegex = /^[a-zA-Z ]{1,30}$/;
const pinCodeRegex = /^[0-9]{6}$/;

const createInventoryUnitSchema = Joi.object({
  InventoryUnitId: Joi.string()
    .pattern(InventoryUnitIdRegex)
    .required()
    .uppercase(),
  InventoryUnitName: Joi.string()
    .pattern(nameRegex)
    .max(30)
    .required(),
  InventoryControl: Joi.string()
    .valid(...controlMethods)
    .required(),
  StreetAddress: Joi.string()
    .pattern(streetAddressRegex)
    .max(50)
    .required(),
  City: Joi.string()
    .pattern(cityRegex)
    .max(30)
    .required(),
  Region: Joi.string()
    .pattern(regionRegex)
    .max(20)
    .required(),
  Country: Joi.string()
    .pattern(countryRegex)
    .max(30)
    .required(),
  PinCode: Joi.string()
    .pattern(pinCodeRegex)
    .required(),
  factoryUnitCode: Joi.string()
    .pattern(factoryUnitCodeRegex)
    .optional()
    .allow(null, '')
    .uppercase()
});

const updateInventoryUnitSchema = Joi.object({
  InventoryUnitId: Joi.forbidden(), // Prevent updating ID
  InventoryUnitName: Joi.string()
    .pattern(nameRegex)
    .max(30),
  InventoryControl: Joi.string()
    .valid(...controlMethods),
  StreetAddress: Joi.string()
    .pattern(streetAddressRegex)
    .max(50),
  City: Joi.string()
    .pattern(cityRegex)
    .max(30),
  Region: Joi.string()
    .pattern(regionRegex)
    .max(20),
  Country: Joi.string()
    .pattern(countryRegex)
    .max(30),
  PinCode: Joi.string()
    .pattern(pinCodeRegex),
  factoryUnitCode: Joi.string()
    .pattern(factoryUnitCodeRegex)
    .optional()
    .allow(null, '')
    .uppercase()
}).min(1);

module.exports = {
  createInventoryUnitSchema,
  updateInventoryUnitSchema
};