import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        fullName: 'Jan Novák',
        email: 'jan.novak@example.com',
        password: 'password123',
      },
      {
        fullName: 'Eva Svobodová',
        email: 'eva.svobodova@example.com',
        password: 'password123',
      },
    ])
  }
}
