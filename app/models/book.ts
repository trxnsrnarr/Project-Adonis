import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  declare id: number | undefined

  @column()
  declare title: string | undefined

  @column()
  declare author: string | undefined

  @column({ columnName: 'categoryId' })
  declare categoryId: string | undefined

  @column()
  declare description: string | undefined

  @column()
  declare cover: string |undefined

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}