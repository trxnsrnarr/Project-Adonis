import { schema, rules } from '@adonisjs/validator'

export const studentSchema = schema.create({
  name: schema.string({}, [
    rules.minLength(3),
    rules.maxLength(100),
  ]),
  class: schema.string({}, [
    rules.minLength(1),
    rules.maxLength(10),
  ]),
  nis: schema.string({}, [
    rules.minLength(4),
    rules.maxLength(20),
    rules.regex(/^\d+$/),
  ]),
  gender: schema.enum(['L', 'P']),
})
