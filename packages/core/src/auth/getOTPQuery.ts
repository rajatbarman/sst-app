import {db, dbSchema} from '../db'
import {eq, desc} from 'drizzle-orm/expressions'

export default async function getOTPQuery({email} : {email: string}) {
  return db.select()
    .from(dbSchema.usersOTP)
    .where(eq(dbSchema.usersOTP.email, email))
    .orderBy(desc(dbSchema.usersOTP.createdAt))
    .limit(1)
}
