/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "meu-mercado-api",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MeuMercadoVpc");
    const cluster = new sst.aws.Cluster("MeuMercadoCluster", {
      vpc,
    });

    const database = new sst.aws.Postgres("MeuMercadoDB", {
      vpc,
      version: "15",
    });

    const service = new sst.aws.Service("MeuMercadoService", { 
      cluster,
      loadBalancer: {
        ports: [{ listen: "80/http", forward: "3000/http" }],
      },
      dev: {
        command: "npm run dev",
      },
      link: [database],
      environment: {
        DATABASE_URL: $interpolate`postgresql://${database.username}:${database.password}@${database.host}:${database.port}/${database.database}`,
        INFOSIMPLES_API_KEY: new sst.Secret("InfoSimplesApiKey").value,
        BETTER_AUTH_SECRET: new sst.Secret("BetterAuthSecret").value,
        NODE_ENV: "production",
      },
      image: {
        context: ".",
        dockerfile: "Dockerfile",
      },
    });

    return {
      api: service.url,
      database: database.host,
    };
  },
});
