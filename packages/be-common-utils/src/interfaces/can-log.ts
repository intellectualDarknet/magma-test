export interface CanLog {
  warn(message: any, ...optionalParams: any[]): void
  error(message: any, ...optionalParams: any[]): void
  log(message: any, ...optionalParams: any[]): void
}
