import sqlite3
import json
from datetime import datetime

DB_PATH = r'C:\Users\msi\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Get user messages with full content
print("=== USER MESSAGES (all sessions) ===")
cur.execute("""
    SELECT m.id, m.session_id, json_extract(m.data, '$.role') as role,
           json_extract(m.data, '$.content') as content,
           m.time_created
    FROM message m
    WHERE json_extract(m.data, '$.role') = 'user'
    ORDER BY m.time_created
""")
for row in cur.fetchall():
    content = row['content'] or ''
    print(f"\n--- {row['session_id']} [{datetime.utcfromtimestamp(row['time_created']/1000).isoformat()}] ---")
    print(content[:500])

# Get assistant text parts (not tool calls) for workflow analysis
print("\n\n=== ASSISTANT TEXT CONTENT (portfolio sessions) ===")
portfolio_sessions = [
    'ses_0b039079affez7ScaQOZ4F3rMX',
    'ses_0b0390759ffePTf9OGH4mQmcOE',
    'ses_0b0390750ffeM5SKcM3uYFY8Tm'
]
for sid in portfolio_sessions:
    print(f"\n--- Session: {sid} ---")
    cur.execute("""
        SELECT m.id, json_extract(p.data, '$.text') as text
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(m.data, '$.role') = 'assistant'
          AND json_extract(p.data, '$.type') = 'text'
        ORDER BY m.time_created
    """, (sid,))
    for row in cur.fetchall():
        text = row['text'] or ''
        if len(text) > 10:
            print(f"  [{row['id']}] {text[:300]}")

# Get ALL tool call sequences to find repeated patterns
print("\n\n=== FULL TOOL CALL SEQUENCES (portfolio sessions) ===")
for sid in portfolio_sessions:
    print(f"\n--- Session: {sid} ---")
    cur.execute("""
        SELECT json_extract(m.data, '$.role') as role,
               json_extract(p.data, '$.type') as ptype,
               json_extract(p.data, '$.tool') as tool,
               json_extract(p.data, '$.state.input') as input_data,
               json_extract(p.data, '$.state.output') as output_data,
               json_extract(p.data, '$.text') as text
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
        ORDER BY m.time_created
    """, (sid,))
    step = 0
    for row in cur.fetchall():
        ptype = row['ptype']
        if ptype == 'step-start':
            step += 1
            print(f"\n  [Step {step}]")
        elif ptype == 'tool':
            tool = row['tool']
            inp = (row['input_data'] or '')[:150]
            out = (row['output_data'] or '')[:100]
            print(f"    {tool}: {inp}")
            if out and out != 'null':
                print(f"      → {out[:80]}")
        elif ptype == 'text':
            text = (row['text'] or '')[:200]
            if text.strip():
                print(f"    TEXT: {text}")

# Check if there are sessions outside this project
print("\n\n=== SESSIONS NOT IN PORTFOLIO ===")
cur.execute("""
    SELECT id, title, directory, time_created
    FROM session
    WHERE directory != 'C:\\Users\\msi\\Desktop\\portfolio'
""")
for row in cur.fetchall():
    ts = datetime.utcfromtimestamp(row['time_created']/1000).isoformat()
    print(f"  {row['id']}: {row['title'][:60]} | dir={row['directory'][:60]} [{ts}]")

conn.close()
