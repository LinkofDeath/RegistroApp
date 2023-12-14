import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'pf8xgf',
  e2e: {
    'baseUrl': 'http://localhost:8100'
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

});
