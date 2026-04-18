// Linux implementation - simplified for Linux-only build
// Browser handles all input, so these are no-ops

export async function osClick(
  screenX: number,
  screenY: number,
  button: "left" | "right" = "left",
  clickCount: number = 1
): Promise<{ success: boolean; error?: string }> {
  // No-op on Linux - browser handles clicks
  console.log(`osClick(${screenX}, ${screenY}, ${button}, ${clickCount}) - no-op on Linux`)
  return { success: true }
}

export async function osKey(
  key: string,
  modifiers: string[] = []
): Promise<{ success: boolean; error?: string }> {
  // No-op on Linux - browser handles keyboard
  console.log(`osKey(${key}, ${modifiers}) - no-op on Linux`)
  return { success: true }
}

export async function osType(text: string): Promise<{ success: boolean; error?: string }> {
  // No-op on Linux - browser handles typing
  console.log(`osType(${text}) - no-op on Linux`)
  return { success: true }
}

export async function osMove(
  points: Array<{ x: number; y: number }>,
  durationMs: number = 100
): Promise<{ success: boolean; error?: string }> {
  // No-op on Linux - browser handles mouse movement
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