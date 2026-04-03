export { LoggerModule, Logger } from 'nestjs-pino'

export const pinoForRootConfig = {
  pinoHttp: {
    base: undefined,
    formatters: {
      level(label: string, _: number) {
        return { level: label }
      },
    },
    redact: {
      paths: [
        'res.headers',
        'req.id',
        'req.method',
        'req.url',
        'req.query',
        'req.params',
        'req.headers.accept',
        'req.headers.connection',
        'req.headers["content-length"]',
        'req.headers["accept-encoding"]',
        'req.headers.cookie',
        'req.headers.authorization',
        'req.headers.host',
        'req.remoteAddress',
        'req.remotePort',
      ],
      remove: true,
    },
  },
}
