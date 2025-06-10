const prisma = require('../prisma/client');
const { 
    validateBusinessEntity,
    validateBusinessEntityUpdate
} = require('../validations/businessEntityValidation');

class BusinessEntityService {
    
static async createBusinessEntity(data) {
    const { error } = validateBusinessEntity(data);
    if (error) {
        throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    const existingEntity = await prisma.businessEntity.findUnique({
        where: { businessEntityCode: data.businessEntityCode }
    });

    if (existingEntity) {
        throw new Error('Business Entity Code already exists');
    }

    // Only include valid fields from schema
    const {
        businessEntityCode,
        businessEntityName,
        street1,
        street2,
        city,
        state,
        region,
        country,
        pinCode
    } = data;

    const entityData = {
        businessEntityCode,
        businessEntityName,
        street1,
        street2,
        city,
        state,
        region,
        country,
        pinCode
    };

    return prisma.businessEntity.create({
        data: entityData
    });
}


static async updateBusinessEntityByCode(code, data) {
    const existingEntity = await prisma.businessEntity.findUnique({
        where: { businessEntityCode: code }
    });
    
    if (!existingEntity) {
        throw new Error('Business Entity not found');
    }
    
    const { error } = validateBusinessEntityUpdate(data);
    if (error) {
        throw new Error(error.details.map(detail => detail.message).join(', '));
    }
    
    // Prevent changing the businessEntityCode through this method
    if (data.businessEntityCode && data.businessEntityCode !== code) {
        throw new Error('Cannot change businessEntityCode through this endpoint');
    }
    
    // Prepare the update data
    const updateData = {
        ...data,
        businessUnitCode: data.businessUnitCode !== undefined ? data.businessUnitCode : existingEntity.businessUnitCode,
        factoryUnitCode: data.factoryUnitCode !== undefined ? data.factoryUnitCode : existingEntity.factoryUnitCode
    };
    
    return prisma.businessEntity.update({
        where: { businessEntityCode: code },
        data: updateData
    });
}
    static async getAllBusinessEntities() {
        return prisma.businessEntity.findMany();
    }

    static async getBusinessEntityByCode(code) {
        return prisma.businessEntity.findUnique({
            where: { businessEntityCode: code }
        });
    }

    static async deleteBusinessEntityByCode(code) {
        const existingEntity = await prisma.businessEntity.findUnique({
            where: { businessEntityCode: code }
        });

        if (!existingEntity) {
            throw new Error('Business Entity not found');
        }

        return prisma.businessEntity.delete({
            where: { businessEntityCode: code }
        });
    }
}

module.exports = BusinessEntityService;
