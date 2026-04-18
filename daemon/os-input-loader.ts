const IS_WIN = process.platform === "win32"
const IS_MAC = process.platform === "darwin"

// Static exports - no dynamic imports
export async function osClick(
  screenX: number,
  screenY: number,
  button: "left" | "right" = "left",
  clickCount: number = 1
): Promise<{ success: boolean; error?: string }> {
  if (IS_MAC) {
    const { osClick } = await import("./os-input")
    return osClick(screenX, screenY, button, clickCount)
  }
  // Linux/Windows: no-op
  console.log(`osClick(${screenX}, ${screenY}, ${button}, ${clickCount}) - no-op on ${process.platform}`)
  return { success: true }
}

export async function osKey(
  key: string,
  modifiers: string[] = []
): Promise<{ success: boolean; error?: string }> {
  if (IS_MAC) {
    const { osKey } = await import("./os-input")
    return osKey(key, modifiers)
  }
  // Linux/Windows: no-op
  console.log(`osKey(${key}, ${modifiers}) - no-op on ${process.platform}`)
  return { success: true }
}

export async function osType(text: string): Promise<{ success: boolean; error?: string }> {
  if (IS_MAC) {
    const { osType } = await import("./os-input")
    return osType(text)
  }
  // Linux/Windows: no-op
  console.log(`osType(${text}) - no-op on ${process.platform}`)
  return { success: true }
}

export async function osMove(
  points: Array<{ x: number; y: number }>,
  durationMs: number = 100
): Promise<{ success: boolean; error?: string }> {
  if (IS_MAC) {
    const { osMove } = await import("./os-input")
    return osMove(points, durationMs)
  }
  // Linux/Windows: no-op
  console.log(`osMove(${JSON.stringify(points)}, ${durationMs}) - no-op on ${process.platform}`)
  return { success: true }
}

export function generateBezierPath(startX: number, startY: number, endX: number, endY: number): Array<{x: number, y: number}> {
  if (IS_MAC) {
    // Would need to import if macOS had different implementation
  }
  // Simple linear path for all platforms
  return [{x: startX, y: startY}, {x: endX, y: endY}]
}

export function translateCoords(x: number, y: number, fromWindowId?: number): {x: number, y: number} {
  // No translation needed on any platform for now
  return {x, y}
}
