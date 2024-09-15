import { Namer } from '@parcel/plugin';
import path from 'path';

export default new Namer({
  async name({ bundle, logger, options }) {
    let filePath: string | undefined;
    // Return if a target specified an output path.
    if (bundle?.filePath != null) {
      return bundle?.filePath;
    }

    switch (bundle.type) {
      case 'png':
      case 'jpg':
      case 'webp':
      case 'ico':
        filePath = bundle.getMainEntry?.()?.filePath;
        if (filePath) {
          return `assets/images/${path.basename(filePath)}`;
        }
      case 'ttf':
        filePath = bundle.getMainEntry?.()?.filePath;
        if (filePath) {
          return `assets/fonts/${path.basename(filePath)}`;
        }

      case 'svg':
        filePath = bundle.getMainEntry?.()?.filePath;
        if (filePath) {
          return `assets/svg/${path.basename(filePath)}`;
        }
      case 'mp4':
      case 'ogv':
      case 'webm':
        filePath = bundle.getMainEntry?.()?.filePath;
        if (filePath) {
          return `assets/videos/${path.basename(filePath)}`;
        }
    }

    // Allow the next namer to handle this bundle.
    return null;
  },
});
