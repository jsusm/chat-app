import app from "./app.js";

const PORT = process.env.PORT ?? 8080

console.log(`Listen on port ${PORT}`)
app.listen(PORT)
