import app from "./app";
import { connectToDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {
  await connectToDatabase();
};

app.listen(env.PORT, () => {
  console.log(
    `Commerce Core API is running on port ${env.PORT} in ${env.NODE_ENV} mode`,
  );
});

startServer();
