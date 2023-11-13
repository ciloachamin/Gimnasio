import { z } from 'zod';

// Esquema Zod para la tabla 'public.attendance'
export const attendanceSchema = z.object({
  att_id: z.number({
    required_error: 'El campo att_id es obligatorio',
    invalid_type_error: 'El campo att_id debe ser un número entero',
  }),
  pla_id: z.number({
    required_error: 'El campo pla_id es obligatorio',
    invalid_type_error: 'El campo pla_id debe ser un número entero',
  }),
  mem_id: z.number({
    required_error: 'El campo mem_id es obligatorio',
    invalid_type_error: 'El campo mem_id debe ser un número entero',
  }),
  att_entry: z.string().datetime({
    required_error: 'El campo att_entry es obligatorio',
    invalid_type_error: 'El campo att_entry debe ser una fecha',
  }),
  att_exit: z.string().datetime({
    required_error: 'El campo att_exit es obligatorio',
    invalid_type_error: 'El campo att_exit debe ser una fecha',
  }),
});
