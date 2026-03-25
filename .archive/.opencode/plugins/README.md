# OpenCode Plugins

This directory contains custom plugins for OpenCode.

## Plugins

### llmngn (Long-term Memory Engine)

A persistent context memory plugin that stores and retrieves development session knowledge across sessions using LanceDB vector storage.

**Features:**
- Stores context types: `file_change`, `decision`, `debt`, `task`, `architecture`, `command`
- Vector embeddings for semantic search (768 dimensions)
- Configurable retention policies per context type
- Sensitive data redaction (API keys, passwords, secrets)
- Optional LLM-powered extraction of structured context
- Injects prior session context into system prompts

**Configuration (`llmngn.json`):**

| Option | Default | Description |
|--------|---------|-------------|
| `enabled` | `true` | Enable/disable the plugin |
| `embeddingModel` | `nomic-embed-text` | Model for embeddings |
| `embeddingProvider` | `local` | Provider: `local`, `openai`, `ollama` |
| `lancedbPath` | `.lancedb` | Database storage path |
| `retentionDays` | `180` | Default retention period |
| `salienceDecay` | `0.95` | Salience decay factor |
| `llm.enabled` | `false` | Enable LLM extraction |
| `llm.provider` | `openai` | LLM provider |
| `llm.model` | `gpt-4o-mini` | LLM model |
| `debug` | `true` | Enable debug logging |

**Hooks Used:**
- `experimental.chat.system.transform` - Injects context into prompts
- `session.created` - Captures session ID
- `session.idle` - Persists accumulated context
- `session.error` - Captures errors as technical debt
- `file.edited` - Tracks file changes
- `command.executed` - Tracks command history
- `message.updated` - Extracts decisions/tasks from assistant responses
- `todo.updated` - Tracks todo items
- `tool.execute.after` - Captures tool usage
- `experimental.session.compacting` - Preserves key context during compaction

---

### idle-test

A diagnostic plugin for testing and debugging OpenCode event hooks.

**Purpose:**
- Logs all event hook invocations to console and file
- Helps verify which events fire and with what data
- Useful for plugin development

**Output:** Creates `idle-test-log.txt` in the project root with timestamps.

**Hooks Monitored:**
- `session.created`
- `session.idle`
- `session.error`
- `file.edited`
- `command.executed`
- `message.updated`
- `todo.updated`
- `tool.execute.before`
- `tool.execute.after`
- `experimental.chat.system.transform`
- `experimental.session.compacting`

---

## Adding New Plugins

1. Create a `.ts` file in this directory
2. Export a default async function accepting `{ project, client, directory }`
3. Return an object with hook handlers
4. Optionally add a `.json` config file with the same basename
