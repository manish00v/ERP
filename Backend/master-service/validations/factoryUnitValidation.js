const Joi = require('joi');

const factoryUnitSchema = Joi.object({
  factoryUnitCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      'string.base': 'Factory Unit Code should be a string',
      'string.length': 'Factory Unit Code should be exactly 4 characters',
      'string.pattern.base': 'Factory Unit Code should be alphanumeric',
      'any.required': 'Factory Unit Code is required'
    }),
  
  factoryUnitName: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .required()
    .messages({
      'string.base': 'Factory Unit Name should be a string',
      'string.max': 'Factory Unit Name should not exceed 30 characters',
      'string.pattern.base': 'Factory Unit Name should be alphanumeric',
      'any.required': 'Factory Unit Name is required'
    }),
  
  street1: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'Street 1 should be a string',
      'string.max': 'Street 1 should not exceed 50 characters',
      'any.required': 'Street 1 is required'
    }),
  
  street2: Joi.string()
    .max(50)
    .allow('', null)
    .messages({
      'string.base': 'Street 2 should be a string',
      'string.max': 'Street 2 should not exceed 50 characters'
    }),
  
  city: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'City should be a string',
      'string.max': 'City should not exceed 30 characters',
      'string.pattern.base': 'City should contain only letters',
      'any.required': 'City is required'
    }),
  
  state: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'State should be a string',
      'string.max': 'State should not exceed 30 characters',
      'string.pattern.base': 'State should contain only letters',
      'any.required': 'State is required'
    }),
  
  region: Joi.string()
    .max(50)
    .allow('', null)
    .messages({
      'string.base': 'Region should be a string',
      'string.max': 'Region should not exceed 50 characters'
    }),
  
  country: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      'string.base': 'Country should be a string',
      'string.max': 'Country should not exceed 30 characters',
      'string.pattern.base': 'Country should contain only letters',
      'any.required': 'Country is required'
    }),
  
  pinCode: Joi.string()
    .min(4)
    .max(6)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'Pin Code should be a string',
      'string.min': 'Pin Code should be between 4 to 6 digits',
      'string.max': 'Pin Code should be between 4 to 6 digits',
      'string.pattern.base': 'Pin Code should contain only numbers',
      'any.required': 'Pin Code is required'
    }),
  
  language: Joi.string()
    .valid('EN', 'ES', 'FR', 'DE', 'IT', 'NL', 'ID', 'VI')
    .required()
    .messages({
      'string.base': 'Language should be a string',
      'any.only': 'Language must be one of EN, ES, FR, DE, IT, NL, ID, VI',
      'any.required': 'Language is required'
    }),
  
  businessEntityCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Business Entity Code must be a string',
      'string.length': 'Business Entity Code must be 4 characters',
      'string.pattern.base': 'Business Entity Code must be alphanumeric'
    }),
     deliveryLocationCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow('', null)
    .messages({
      'string.base': 'Delivery Location Code must be a string',
      'string.length': 'Delivery Location Code must be 4 characters',
      'string.pattern.base': 'Delivery Location Code must be alphanumeric'
    }),

    InventoryUnitId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Inventory Unit ID must be a string',
      'string.length': 'Inventory Unit ID must be 4 characters',
      'string.pattern.base': 'Inventory Unit ID must be alphanumeric'
    }),

  InventoryBayId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Inventory Bay ID must be a string',
      'string.length': 'Inventory Bay ID must be 4 characters',
      'string.pattern.base': 'Inventory Bay ID must be alphanumeric'
    }),

  sourcingUnitId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Sourcing Unit ID must be a string',
      'string.length': 'Sourcing Unit ID must be 4 characters',
      'string.pattern.base': 'Sourcing Unit ID must be alphanumeric'
    }),

  sourcingTeamId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Sourcing Team ID must be a string',
      'string.length': 'Sourcing Team ID must be 4 characters',
      'string.pattern.base': 'Sourcing Team ID must be alphanumeric'
    })
});

const updateFactoryUnitSchema = Joi.object({
  factoryUnitName: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z0-9 ]+$/)
    .messages({
      'string.base': 'Factory Unit Name should be a string',
      'string.max': 'Factory Unit Name should not exceed 30 characters',
      'string.pattern.base': 'Factory Unit Name should be alphanumeric'
    }),
  
  street1: Joi.string()
    .max(50)
    .messages({
      'string.base': 'Street 1 should be a string',
      'string.max': 'Street 1 should not exceed 50 characters'
    }),
  
  street2: Joi.string()
    .max(50)
    .allow('', null)
    .messages({
      'string.base': 'Street 2 should be a string',
      'string.max': 'Street 2 should not exceed 50 characters'
    }),
  
  city: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      'string.base': 'City should be a string',
      'string.max': 'City should not exceed 30 characters',
      'string.pattern.base': 'City should contain only letters'
    }),
  
  state: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      'string.base': 'State should be a string',
      'string.max': 'State should not exceed 30 characters',
      'string.pattern.base': 'State should contain only letters'
    }),
  
  region: Joi.string()
    .max(50)
    .allow('', null)
    .messages({
      'string.base': 'Region should be a string',
      'string.max': 'Region should not exceed 50 characters'
    }),
  
  country: Joi.string()
    .max(30)
    .pattern(/^[a-zA-Z ]+$/)
    .messages({
      'string.base': 'Country should be a string',
      'string.max': 'Country should not exceed 30 characters',
      'string.pattern.base': 'Country should contain only letters'
    }),
  
  pinCode: Joi.string()
    .min(4)
    .max(6)
    .pattern(/^[0-9]+$/)
    .messages({
      'string.base': 'Pin Code should be a string',
      'string.min': 'Pin Code should be between 4 to 6 digits',
      'string.max': 'Pin Code should be between 4 to 6 digits',
      'string.pattern.base': 'Pin Code should contain only numbers'
    }),
  
  language: Joi.string()
    .valid('EN', 'ES', 'FR', 'DE', 'IT', 'NL', 'ID', 'VI')
    .messages({
      'string.base': 'Language should be a string',
      'any.only': 'Language must be one of EN, ES, FR, DE, IT, NL, ID, VI'
    }),
  
  businessEntityCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow('', null)
    .messages({
      'string.base': 'Business Entity Code must be a string',
      'string.length': 'Business Entity Code must be 4 characters',
      'string.pattern.base': 'Business Entity Code must be alphanumeric'
    }),

    deliveryLocationCode: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Delivery Location Code must be a string',
      'string.length': 'Delivery Location Code must be 4 characters',
      'string.pattern.base': 'Delivery Location Code must be alphanumeric'
    }),

    InventoryUnitId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Inventory Unit ID must be a string',
      'string.length': 'Inventory Unit ID must be 4 characters',
      'string.pattern.base': 'Inventory Unit ID must be alphanumeric'
    }),

  InventoryBayId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Inventory Bay ID must be a string',
      'string.length': 'Inventory Bay ID must be 4 characters',
      'string.pattern.base': 'Inventory Bay ID must be alphanumeric'
    }),

  sourcingUnitId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Sourcing Unit ID must be a string',
      'string.length': 'Sourcing Unit ID must be 4 characters',
      'string.pattern.base': 'Sourcing Unit ID must be alphanumeric'
    }),

  sourcingTeamId: Joi.string()
    .length(4)
    .pattern(/^[a-zA-Z0-9]+$/)
    .allow(null, '')
    .messages({
      'string.base': 'Sourcing Team ID must be a string',
      'string.length': 'Sourcing Team ID must be 4 characters',
      'string.pattern.base': 'Sourcing Team ID must be alphanumeric'
    })
}).min(1);

const validateFactoryUnit = (data) => {
  const { error, value } = factoryUnitSchema.validate(data, { 
    abortEarly: false,
    allowUnknown: false
  });

  if (error) {
    return {
      error: {
        name: 'ValidationError',
        message: 'Factory Unit validation failed',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message.replace(/['"]+/g, ''),
          type: detail.type
        }))
      }
    };
  }

  return { value };
};

const validateFactoryUnitUpdate = (data) => {
  const { error, value } = updateFactoryUnitSchema.validate(data, { 
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true
  });

  if (error) {
    return {
      error: {
        name: 'ValidationError',
        message: 'Factory Unit update validation failed',
        details: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message.replace(/['"]+/g, ''),
          type: detail.type
        }))
      }
    };
  }

  return { value };
};

module.exports = {
  validateFactoryUnit,
  validateFactoryUnitUpdate,
  factoryUnitSchema // Optional: export schema for documentation
};