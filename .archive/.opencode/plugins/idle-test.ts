import type { Plugin } from "@opencode-ai/plugin"
import { appendFile } from "fs/promises"

const LOG_FILE = "idle-test-log.txt"

async function log(directory: string, event: string, data?: any) {
  const timestamp = new Date().toISOString()
  const entry = `[${timestamp}] ${event}${data ? ': ' + JSON.stringify(data) : ''}\n`
  console.log(`[EVENT-LOGGER] ${event}`, data || '')
  await appendFile(`${directory}/${LOG_FILE}`, entry)
}

export default async ({ directory }: Parameters<Plugin>[0]) => {
  return {
    // === SESSION EVENTS (official) ===
    "session.created": async (input: any) => {
      await log(directory, "session.created", { sessionId: input?.session?.sessionId })
    },

    "session.idle": async (input: any) => {
      await log(directory, "session.idle", input)
    },

    "session.error": async (input: any) => {
      await log(directory, "session.error", { error: input?.error?.message || input?.error })
    },

    "session.compacted": async (input: any) => {
      await log(directory, "session.compacted", input)
    },

    "session.deleted": async (input: any) => {
      await log(directory, "session.deleted", input)
    },

    "session.diff": async (input: any) => {
      await log(directory, "session.diff", input)
    },

    "session.status": async (input: any) => {
      await log(directory, "session.status", input)
    },

    "session.updated": async (input: any) => {
      await log(directory, "session.updated", input)
    },

    // === FILE EVENTS (official) ===
    "file.edited": async (input: any) => {
      await log(directory, "file.edited", { filePath: input?.filePath })
    },

    "file.watcher.updated": async (input: any) => {
      await log(directory, "file.watcher.updated", input)
    },

    // === COMMAND EVENTS (official) ===
    "command.executed": async (input: any) => {
      await log(directory, "command.executed", { command: input?.command })
    },

    // === MESSAGE EVENTS (official) ===
    "message.updated": async (input: any) => {
      await log(directory, "message.updated", { role: input?.message?.role, id: input?.message?.id })
    },

    "message.removed": async (input: any) => {
      await log(directory, "message.removed", input)
    },

    "message.part.updated": async (input: any) => {
      await log(directory, "message.part.updated", input)
    },

    "message.part.removed": async (input: any) => {
      await log(directory, "message.part.removed", input)
    },

    // === TOOL EVENTS (official) ===
    "tool.execute.before": async (input: any, output: any) => {
      await log(directory, "tool.execute.before", { tool: input?.tool })
    },

    "tool.execute.after": async (input: any, output: any) => {
      await log(directory, "tool.execute.after", { tool: input?.tool })
    },

    "tool.execute": async (input: any, output: any) => {
      await log(directory, "tool.execute", { tool: input?.tool })
    },

    // === TODO EVENTS (official) ===
    "todo.updated": async (input: any) => {
      await log(directory, "todo.updated", { count: input?.todos?.length })
    },

    // === LSP EVENTS (official) ===
    "lsp.client.diagnostics": async (input: any) => {
      await log(directory, "lsp.client.diagnostics", input)
    },

    "lsp.updated": async (input: any) => {
      await log(directory, "lsp.updated", input)
    },

    // === PERMISSION EVENTS (official) ===
    "permission.asked": async (input: any) => {
      await log(directory, "permission.asked", input)
    },

    "permission.replied": async (input: any) => {
      await log(directory, "permission.replied", input)
    },

    // === SERVER EVENTS (official) ===
    "server.connected": async (input: any) => {
      await log(directory, "server.connected", input)
    },

    // === SHELL EVENTS (official) ===
    "shell.env": async (input: any, output: any) => {
      await log(directory, "shell.env", { cwd: input?.cwd })
    },

    // === INSTALLATION EVENTS (official) ===
    "installation.updated": async (input: any) => {
      await log(directory, "installation.updated", input)
    },

    // === TUI EVENTS (official) ===
    "tui.prompt.append": async (input: any) => {
      await log(directory, "tui.prompt.append", input)
    },

    "tui.command.execute": async (input: any) => {
      await log(directory, "tui.command.execute", input)
    },

    "tui.toast.show": async (input: any) => {
      await log(directory, "tui.toast.show", input)
    },

    // === EXPERIMENTAL HOOKS (official) ===
    "experimental.chat.system.transform": async (input: any, output: any) => {
      await log(directory, "experimental.chat.system.transform", {})
    },

    "experimental.session.compacting": async (input: any, output: any) => {
      await log(directory, "experimental.session.compacting", { sessionId: input?.sessionId })
    },

    // === POTENTIAL/LEGACY HOOKS (unofficial, may not fire) ===
    // These come from community sources - may be outdated or renamed
    
    // Conversation aliases (possibly legacy names for session events)
    "conversation.create": async (input: any) => {
      await log(directory, "conversation.create", input)
    },

    "conversation.destroy": async (input: any) => {
      await log(directory, "conversation.destroy", input)
    },

    "conversation.start": async (input: any) => {
      await log(directory, "conversation.start", input)
    },

    "conversation.end": async (input: any) => {
      await log(directory, "conversation.end", input)
    },

    // LLM hooks (possibly experimental or removed)
    "llm.invoke": async (input: any, output: any) => {
      await log(directory, "llm.invoke", { model: input?.model })
    },

    "llm.invoke.after": async (input: any, output: any) => {
      await log(directory, "llm.invoke.after", { model: input?.model })
    },

    // === CATCH-ALL for any undocumented events ===
    "event": async (input: any) => {
      await log(directory, `event:${input?.event?.type || 'unknown'}`, input)
    }
  }
}
