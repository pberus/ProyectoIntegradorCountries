const axios = require("axios");
const server = require("./src/server");
const { conn } = require("./src/db.js");
const getApiHandler = require("./src/handlers/getApi");
const PORT = process.env.PORT || 3001;

conn
  .sync({ force: true, logging: false })
  .then(async () => {
    await getApiHandler();
    server.listen(PORT, async () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error.message));
