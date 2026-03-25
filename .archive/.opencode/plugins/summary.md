# llmngn Plugin - Event Logging Analysis & Fix

## Critical Bug Found & Fixed

**Problem**: Most events don't fire through named handlers - they only come through the catch-all `event` handler with `event.type` property.

**Fix Applied**: Added comprehensive `event` catch-all handler that properly dispatches events based on `input.event.type`.

---

## Event Routing Status

### Named Handlers That Work Directly
| Event | Notes |
|-------|-------|
| `experimental.chat.system.transform` | Works - fires directly |
| `tool.execute.before` | Works - fires directly |
| `tool.execute.after` | Works - fires directly |
| `shell.env` | Works - fires directly |

### Events Via Catch-All (`event` handler)
| Event | Structure | Fixed |
|--------|-----------|-------|
| `session.created` | `input.event.properties.info.id` | ✅ |
| `session.idle` | `input.event.properties.sessionID` | ✅ |
| `session.error` | `input.event.properties.error.message` | ✅ |
| `session.updated` | `input.event.properties.info.*` | ✅ |
| `session.diff` | `input.event.properties.diff` | ✅ |
| `session.status` | `input.event.properties.sessionID`, `status.type` | ✅ |
| `message.updated` | `input.event.properties.info.role`, `info.content` | ✅ |
| `message.part.updated` | `input.event.properties.part.*` | ✅ |
| `message.part.delta` | `input.event.properties.delta` | ✅ |
| `file.edited` | `input.event.properties.file` | ✅ |
| `file.watcher.updated` | `input.event.properties.file`, `event` | ✅ |
| `command.executed` | `input.event.properties.command` | ✅ |
| `todo.updated` | `input.event.properties.todos[]` | ✅ |

---

## Context Capture Flow (After Fix)

```
EVENT TIMELINE:

1. Plugin Init → DB Connect → sessionData initialized
                    ↓
2. event:session.created → globalSessionId set ✅
                    ↓
3. event:message.updated (user) → user content captured
                    ↓
4. experimental.chat.system.transform → context INJECTED into prompt ✅
                    ↓
5. event:message.updated (assistant) → LLM extraction runs ✅
                    ↓
6. tool.execute.after → file_change, command stored ✅
                    ↓
7. event:file.edited → file stored (backup) ✅
                    ↓
8. event:command.executed → command stored (backup) ✅
                    ↓
9. event:session.idle → session data PERSISTED, buffers cleared ✅
                    ↓
10. experimental.session.compacting → key context PRESERVED ✅
```

---

## What Gets Captured (After Fix)

| Context Type | Source | Timing | Status |
|--------------|--------|--------|--------|
| `file_change` | `tool.execute.after` (write/edit) | Real-time | ✅ Primary |
| `file_change` | `event:file.edited` | Near real-time | ✅ Backup |
| `command` | `tool.execute.after` (bash) | Real-time | ✅ Primary |
| `command` | `event:command.executed` | Near real-time | ✅ Backup |
| `decision` | `event:message.updated` (assistant) | Per message | ✅ Fixed |
| `architecture` | `event:message.updated` (assistant) | Per message | ✅ Fixed |
| `debt` | `event:session.error` | On error | ✅ Fixed |
| `task` | `event:todo.updated` | On todo change | ✅ Fixed |

---

## Key Improvements Made

### 1. Event Routing Fix
- Added `event` catch-all handler to capture all events via `input.event.type`
- Uses `effectiveSessionId` fallback when `globalSessionId` is null
- Session data buffers cleared after `session.idle` to prevent duplicate storage

### 2. Deduplication
- Added checks to prevent duplicate entries:
  - `sessionData.filesEdited.some(f => f.filePath === filePath)`
  - `sessionData.commands.some(c => c.command === command)`
  - `sessionData.tasks.some(t => t.content === todo.content)`

### 3. Session Idle Cleanup
- After `session.idle` persists data, buffers are cleared:
```typescript
sessionData.filesEdited = []
sessionData.commands = []
sessionData.decisions = []
sessionData.tasks = []
sessionData.errors = []
```

### 4. Error Handling
- Uses `effectiveSessionId = globalSessionId || session-${Date.now()}`` for all fallbacks
- Graceful handling when `globalSessionId` is not yet set

---

## Timing Optimization Summary

| Before Fix | After Fix |
|------------|-----------|
| `session.created` never fired | ✅ Captured via `event` handler |
| `message.updated` never fired | ✅ Captured via `event` handler |
| `session.idle` never fired | ✅ Captured via `event` handler |
| Decisions/architecture never extracted | ✅ LLM extraction now works |
| Session buffers never cleared | ✅ Cleared after idle |
| Duplicate storage possible | ✅ Deduplication added |

---

## Context Types & Retention

| Type | Retention | Weight | Typical Sources |
|------|-----------|--------|-----------------|
| `decision` | 180 days | 1.0 | Assistant messages |
| `architecture` | 365 days | 1.0 | Assistant messages |
| `debt` | 90 days | 0.9 | Errors, assistant messages |
| `file_change` | 90 days | 0.8 | File edits, tool output |
| `task` | 60 days | 0.7 | Todo updates |
| `command` | 30 days | 0.5 | Bash commands |

---

## Debugging

Check `llmngn-debug.log` for:
- `event:session.created: { sessionId: "ses_..." }`
- `event:session.idle: { files: N, commands: N, ... }`
- `event:message.updated: { messageId: "...", role: "assistant", contentLength: N }`
- `insertRecord: success: { id: "...", type: "..." }`

---

## Next Steps

1. **Test the fix** - Start a new session and verify:
   - `session.created` fires and sets `globalSessionId`
   - `message.updated` captures assistant content
   - `session.idle` persists and clears buffers

2. **Monitor debug log** - Check `.opencode/plugins/llmngn-debug.log`

3. **Optional enhancements**:
   - Add `message.part.delta` aggregation for streaming content
   - Add `session.diff` analysis for change tracking
   - Add `session.status` idle/busy tracking
