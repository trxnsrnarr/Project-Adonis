import type { HttpContext } from '@adonisjs/core/http'
import BookValidator from '#validators/book'
import Book from '#models/book'

export default class BooksController {
    public async index({response}: HttpContext) {
        const books = await Book.all();
        return response.ok(books);
    }

    public async store(ctx: HttpContext) {
        const validator = new BookValidator(ctx)
      
        const data = await ctx.request.validate({
          schema: validator.schema,
          messages: validator.messages, 
        })
      
        const book = await Book.create(data)
        return ctx.response.created({
          message: 'Buku berhasil ditambahkan',
          data: book,
        })
      }
      
    public async show({params, response}: HttpContext) {
        const books =await Book.find(params.id);
        if (!books) {
            return response.notFound({message: 'Buku tidak ditemukan'});
        }
        return response.ok(books);
    }

    public async update({ params, request, response, }: HttpContext) {
        const book = await Book.find(params.id)
        if (!book) {
          return response.notFound({ message: 'Buku tidak ditemukan' })
        }
      
        const validator = new BookValidator({ request, response, params } as HttpContext)
        const data = await request.validate({
          schema: validator.schema,
          messages: validator.messages,
        })
      
        book.merge(data)
        await book.save()
        return response.ok(book)
      }      

    public async destroy({params, response}: HttpContext) {
            const books =await Book.find(params.id);
            if (!books) {
                return response.notFound({message: 'Buku tidak ditemukan'});
            }
            await books.delete();
            return response.noContent();
        }
}