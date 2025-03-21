module.exports = {
  apps: [
    {
      name: "coffee-craft-service-product",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment-variable",
      },
    },
  ],
};
