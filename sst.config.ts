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
    const api = new sst.aws.Function("MeuMercadoAPI", {
      handler: "src/lambda.handler",
      runtime: "nodejs20.x",
      timeout: "30 seconds",
      memory: "512 MB",
      environment: {
        DATABASE_URL: new sst.Secret("DATABASE_URL").value,
        INFOSIMPLES_API_KEY: new sst.Secret("INFOSIMPLES_API_KEY").value,
        BETTER_AUTH_SECRET: new sst.Secret("BETTER_AUTH_SECRET").value,
        NODE_ENV: "production",
      },
      url: true,
    });

    return {
      api: api.url,
    };
  },
});
