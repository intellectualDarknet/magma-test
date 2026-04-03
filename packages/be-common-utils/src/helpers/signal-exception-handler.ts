import { CanLog } from '../interfaces/can-log'

export function signalExceptionHandler<T extends CanLog>(logger: T) {
  const signalsNames: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGHUP']

  signalsNames.forEach((signalName) => {
    process.on(signalName, () => {
      logger.log(`Received signal: ${signalName}, shutting down application.`)
      process.exit(0)
    })
  })

  process.on('uncaughtException', (error: Error) => {
    logger.error(`Uncaught Exception: ${error.message}`, { error })
    process.exit(1)
  })

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Promise Rejection, reason: ${reason}`, { promise })
    promise.catch((err: Error) => {
      logger.error(`Error in Unhandled Rejection: ${err.message}`, { err })
      process.exit(1)
    })
  })
}
