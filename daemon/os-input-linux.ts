// Linux implementation - stub for now since we don't need OS-level input on Linux
// The daemon communicates with the browser extension via native messaging

export function osClick(x: number, y: number, button = 0): void {
  // No-op on Linux - browser handles clicks
  console.log(`osClick(${x}, ${y}, ${button}) - no-op on Linux`)
}

export function osKey(key: string, down: boolean): void {
  // No-op on Linux - browser handles keyboard
  console.log(`osKey(${key}, ${down}) - no-op on Linux`)
}

export function osType(text: string): void {
  // No-op on Linux - browser handles typing
  console.log(`osType(${text}) - no-op on Linux`)
}

export function osMove(x: number, y: number): void {
  // No-op on Linux - browser handles mouse movement
  console.log(`osMove(${x}, ${y}) - no-op on Linux`)
}

export function generateBezierPath(startX: number, startY: number, endX: number, endY: number): Array<{x: number, y: number}> {
  // Simple linear path for now
  return [{x: startX, y: startY}, {x: endX, y: endY}]
}

export function translateCoords(x: number, y: number, fromWindowId?: number): {x: number, y: number} {
  // No translation needed on Linux
  return {x, y}
}