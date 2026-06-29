import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Commerce Core API is running on port ${PORT}`);
});
