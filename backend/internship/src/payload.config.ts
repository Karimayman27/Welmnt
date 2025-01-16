import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import express, { Request, Response } from 'express'; // Import express types
import cors from 'cors';



import { Users } from './collections/Users';
import { Media } from './collections/Media';
import Posts from './collections/Posts';
import Authors from './collections/Authors';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const app = express();
app.use(cors()); 
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Authors],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  onInit: async (payload) => {
    // Create an express app instance explicitly
    const app = express();

    // Custom API endpoint to fetch all published posts along with authors
    app.get('/api/posts', async (req: Request, res: Response) => {
      const { page = 1, limit = 10 } = req.query;

      try {
        // Fetch all published posts with pagination
        const posts = await payload.find({
          collection: 'posts',
          where: {
            publishDate: {
              less_than_equal: new Date().toISOString(), // Fetch posts published till now
            },
          },
          depth: 1, // Include related author details
          limit: parseInt(limit as string, 10),
          page: parseInt(page as string, 10),
        });

        res.status(200).json({
          success: true,
          data: posts.docs,
          pagination: {
            totalDocs: posts.totalDocs,
            totalPages: posts.totalPages,
            page: posts.page,
            limit: posts.limit,
          },
        });
      } catch (error: unknown) {
        // Type the error as 'any' or more specifically
        if (error instanceof Error) {
          res.status(500).json({
            success: false,
            message: 'Failed to fetch posts.',
            error: error.message,
          });
        } else {
          res.status(500).json({
            success: false,
            message: 'Unknown error occurred.',
          });
        }
      }
    });

  },
});
