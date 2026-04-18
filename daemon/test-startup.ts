#!/usr/bin/env bun

// Minimal daemon test
import { unlinkSync, existsSync } from "node:fs"
import { osClick, osKey, osType, osMove, generateBezierPath, translateCoords } from "./os-input-loader"
import { IS_WIN, SOCKET_PATH, IPC_PORT, PID_PATH, LOG_PATH, EVENTS_PATH, WS_PORT, EVENTS_MAX_SIZE, transportLabel } from "../shared/platform"

console.log("Testing daemon imports...")
console.log("Platform:", process.platform)
console.log("IS_WIN:", IS_WIN)
console.log("SOCKET_PATH:", SOCKET_PATH)

const STANDALONE = process.argv.includes("--standalone")
console.log("STANDALONE mode:", STANDALONE)

// Test socket cleanup
try {
  if (existsSync(SOCKET_PATH)) {
    unlinkSync(SOCKET_PATH)
    console.log("Cleaned up existing socket")
  }
} catch (e) {
  console.log("Socket cleanup error:", e.message)
}

console.log("Daemon test completed successfully")