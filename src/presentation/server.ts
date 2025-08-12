import express, { Router } from "express"
import path from "path"

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    this.port = options.port;
    this.publicPath = options.publicPath || "public";
    this.routes = options.routes;
  }

  async start() {
    // Middlewares

    // Public Folder
    this.app.use(express.static(this.publicPath));
    this.app.use(this.routes);

    this.app.get("/{*splat}", (req, res) => {
      const indexPath = path.join(
        __dirname,
        `../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log("server is running");
    });
  }
}
