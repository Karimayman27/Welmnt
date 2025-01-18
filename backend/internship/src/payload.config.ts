import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { payloadCloudPlugin } from '@payloadcms/payload-cloud';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { Users } from './collections/Users';
import { Media } from './collections/Media';
import Posts from './collections/Posts';
import Authors from './collections/Authors';
import express, { Request, Response, NextFunction } from 'express';


const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Posts, Authors], // Define your collections
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [payloadCloudPlugin()],
  onInit: async (payload) => {
    const app = express();

    // CORS middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      next();
    });

    // Custom API endpoint for posts
    app.get('/api/posts', async (req: Request, res: Response) => {
      const { page = 1, limit = 10 } = req.query;

      try {
        const posts = await payload.find({
          collection: 'posts', // Posts collection slug
          where: {
            publishDate: {
              less_than_equal: new Date().toISOString(), // Fetch published posts till now
            },
          },
          depth: 1,
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
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: 'Failed to fetch posts.',
          error: error.message,
        });
      }
    });
  },
});
