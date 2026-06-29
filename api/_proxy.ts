import type { IncomingMessage, ServerResponse } from 'node:http';

export const proxyConfig = {
  api: {
    bodyParser: false,
  },
};

function readRequestBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer | string) => {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export async function proxyUpstream(
  req: IncomingMessage,
  res: ServerResponse,
  upstreamBase: string,
  apiKey: string | undefined,
  path: string,
  queryString?: string,
): Promise<void> {
  if (!apiKey) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'API not configured on server' }));
    return;
  }

  const method = req.method ?? 'GET';
  const url = `${upstreamBase.replace(/\/$/, '')}/${path}${queryString ?? ''}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
  };

  const contentType = req.headers['content-type'];
  if (contentType) {
    headers['Content-Type'] = contentType;
  }

  const body =
    method === 'GET' || method === 'HEAD' ? undefined : await readRequestBody(req);

  const upstream = await fetch(url, { method, headers, body });

  res.statusCode = upstream.status;
  upstream.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'content-encoding') return;
    res.setHeader(key, value);
  });

  const responseBody = Buffer.from(await upstream.arrayBuffer());
  res.end(responseBody);
}

export function pathFromQuery(pathParam: string | string[] | undefined): string {
  if (Array.isArray(pathParam)) return pathParam.join('/');
  return pathParam ?? '';
}
