import {db} from '@sst-org-app/core/db'
import { Time } from "@sst-org-app/core/time";
import seedUsers from '@sst-org-app/core/seed/users'

export const handler = async () => {
  try {
    await seedUsers()
  } catch (e) {
    console.log('Error when seeding users', e)
  }
}
