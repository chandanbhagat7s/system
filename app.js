
const express = require('express');

const app = express()

const PORT = 4000;



app.use("/api/v1/admin")



app.listen(PORT, () => {
    console.log("SERVER STARTED AT PORT", PORT);
})









































