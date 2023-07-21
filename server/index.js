const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const getCountriesHandler = require("./src/handlers/getCountries");
const PORT = 3001;

conn
  .sync({ force: true, logging: false })
  .then(async () => {
    await getCountriesHandler();
    server.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
