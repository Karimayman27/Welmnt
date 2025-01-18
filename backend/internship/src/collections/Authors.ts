import { CollectionConfig } from 'payload';

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  access: {
    create: () => true, // Allow anyone to create posts
    read: () => true,   // Allow anyone to read posts
    update: () => true, // Allow anyone to update posts
    delete: () => true, // Allow anyone to delete posts
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'profilePicture',
      type: 'upload',
      relationTo: 'media', 
      required: true,
    },
  ],
};

export default Authors;
