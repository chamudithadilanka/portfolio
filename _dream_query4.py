import sqlite3
import json

DB = r"C:\Users\msi\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Get all text content from the distill session
SID2 = 'ses_0b0390750ffeM5SKcM3uYFY8Tm'
print(f"=== TEXT CONTENT FROM DISTILL SESSION ===\n")

c.execute("""
    SELECT m.id as msg_id, m.agent_id, m.time_created,
           p.data as part_data
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = ?
      AND json_extract(p.data, '$.type') = 'text'
    ORDER BY m.time_created
""", (SID2,))

for r in c.fetchall():
    part = json.loads(r['part_data'])
    text = part.get('text', '')
    print(f"--- msg={r['msg_id']} ---")
    print(text[:3000])
    print()

# Now check the Auto Dream session
print("\n\n=== TEXT CONTENT FROM AUTO DREAM SESSION ===\n")
SID3 = 'ses_0b0390759ffePTf9OGH4mQmcOE'

c.execute("""
    SELECT m.id as msg_id, m.agent_id, m.time_created,
           p.data as part_data
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = ?
      AND json_extract(p.data, '$.type') = 'text'
    ORDER BY m.time_created
""", (SID3,))

for r in c.fetchall():
    part = json.loads(r['part_data'])
    text = part.get('text', '')
    print(f"--- msg={r['msg_id']} ---")
    print(text[:3000])
    print()

# Get final text from the main portfolio session
print("\n\n=== FINAL TEXT FROM PORTFOLIO SESSION ===\n")
SID1 = 'ses_0b039079affez7ScaQOZ4F3rMX'

c.execute("""
    SELECT m.id as msg_id, m.agent_id, m.time_created,
           p.data as part_data
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE m.session_id = ?
      AND json_extract(p.data, '$.type') = 'text'
    ORDER BY m.time_created DESC
    LIMIT 5
""", (SID1,))

for r in c.fetchall():
    part = json.loads(r['part_data'])
    text = part.get('text', '')
    print(f"--- msg={r['msg_id']} ---")
    print(text[:3000])
    print()

conn.close()
