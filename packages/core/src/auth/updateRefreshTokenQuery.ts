import {db, dbSchema} from '../db'
import {eq} from 'drizzle-orm/expressions'

export default async function updateRefreshTokenQuery({ tokenId, updates } : { tokenId: string, updates: object }) {
  return db.update(dbSchema.tokens)
    .set(updates)
    .where(eq(dbSchema.tokens.id, Number(tokenId)))
}
