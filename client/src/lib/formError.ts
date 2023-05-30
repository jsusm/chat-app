export type FormError<T extends Record<string, any>> = {
  error?: string,
  fieldError?: {
    [key in keyof T]?: string
  }
}

export type ApiFormError<Schema extends Record<string, any>> = {
  "message"?: string,
  "error"?: {
    [key in keyof Schema]?: {
      "_errors": string[]
    }
  }
}

export function parseFormError<Schema extends Record<string, any>>(error: ApiFormError<Schema>): FormError<Schema> {
  const out: FormError<Schema> = {}
  if (error.message) {
    out.error = error.message
  }
  if (error.error) {
    out.fieldError = {}
    for (const key in error.error) {
      if (!error.error[key]._errors) continue
      const err = error.error[key]._errors[0]
      if (err) out.fieldError[key] = err
    }
  }
  console.log(out)
  return out
}
