import { CollectionConfig } from 'payload';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    defaultColumns: ['title', 'author', 'publishDate'],
    useAsTitle: 'title',
  },
  access: {
    create: () => true, 
    read: () => true,   
    update: () => true, 
    delete: () => true, 
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media', // Ensure the Media collection exists
      required: true,
    },
    {
      name: 'author',
      type: 'relationship', // Relationship field
      relationTo: 'authors', // The slug of the Authors collection
      required: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly', // Show only the date picker
        },
      },
    },
  ],
};

export default Posts;
