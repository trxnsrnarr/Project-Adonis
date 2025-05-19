import type { HttpContext } from '@adonisjs/core/http'
import Student from '#models/student'
import { studentSchema } from '#validators/student'

export default class StudentsController {
  public async index({ response }: HttpContext) {
    const students = await Student.all()
    return response.ok({ data: students })
  }

  public async store({ request, response }: HttpContext) {
    const payload = await request.validate({
        schema: studentSchema,
        messages: {
          'name.minLength': 'Nama minimal 3 karakter',
          'name.maxLength': 'Nama maksimal 100 karakter',
          'name.required': 'Nama tidak boleh kosong',
          'class.minLength': 'Kelas minimal 1 karakter',
          'class.maxLength': 'Kelas maksimal 10 karakter',
          'class.required': 'Kelas tidak boleh kosong',
          'nis.minLength': 'NIS minimal 4 karakter',
          'nis.maxLength': 'NIS maksimal 20 karakter',
          'nis.regex': 'NIS harus berupa angka',
          'nis.required': 'NIS tidak boleh kosong',
          'gender.required': 'Gender tidak boleh kosong',
          'gender.enum': 'Gender harus berupa "L" atau "P"',
        },
      })      
  
    const student = await Student.create(payload)
    return response.created({ message: 'Siswa ditambahkan', data: student })
  }  

  public async show({ params, response }: HttpContext) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Siswa tidak ditemukan' })
    }
    return response.ok({ data: student })
  }

  public async update({ params, request, response }: HttpContext) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Siswa tidak ditemukan' })
    }
    const payload = await request.validate({
        schema: studentSchema,
        messages: {
          'name.minLength': 'Nama minimal 3 karakter',
          'name.maxLength': 'Nama maksimal 100 karakter',
          'class.minLength': 'Kelas minimal 1 karakter',
          'class.maxLength': 'Kelas maksimal 10 karakter',
          'nis.minLength': 'NIS minimal 4 karakter',
          'nis.maxLength': 'NIS maksimal 20 karakter',
          'nis.regex': 'NIS harus berupa angka',
          'gender.enum': 'Gender harus berupa "L" atau "P"',
        },
      })      
  
    student.merge(payload)
    await student.save()
    return response.ok({ message: 'Siswa diperbarui', data: student })
  }
  

  public async destroy({ params, response }: HttpContext) {
    const student = await Student.find(params.id)
    if (!student) {
      return response.notFound({ message: 'Siswa tidak ditemukan' })
    }
    await student.delete()
    return response.ok({ message: 'Siswa dihapus' })
  }
}
