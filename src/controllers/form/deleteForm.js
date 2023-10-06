const formModel = require('../../models/form');

async function deleteForm(date)
{
    try {
        const formDeleted = await formModel.findOneAndDelete({ date: date })

        return formDeleted;
    } catch (error) {
        return error
    }
}

module.exports = deleteForm