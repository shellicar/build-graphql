import type { UnpluginOptions } from 'unplugin';
import { handleHotUpdate } from './viteHotUpdate';

export const createVite = (enabled: boolean): UnpluginOptions['vite'] => {
  if (enabled) {
    return {
      handleHotUpdate,
    };
  }
  return undefined;
};
