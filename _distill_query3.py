import sqlite3
import json
from datetime import datetime, timedelta

DB_PATH = r'C:\Users\msi\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Sessions in this project
print("=== SESSIONS IN PORTFOLIO PROJECT ===")
cur.execute("""
    SELECT id, title, directory, time_created, time_updated
    FROM session
    WHERE directory = 'C:\\Users\\msi\\Desktop\\portfolio'
    ORDER BY time_created
""")
sessions = []
for row in cur.fetchall():
    ts = datetime.utcfromtimestamp(row['time_created']/1000).isoformat()
    sessions.append(row['id'])
    print(f"  {row['id']}: {row['title'][:80]} [{ts}]")

# All sessions
print("\n=== ALL SESSIONS ===")
cur.execute("SELECT id, title, directory, time_created FROM session ORDER BY time_created")
for row in cur.fetchall():
    ts = datetime.utcfromtimestamp(row['time_created']/1000).isoformat()
    print(f"  {row['id']}: {row['title'][:60]} | dir={row['directory'][:50]} [{ts}]")

# Messages per session with content preview
print("\n=== MESSAGES PER SESSION (portfolio) ===")
for sid in sessions:
    print(f"\n--- Session: {sid} ---")
    cur.execute("""
        SELECT m.id, m.agent_id, json_extract(m.data, '$.role') as role,
               json_extract(m.data, '$.content') as content,
               m.time_created
        FROM message m
        WHERE m.session_id = ?
        ORDER BY m.time_created
    """, (sid,))
    for row in cur.fetchall():
        role = row['role']
        content = (row['content'] or '')[:150]
        print(f"  {row['id']} [{role}] (agent={row['agent_id']}): {content}")

# Tool calls per session
print("\n=== TOOL CALLS PER SESSION (portfolio) ===")
for sid in sessions:
    print(f"\n--- Session: {sid} ---")
    cur.execute("""
        SELECT json_extract(p.data, '$.tool') as tool,
               substr(json_extract(p.data, '$.state.input'), 1, 300) as input_preview,
               m.id as msg_id
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
          AND json_extract(m.data, '$.role') = 'assistant'
          AND json_extract(p.data, '$.type') = 'tool'
        ORDER BY m.time_created
    """, (sid,))
    count = 0
    for row in cur.fetchall():
        count += 1
        tool = row['tool']
        inp = (row['input_preview'] or '')[:150]
        print(f"  [{tool}] {inp}")
    if count == 0:
        print("  (no tool calls)")

# Parts breakdown per session
print("\n=== PART TYPES PER SESSION ===")
for sid in sessions:
    cur.execute("""
        SELECT json_extract(p.data, '$.type') as ptype, count(*) as n
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE m.session_id = ?
        GROUP BY ptype
    """, (sid,))
    types = {row['ptype']: row['n'] for row in cur.fetchall()}
    print(f"  {sid}: {types}")

# Tasks
print("\n=== ALL TASKS ===")
cur.execute("SELECT * FROM task")
for row in cur.fetchall():
    print(f"  Task {row['id']}: session={row['session_id']} status={row['status']} summary={str(row['summary'])[:100]}")

# Task events
print("\n=== TASK EVENTS ===")
cur.execute("SELECT * FROM task_event LIMIT 20")
for row in cur.fetchall():
    print(f"  {row['id']}: task={row['task_id']} event_type={row['event_type']} time={row['time_created']}")

conn.close()
