import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import gConsole from "./utils/useConsole";
import { networkInterfaces } from "os";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
