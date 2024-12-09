import { Handler } from '@netlify/functions';
import { Client, query as q } from 'faunadb';
import { v4 as uuidv4 } from 'uuid';
import busboy from 'busboy';

const client = new Client({
  secret: process.env.FAUNA_SECRET_KEY || ''
});

const parseMultipartForm = (event: any) => {
  return new Promise((resolve, reject) => {
    const bb = busboy({ headers: event.headers });
    const result: any = {
      files: {},
      fields: {}
    };

    bb.on('file', (name, file, info) => {
      const { filename, encoding, mimeType } = info;
      const chunks: any[] = [];

      file.on('data', (data) => {
        chunks.push(data);
      });

      file.on('end', () => {
        result.files[name] = {
          filename,
          content: Buffer.concat(chunks),
          encoding,
          mimeType
        };
      });
    });

    bb.on('field', (name, val) => {
      result.fields[name] = val;
    });

    bb.on('finish', () => resolve(result));
    bb.on('error', reject);

    bb.write(event.body);
    bb.end();
  });
};

export const handler: Handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers
    };
  }

  try {
    switch (event.httpMethod) {
      case 'POST': {
        const formData: any = await parseMultipartForm(event);
        const modelData = JSON.parse(formData.fields.data);
        
        // Generate unique IDs for files
        const modelFileId = uuidv4();
        const thumbnailIds = Object.keys(formData.files)
          .filter(key => key.startsWith('thumbnail_'))
          .map(() => uuidv4());

        // Store files in FaunaDB (mock URLs for now)
        const modelFileUrl = `https://storage.example.com/${modelFileId}`;
        const thumbnailUrls = thumbnailIds.map(id => 
          `https://storage.example.com/${id}`
        );

        const model = {
          ...modelData,
          modelFileUrl,
          thumbnails: thumbnailUrls,
          createdAt: new Date().toISOString(),
          stats: {
            likes: 0,
            downloads: 0,
            views: 0
          }
        };

        const result = await client.query(
          q.Create(q.Collection('models'), {
            data: model
          })
        );

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify({
            data: {
              ...result.data,
              id: result.ref.id
            }
          })
        };
      }

      case 'GET': {
        if (event.path.includes('/models/')) {
          const id = event.path.split('/').pop();
          const doc = await client.query(
            q.Get(q.Ref(q.Collection('models'), id))
          );
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              data: {
                ...doc.data,
                id: doc.ref.id
              }
            })
          };
        }

        const docs = await client.query(
          q.Map(
            q.Paginate(q.Documents(q.Collection('models'))),
            q.Lambda('ref', q.Get(q.Var('ref')))
          )
        );

        const models = docs.data.map((doc: any) => ({
          ...doc.data,
          id: doc.ref.id
        }));

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ data: models })
        };
      }

      case 'PUT': {
        const id = event.path.split('/').pop();
        const formData: any = await parseMultipartForm(event);
        const modelData = JSON.parse(formData.fields.data);

        const result = await client.query(
          q.Update(q.Ref(q.Collection('models'), id), {
            data: modelData
          })
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            data: {
              ...result.data,
              id: result.ref.id
            }
          })
        };
      }

      case 'DELETE': {
        const id = event.path.split('/').pop();
        await client.query(
          q.Delete(q.Ref(q.Collection('models'), id))
        );

        return {
          statusCode: 204,
          headers
        };
      }

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};