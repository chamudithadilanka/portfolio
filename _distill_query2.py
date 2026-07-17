import sqlite3
import json

DB_PATH = r'C:\Users\msi\.local\share\mimocode\mimocode.db'
conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# Check session schema
cur.execute("PRAGMA table_info(session)")
print("=== SESSION SCHEMA ===")
for row in cur.fetchall():
    print(f"  {row['name']} ({row['type']})")

# Check message schema
cur.execute("PRAGMA table_info(message)")
print("\n=== MESSAGE SCHEMA ===")
for row in cur.fetchall():
    print(f"  {row['name']} ({row['type']})")

# Check part schema
cur.execute("PRAGMA table_info(part)")
print("\n=== PART SCHEMA ===")
for row in cur.fetchall():
    print(f"  {row['name']} ({row['type']})")

# Check task schema
cur.execute("PRAGMA table_info(task)")
print("\n=== TASK SCHEMA ===")
for row in cur.fetchall():
    print(f"  {row['name']} ({row['type']})")

# Get session data
print("\n=== SESSIONS ===")
cur.execute("SELECT * FROM session")
for row in cur.fetchall():
    print(f"  Session ID: {row['id']}")
    # Print all columns except binary/large ones
    for key in row.keys():
        if key in ('id',):
            continue
        val = row[key]
        if isinstance(val, (str, int, float)) and val:
            print(f"    {key}: {str(val)[:200]}")

# Get sample message to understand data format
print("\n=== SAMPLE MESSAGE ===")
cur.execute("SELECT * FROM message LIMIT 1")
row = cur.fetchone()
if row:
    for key in row.keys():
        print(f"  {key}: {str(row[key])[:300]}")

conn.close()
