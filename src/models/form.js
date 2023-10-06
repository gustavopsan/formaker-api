const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
    {
        date: {
            type: "Object",
            unique: true
        },
        week: "String",
        orders: "Object"
    },
    {
        timestamps: true
    }
)

const Form = mongoose.model('form', formSchema);

module.exports = Form;