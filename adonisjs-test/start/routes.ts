/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/admin/users_controller'

router.on('/').render('pages/home').as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').render('pages/dashboard').as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())


router
  .group(() => {
    router.get('/users', [UsersController, 'index']).as('admin.users.index')
    router.get('/users/create', [UsersController, 'create']).as('admin.users.create')
    router.post('/users', [UsersController, 'store']).as('admin.users.store')
    router.get('/users/:id/edit', [UsersController, 'edit']).as('admin.users.edit')
    router.put('/users/:id', [UsersController, 'update']).as('admin.users.update')
    router.delete('/users/:id', [UsersController, 'destroy']).as('admin.users.destroy')
  })
  .prefix('admin')
