const app = require('./src/app');

const APP_PORT = process.env.PORT || 3000;

app.listen(APP_PORT, () => {
  console.log(`Now serving your Express app at http://localhost:${APP_PORT}`); // eslint-disable-line
});
