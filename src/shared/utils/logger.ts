// deno-lint-ignore-file no-explicit-any
import { styles } from "ansi_styles";

export enum LogLevel {
  DEBUG,
  INFO,
  WARNING,
  ERROR,
  CRITICAL
}

interface LoggerDependencies {
  requestId: string;
  logLevel: LogLevel
}


export class Logger {
  constructor(private readonly dependencies: LoggerDependencies) {}

  public debug(...args: any[]) {
    return this.log(styles.color.white, LogLevel.DEBUG, ...args);
  }

  public info(...args: any[]) {
    return this.log(styles.color.blue, LogLevel.INFO, ...args);
  }

  public warning(...args: any[]) {
    return this.log(styles.color.yellow, LogLevel.WARNING, ...args);
  }

  public error(...args: any[]) {
    return this.log(styles.color.red, LogLevel.ERROR, ...args);
  }

  public critical(...args: any[]) {
    return this.log(styles.color.redBright, LogLevel.CRITICAL, ...args);
  }

  private log(color: { open: string, close: string }, level: LogLevel , ...args: any[]) {
    const { logLevel, requestId } = this.dependencies;
    if (level < logLevel) return;

    const format = {
      timestamp: new Date(),
      requestId,
      level,
      message: args.join(', '),
    }

    console.log(color.open, JSON.stringify(format), color.close);
  }

}