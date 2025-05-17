import { schema, rules } from '@adonisjs/validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    title: schema.string({}, [
      rules.maxLength(100),
    ]),
    author: schema.string({}, [
      rules.maxLength(100),
    ]),
    categoryId: schema.string(),
    description: schema.string.optional(),
    cover: schema.string.optional(),
  })

  public messages = {
    'title.required': 'Judul buku wajib diisi',
    'title.maxLength': 'Judul buku maksimal 100 karakter',
    'author.required': 'Nama penulis wajib diisi',
    'author.maxLength': 'Nama penulis maksimal 100 karakter',
    'categoryId.required': 'Kategori buku wajib diisi',
  }
}
