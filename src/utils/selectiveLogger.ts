// utils/selectiveLogger.ts
// Utility for selective logging that ignores AbortError

export class SelectiveLogger {
  static error(message: string, ...optionalParams: any[]) {
    // Don't log AbortError messages
    if (message.includes('AbortError') || 
        (optionalParams.length > 0 && 
         typeof optionalParams[0] === 'object' && 
         optionalParams[0]?.name === 'AbortError')) {
      return;
    }
    
    console.error(message, ...optionalParams);
  }

  static warn(message: string, ...optionalParams: any[]) {
    // Don't log AbortError warnings
    if (message.includes('AbortError') || 
        (optionalParams.length > 0 && 
         typeof optionalParams[0] === 'object' && 
         optionalParams[0]?.name === 'AbortError')) {
      return;
    }
    
    console.warn(message, ...optionalParams);
  }

  static info(message: string, ...optionalParams: any[]) {
    console.info(message, ...optionalParams);
  }

  static log(message: string, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }
}

// Helper function to check if an error is an AbortError
export function isAbortError(error: any): boolean {
  return error && (error.name === 'AbortError' || error.code === 20);
}