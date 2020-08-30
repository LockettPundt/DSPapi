
export default function loggingMiddleware(req: any, res: any, next: Function) {
  console.log('Here is the users ip:', req.ip);
  next();
}

