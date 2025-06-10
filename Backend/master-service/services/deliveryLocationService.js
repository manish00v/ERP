const prisma = require('../prisma/client');
const { 
  validateDeliveryLocation,
  validateDeliveryLocationUpdate 
} = require('../validations/deliveryLocationValidation');

class DeliveryLocationService {
  static async createDeliveryLocation(data) {
    const { error } = validateDeliveryLocation(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    const existingLocation = await prisma.deliveryLocation.findUnique({
      where: { deliveryLocationCode: data.deliveryLocationCode }
    });

    if (existingLocation) {
      throw new Error('Delivery Location Code already exists');
    }

    return prisma.deliveryLocation.create({
      data
    });
  }

  static async getAllDeliveryLocations() {
    return prisma.deliveryLocation.findMany();
  }

  static async getDeliveryLocationById(deliveryLocationCode) {
    return prisma.deliveryLocation.findUnique({
      where: { deliveryLocationCode: (deliveryLocationCode) }
    });
  }

  static async updateDeliveryLocation(deliveryLocationCode, data) {
    const existingLocation = await prisma.deliveryLocation.findUnique({
      where: { deliveryLocationCode: (deliveryLocationCode) }
    });

    if (!existingLocation) {
      throw new Error('Delivery Location not found');
    }

    const { error } = validateDeliveryLocationUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    if (data.deliveryLocationCode) {
      delete data.deliveryLocationCode;
    }

    return prisma.deliveryLocation.update({
      where: { deliveryLocationCode: (deliveryLocationCode) },
      data
    });
  }

  static async deleteDeliveryLocation(deliveryLocationCode) {
    return prisma.deliveryLocation.delete({
      where: { deliveryLocationCode: (deliveryLocationCode) }
    });
  }
}

module.exports = DeliveryLocationService;