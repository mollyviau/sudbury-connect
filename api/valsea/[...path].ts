import type { VercelRequest, VercelResponse } from '@vercel/node';
import { pathFromQuery, proxyConfig, proxyUpstream } from '../_proxy';

export { proxyConfig as config };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = pathFromQuery(req.query.path);
  const queryString =
    req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : undefined;

  await proxyUpstream(
    req,
    res,
    'https://api.valsea.ai',
    process.env.VALSEA_API_KEY,
    path,
    queryString,
  );
}
