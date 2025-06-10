const prisma = require('../prisma/client');
const { validateBusinessUnit, validateBusinessUnitUpdate } = require('../validations/businessUnitValidation');

class BusinessUnitService {
    static async createBusinessUnit(data) {
        // Validate input data
        const { error } = validateBusinessUnit(data);
        if (error) {
            throw new Error(error.details.map(detail => detail.message).join(', '));
        }

        // Check for duplicate business unit code
        const existingUnit = await prisma.businessUnit.findUnique({
            where: { businessUnitCode: data.businessUnitCode }
        });
        if (existingUnit) {
            throw new Error('Business Unit Code already exists');
        }

        // Handle Sales relationships if provided
        if (data.salesChannelId || data.salesOfficeCode) {
            // Validate both fields are provided
            if (!data.salesChannelId || !data.salesOfficeCode) {
                throw new Error('Both Sales Channel ID and Sales Office Code must be provided');
            }

            // Validate sales channel exists
            const salesChannel = await prisma.salesChannel.findUnique({
                where: { salesChannelId: data.salesChannelId }
            });
            
            if (!salesChannel) {
                throw new Error(`Sales Channel with ID ${data.salesChannelId} not found`);
            }

            // Validate sales office exists
            const salesOffice = await prisma.salesOffice.findUnique({
                where: { salesOfficeCode: data.salesOfficeCode }
            });

            if (!salesOffice) {
                throw new Error(`Sales Office with code ${data.salesOfficeCode} not found`);
            }
        }

        // Create the business unit
        const createdUnit = await prisma.businessUnit.create({
            data: {
                businessUnitCode: data.businessUnitCode,
                businessUnitDesc: data.businessUnitDesc,
                street1: data.street1,
                street2: data.street2,
                city: data.city,
                state: data.state,
                region: data.region,
                country: data.country,
                pinCode: data.pinCode,
                salesChannelId: data.salesChannelId,
                salesOfficeCode: data.salesOfficeCode
            },
            include: {
                salesChannel: true,
                salesOffice: true
            }
        });

        // Transform the response
        return {
            ...createdUnit,
            salesChannelId: createdUnit.salesChannel?.salesChannelId || null,
            salesOfficeCode: createdUnit.salesOffice?.salesOfficeCode || null,
            salesChannel: undefined,
            salesOffice: undefined
        };
    }

    static async getAllBusinessUnits() {
        const units = await prisma.businessUnit.findMany({
            include: {
                salesChannel: true,
                salesOffice: true
            }
        });

        return units.map(unit => ({
            ...unit,
            salesChannelId: unit.salesChannel?.salesChannelId || null,
            salesOfficeCode: unit.salesOffice?.salesOfficeCode || null,
            salesChannel: undefined,
            salesOffice: undefined
        }));
    }

    static async getBusinessUnitByCode(code) {
        const unit = await prisma.businessUnit.findUnique({
            where: { businessUnitCode: code },
            include: {
                salesChannel: true,
                salesOffice: true
            }
        });

        if (!unit) return null;

        return {
            ...unit,
            salesChannelId: unit.salesChannel?.salesChannelId || null,
            salesOfficeCode: unit.salesOffice?.salesOfficeCode || null,
            salesChannel: undefined,
            salesOffice: undefined
        };
    }

    static async updateBusinessUnitByCode(code, data) {
        const { error } = validateBusinessUnitUpdate(data);
        if (error) {
            throw new Error(error.details.map(detail => detail.message).join(', '));
        }

        const existingUnit = await prisma.businessUnit.findUnique({
            where: { businessUnitCode: code }
        });
        if (!existingUnit) {
            throw new Error('Business Unit not found');
        }

        // Prevent changing the businessUnitCode through this method
        if (data.businessUnitCode && data.businessUnitCode !== code) {
            throw new Error('Cannot change businessUnitCode through this endpoint');
        }

        const updateData = {
            businessUnitDesc: data.businessUnitDesc,
            street1: data.street1,
            street2: data.street2,
            city: data.city,
            state: data.state,
            region: data.region,
            country: data.country,
            pinCode: data.pinCode,
            salesChannelId: data.salesChannelId,
            salesOfficeCode: data.salesOfficeCode
        };

        Object.keys(updateData).forEach(key => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        const updatedUnit = await prisma.businessUnit.update({
            where: { businessUnitCode: code },
            data: updateData,
            include: {
                salesChannel: true,
                salesOffice: true
            }
        });

        return {
            ...updatedUnit,
            salesChannelId: updatedUnit.salesChannel?.salesChannelId || null,
            salesOfficeCode: updatedUnit.salesOffice?.salesOfficeCode || null,
            salesChannel: undefined,
            salesOffice: undefined
        };
    }

    static async deleteBusinessUnitByCode(code) {
        const existingUnit = await prisma.businessUnit.findUnique({
            where: { businessUnitCode: code }
        });
        if (!existingUnit) {
            throw new Error('Business Unit not found');
        }

        return prisma.businessUnit.delete({
            where: { businessUnitCode: code }
        });
    }
}

module.exports = BusinessUnitService;