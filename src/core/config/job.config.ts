import { JobOptions } from 'bull';

export const JobConfig: JobOptions = {
  attempts: 3,
  delay: 1000,
  removeOnComplete: {
    age: 2 * 3600,
    count: 1000,
  },
  removeOnFail: {
    age: 168 * 3600,
  },
};
