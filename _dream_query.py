import sqlite3
import json

DB = r"C:\Users\msi\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# List projects
print("=== PROJECTS ===")
c.execute("PRAGMA table_info(project)")
cols = [r['name'] for r in c.fetchall()]
print(f"  columns: {cols}")
c.execute("SELECT * FROM project")
for r in c.fetchall():
    print(f"  id={r['id']} | name={r['name']} | worktree={r['worktree']}")

# List messages for portfolio sessions (last 7 days)
print("\n=== PORTFOLIO SESSION MESSAGES ===")
portfolio_sessions = [
    'ses_0b0390759ffePTf9OGH4mQmcOE',
    'ses_0b0390750ffeM5SKcM3uYFY8Tm',
    'ses_0b039079affez7ScaQOZ4F3rMX',
    'ses_0b0386b90ffef50kVNGWTJnxjH',
]

for sid in portfolio_sessions:
    c.execute("SELECT id, agent_id, time_created, time_updated FROM message WHERE session_id=? ORDER BY time_created", (sid,))
    msgs = c.fetchall()
    print(f"\n  Session {sid}: {len(msgs)} messages")
    for m in msgs:
        print(f"    msg={m['id']} agent_id={m['agent_id']} created={m['time_created']} updated={m['time_updated']}")

conn.close()
