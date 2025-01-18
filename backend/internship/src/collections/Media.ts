import { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    disableLocalStorage: false, // Ensure local storage is enabled for file uploads
    mimeTypes: ['image/png', 'image/jpeg'], // Restrict uploads to PNG and JPEG
    imageSizes: [
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1024,
        height: 768,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail', // Use thumbnail in the admin panel
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
