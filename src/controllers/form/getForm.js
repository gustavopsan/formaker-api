const formModel = require('../../models/form');

async function getForm(date)
{
    try {
        const form = await formModel.findOne({ date: date });

        if (!form) {
            return {
                status: 404,
                message: 'FORM_NOT_FOUND'
            }
        } else {
            return form
        }
    } catch (error) {
        return error
    }
}

module.exports = getForm