//require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    app.use(CORS());
    next();
});

// Controllers Callers
const createForm = require('./controllers/form/createForm');
const listForms = require('./controllers/form/listForms');
const getForm = require('./controllers/form/getForm');
const deleteForm = require('./controllers/form/deleteForm');

const port = process.env.PORT || 3000;

require('./controllers/db/connection');

app.get('/', (req, res) => {
    res.json(
        {
            status: "active",
            message: "Formaker API - Conexão bem sucedida"
        }
    )
});

app.post('/form/create', (req, res) => {
    const { date, week, orders } = req.body;

    createForm(date, week, orders)
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

app.get('/form/list', (req, res) => {
    listForms()
        .then(forms => res.json(forms))
        .catch(err => res.json(err))
});

app.post('/form/find', (req, res) => {
    const { date } = req.body;

    if (!date) {
        res.json({
            status: 404,
            message: 'FORM_DATE_NOT_INFORMATED'
        })
    } else {
        getForm(date)
            .then(response => {
                if(!response) {
                    res.json({
                        status: 404,
                        message: 'FORM_NOT_FOUND'
                    })
                } else {
                    res.json(response)
                }
            })
            .catch(err => res.json(err))
    }
});

app.post('/form/remove', (req, res) => {
    const { date } = req.body;

    deleteForm(date)
        .then(response => res.json(response))
        .catch(err => res.json(err))
});

app.listen(port);