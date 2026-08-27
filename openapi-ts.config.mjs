import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
  input: './openapi.json',
  output: {
    path: './src/api/generated',
    clean: true,
  },
  plugins: [
    '@hey-api/typescript',
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './src/api/hey-api-runtime.ts',
      throwOnError: true,
    },
    {
      name: '@hey-api/sdk',
      client: '@hey-api/client-fetch',
      operations: 'flat',
      paramsStructure: 'grouped',
      responseStyle: 'data',
    },
  ],
})
