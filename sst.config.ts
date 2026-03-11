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

    const service = new sst.aws.Service("MeuMercadoService", {
      cluster,
      loadBalancer: {
        ports: [{ listen: "80/http", forward: "3000/http" }],
      },
      dev: {
        command: "npm run dev",
      },
      image: {
        context: ".",
        dockerfile: "Dockerfile",
      },
    });

    return {
      api: service.url,
    };
  },
});
