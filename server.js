const app = require('./app')
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.PORT)
  .then(() =>
    app.listen(3000, () => console.log("Database connection successful"))
  )
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })

