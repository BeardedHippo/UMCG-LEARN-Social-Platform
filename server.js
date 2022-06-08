// Toen dit Vue project online werd gezet op heroku, moest er des tijds een kleine express server naast draaien om
// dit te laten werken.

const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const app = express();
const port = process.env.PORT || 80;

app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));
app.listen(port);
