const express = require('express');

const app = express();

//Serve the static files from the angular build
app.use(express.static(`${__dirname}/dist/fulibWorkflows-editor`));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/fulibWorkflows-editor/index.html`);
});

//Start the app
app.listen(process.env.PORT || 8080);
