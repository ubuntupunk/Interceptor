// Linux-only: simplified exports
// Removed macOS/Windows support for smaller bundle size and faster startup

export async function osClick(
  screenX: number,
  screenY: number,
  button: "left" | "right" = "left",
  clickCount: number = 1
): Promise<{ success: boolean; error?: string }> {
  // Linux: no-op (browser handles input)
  console.log(`osClick(${screenX}, ${screenY}, ${button}, ${clickCount}) - no-op on Linux`)
  return { success: true }
}

export async function osKey(
  key: string,
  modifiers: string[] = []
): Promise<{ success: boolean; error?: string }> {
  // Linux: no-op (browser handles input)
  console.log(`osKey(${key}, ${modifiers}) - no-op on Linux`)
  return { success: true }
}

export async function osType(text: string): Promise<{ success: boolean; error?: string }> {
  // Linux: no-op (browser handles input)
  console.log(`osType(${text}) - no-op on Linux`)
  return { success: true }
}

export async function osMove(
  points: Array<{ x: number; y: number }>,
  durationMs: number = 100
): Promise<{ success: boolean; error?: string }> {
  // Linux: no-op (browser handles input)
  console.log(`osMove(${JSON.stringify(points)}, ${durationMs}) - no-op on Linux`)
  return { success: true }
}

export function generateBezierPath(startX: number, startY: number, endX: number, endY: number): Array<{x: number, y: number}> {
  // Simple linear path
  return [{x: startX, y: startY}, {x: endX, y: endY}]
}

export function translateCoords(x: number, y: number, fromWindowId?: number): {x: number, y: number} {
  // No translation needed on Linux
  return {x, y}
}
