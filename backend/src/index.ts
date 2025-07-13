import { initServer } from "./init";
import appController from "./entry-point/app.controller";

async function main() {
  const app = await initServer(appController);
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is listening on port http://localhost:${process.env.PORT}.`
    );
  });
}
main();
