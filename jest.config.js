/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],
  resolver: 'jest-ts-webcompat-resolver',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/server.ts',
    '!src/database/connection.ts',
  ],
};
