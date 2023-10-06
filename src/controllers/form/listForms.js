const formModel = require('../../models/form');

async function listForms()
{
    try {
        const forms = await formModel.find();
        return forms;
    } catch (error) {
        return error
    }
}

module.exports = listForms;