import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class extends BaseSeeder {
  async run(): Promise<void> {
    await db.table('users').multiInsert([
      {
        full_name: 'Jan Novák',
        email: 'jan.novak@example.com',
        password: 'password123',
      },
      {
        full_name: 'Eva Svobodová',
        email: 'eva.svobodova@example.com',
        password: 'password123',
      },
    ])
  }
}
