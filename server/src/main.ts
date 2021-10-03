import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/main/app.module";
import { database, gConsole, gMail } from "./utils";
import { networkInterfaces } from "os";
import * as path from "path";
async function bootstrap() {
  database.dbInit(path.join(__dirname, "..", "db"));
  gMail.init(path.join(__dirname, "..", "assets"));
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.setGlobalPrefix(process.env.VERSION);
  const port = process.env.PORT || 10050;
  await app.listen(port);
  const network = networkInterfaces();
  gConsole.color("nest服务已启动", "greenBG");
  const networkKeys = Object.keys(network);
  networkKeys.forEach(m => {
    const networkItemList = network[m];
    networkItemList.forEach(v => {
      if (v.family === "IPv4" && v.address)
        gConsole.color(`http://${v.address}:${port}`, "blue");
    });
  });
}
bootstrap();
