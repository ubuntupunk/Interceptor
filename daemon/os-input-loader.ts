const IS_WIN = process.platform === "win32"
const IS_MAC = process.platform === "darwin"

const mod = IS_WIN
  ? await import("./os-input-win")
  : IS_MAC
  ? await import("./os-input")
  : await import("./os-input-linux")

export const { osClick, osKey, osType, osMove, generateBezierPath, translateCoords } = mod
