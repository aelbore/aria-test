import { KarmaOptions, createKarmaConfig } from './config';

export function karmaConfig(options?: KarmaOptions) {
  return config => config.set(createKarmaConfig(options))
}