import sqlite3
import json
from datetime import datetime, timedelta

DB_PATH = r'C:\Users\msi\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# 1. Tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in cur.fetchall()]
print("=== TABLES ===")
print(tables)

# 2. Session overview
print("\n=== SESSIONS ===")
cur.execute("SELECT id, data FROM session")
for row in cur.fetchall():
    data = json.loads(row['data'])
    title = data.get('title', 'untitled')
    directory = data.get('directory', 'unknown')
    print(f"  {row['id']}: {title} [{directory}]")

# 3. Message count per session
print("\n=== MESSAGE COUNT PER SESSION ===")
cur.execute("""
    SELECT session_id, 
           SUM(CASE WHEN json_extract(data, '$.role') = 'user' THEN 1 ELSE 0 END) as user_msgs,
           SUM(CASE WHEN json_extract(data, '$.role') = 'assistant' THEN 1 ELSE 0 END) as asst_msgs
    FROM message
    GROUP BY session_id
""")
for row in cur.fetchall():
    print(f"  {row['session_id']}: user={row['user_msgs']}, assistant={row['asst_msgs']}")

# 4. 30-day cutoff
cutoff = datetime.utcnow() - timedelta(days=30)
cutoff_ms = int(cutoff.timestamp() * 1000)
print(f"\n=== CUTOFF (30 days): {cutoff.isoformat()} / {cutoff_ms} ms ===")

# 5. Tool usage in recent sessions
print("\n=== TOOL USAGE (last 30 days) ===")
cur.execute("""
    SELECT json_extract(p.data, '$.tool') as tool,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND m.time_created > ?
    GROUP BY tool
    ORDER BY n DESC
    LIMIT 30
""", (cutoff_ms,))
for row in cur.fetchall():
    print(f"  {row['tool']}: {row['n']}")

# 6. Most common tool input patterns
print("\n=== TOOL INPUT PATTERNS (top 50) ===")
cur.execute("""
    SELECT json_extract(p.data, '$.tool') as tool,
           substr(json_extract(p.data, '$.state.input'), 1, 200) as input_preview,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND m.time_created > ?
    GROUP BY tool, input_preview
    ORDER BY n DESC
    LIMIT 50
""", (cutoff_ms,))
for row in cur.fetchall():
    print(f"  [{row['n']}x] {row['tool']}: {row['input_preview'][:150]}")

# 7. User messages with repeat keywords
print("\n=== USER MESSAGES WITH REPEAT KEYWORDS ===")
cur.execute("""
    SELECT m.session_id, substr(json_extract(m.data, '$.content'), 1, 300) as content
    FROM message m
    WHERE json_extract(m.data, '$.role') = 'user'
      AND m.time_created > ?
    ORDER BY m.time_created
""", (cutoff_ms,))
keywords = ['again', 'every time', 'like last time', 'the usual', 'repeat', 'same as before',
            'workflow', 'automate', 'repeatedly', 'pattern', 'standard']
for row in cur.fetchall():
    content = (row['content'] or '').lower()
    if any(kw in content for kw in keywords):
        print(f"  [{row['session_id']}] {(row['content'] or '')[:200]}")

# 8. Text parts mentioning common patterns
print("\n=== ASSISTANT TEXT PARTS MENTIONING WORKFLOW PATTERNS ===")
cur.execute("""
    SELECT m.session_id, substr(json_extract(p.data, '$.text'), 1, 300) as text_preview
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'text'
      AND m.time_created > ?
    ORDER BY m.time_created
    LIMIT 200
""", (cutoff_ms,))
for row in cur.fetchall():
    text = (row['text_preview'] or '').lower()
    if any(kw in text for kw in ['repeated', 'pattern', 'workflow', 'reusable', 'always do', 'standard']):
        print(f"  [{row['session_id']}] {(row['text_preview'] or '')[:200]}")

# 9. Tasks
print("\n=== TASKS ===")
try:
    cur.execute("SELECT id, session_id, data FROM task LIMIT 20")
    for row in cur.fetchall():
        data = json.loads(row['data'])
        print(f"  {row['id']}: session={row['session_id']} state={data.get('state','?')} title={data.get('title','?')[:80]}")
except Exception as e:
    print(f"  (no task table or error: {e})")

# 10. Actor registry (subagents)
print("\n=== ACTOR REGISTRY ===")
try:
    cur.execute("SELECT * FROM actor_registry LIMIT 20")
    for row in cur.fetchall():
        print(f"  {dict(row)}")
except Exception as e:
    print(f"  (no actor_registry table or error: {e})")

# 11. Part types breakdown
print("\n=== PART TYPES (last 30 days) ===")
cur.execute("""
    SELECT json_extract(p.data, '$.type') as ptype, count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.time_created > ?
    GROUP BY ptype
    ORDER BY n DESC
""", (cutoff_ms,))
for row in cur.fetchall():
    print(f"  {row['ptype']}: {row['n']}")

conn.close()
