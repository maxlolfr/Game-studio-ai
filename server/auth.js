import { timingSafeEqual } from 'node:crypto';

export function secureEquals(a,b) {
  const left=Buffer.from(String(a));
  const right=Buffer.from(String(b));
  return left.length===right.length && timingSafeEqual(left,right);
}
export function authorized(header,user,password) {
  if (!user || !password) return false;
  if (typeof header!=='string' || !header.startsWith('Basic ')) return false;
  try {
    const raw=Buffer.from(header.slice(6),'base64').toString('utf8');
    const sep=raw.indexOf(':');
    return sep>=0 && secureEquals(raw.slice(0,sep),user) && secureEquals(raw.slice(sep+1),password);
  } catch {return false;}
}
