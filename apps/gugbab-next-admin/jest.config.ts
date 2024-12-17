import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@app/feature/(.*)$': '<rootDir>/src/feature/$1',
    '^@app/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@app/widgets/(.*)$': '<rootDir>/src/widgets/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['<rootDir>/src/shared/**/*.{ts,tsx,js,jsx}'],
  verbose: true,
  coverageReporters: ['text', 'lcov'],
  testRegex: '<rootDir>/src/shared/.*\\.(test|spec)\\.(js|ts|jsx|tsx)$',
};

export default config;
