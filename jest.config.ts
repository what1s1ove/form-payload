import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
