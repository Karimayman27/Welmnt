import { CollectionConfig } from 'payload';

const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    defaultColumns: ['name'],
    useAsTitle: 'name',
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
