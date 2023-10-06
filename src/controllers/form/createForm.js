const formModel = require('../../models/form');

async function createForm(date, week, orders)
{
    try {
        const formCreated = await formModel.create(
            {
                date,
                week,
                orders
            }
        );

        return formCreated;
    } catch (error) {
        return error;
    }
}

module.exports = createForm;