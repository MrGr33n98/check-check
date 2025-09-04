export function logError(error: any, message?: string) {
  if (error.name === 'AbortError') {
    return;
  }

  if (message) {
    console.error(message, error);
  } else {
    console.error(error);
  }
}
