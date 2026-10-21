import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  // Výpis všech uživatelů
  async index({ view }: HttpContext) {
    // Načteme uživatele seřazené podle ID vzestupně (od nejnižšího/nejstaršího po nejvyšší)
    const usersData = await User.query().orderBy('id', 'asc')

    const users = usersData.map((user, index) => {
      return {
        ...user.toJSON(),
        rowNumber: index + 1
      }
    })

    return view.render('pages/admin/users/index', { users })
  }

  // Formulář pro nového uživatele
  async create({ view }: HttpContext) {
    return view.render('pages/admin/users/create')
  }

  // Uložení nového uživatele
  async store({ request, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password'])
    await User.create(data)
    return response.redirect().toRoute('admin.users.index')
  }

  // Formulář pro úpravu uživatele
  async edit({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return view.render('pages/admin/users/edit', { user })
  }

  // Aktualizace uživatele
  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['fullName', 'email'])

    // Pokud bylo zadáno nové heslo, aktualizujeme ho
    const password = request.input('password')
    if (password) {
      data.password = password
    }

    user.merge(data)
    await user.save()

    return response.redirect().toRoute('admin.users.index')
  }

  // Smazání uživatele
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.redirect().toRoute('admin.users.index')
  }
}
