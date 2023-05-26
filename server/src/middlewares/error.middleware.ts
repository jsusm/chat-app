import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

export function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  if(error instanceof ZodError) {
    res.status(400)
    res.json({
      status: 400,
      error: error.format(),
    })
    return
  }
  console.log(error)
  res.status(500)
  res.json({
    status: 500,
    error: 'Something went wrong.'
  })
}
