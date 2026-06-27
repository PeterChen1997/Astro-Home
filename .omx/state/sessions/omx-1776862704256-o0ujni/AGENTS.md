<!-- OMX:RUNTIME:START -->
<session_context>
**Session:** omx-1776862704256-o0ujni | 2026-04-22T12:58:31.162Z

**Codebase Map:**
  src/: config, env.d, utils
  src/components/: Comments, DropdownMenu.stories, DropdownMenu, DropdownMenuItem, Subscribe, ThemeToggleButton, ViewedCount, VisitedCount
  src/libs/: readingTime
  src/pages/: rss.xml
  src/stories/: Button.stories, Button, Header.stories, Header, Page.stories, Page
  public/: debug
  (root): astro.config, postcss.config
  .storybook/: main, preview

**Explore Command Preference:** enabled via `USE_OMX_EXPLORE_CMD` (default-on; opt out with `0`, `false`, `no`, or `off`)
- Advisory steering only: agents SHOULD treat `omx explore` as the default first stop for direct inspection and SHOULD reserve `omx sparkshell` for qualifying read-only shell-native tasks.
- For simple file/symbol lookups, use `omx explore` FIRST before attempting full code analysis.
- When the user asks for a simple read-only exploration task (file/symbol/pattern/relationship lookup), strongly prefer `omx explore` as the default surface.
- Explore examples: `omx explore...

**Compaction Protocol:**
Before context compaction, preserve critical state:
1. Write progress checkpoint via state_write MCP tool
2. Save key decisions to notepad via notepad_write_working
3. If context is >80% full, proactively checkpoint state
</session_context>
<!-- OMX:RUNTIME:END -->
