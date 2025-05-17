// routes.ts

import BooksController from '#controllers/books_controller'
import StudentsController from '#controllers/students_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return { halo: 'nisrina' }
})

// INI UNTUK BOOKS
router
  .group(() => {
    router.get('/', [BooksController, 'index'])
    router.post('/', [BooksController, 'store'])
    router.get('/:id', [BooksController, 'show'])
    router.put('/:id', [BooksController, 'update'])
    router.delete('/:id', [BooksController, 'destroy'])
  })
  .prefix('/books') // ← INI AKSESNYA DI Thunder Client: http://localhost:3333/books

// INI UNTUK STUDENTS
router
  .group(() => {
    router.get('/', [StudentsController, 'index'])
    router.post('/', [StudentsController, 'store'])
    router.get('/:id', [StudentsController, 'show'])
    router.put('/:id', [StudentsController, 'update'])
    router.delete('/:id', [StudentsController, 'destroy'])
  })
  .prefix('/students') // ← INI AKSESNYA DI Thunder Client: http://localhost:3333/students
