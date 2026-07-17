import sqlite3
import json

DB = r"C:\Users\msi\.local\share\mimocode\mimocode.db"
conn = sqlite3.connect(DB)
conn.row_factory = sqlite3.Row
c = conn.cursor()

# Get the remaining parts of session ses_0b039079affez7ScaQOZ4F3rMX
SESSION_ID = 'ses_0b039079affez7ScaQOZ4F3rMX'

print(f"=== REMAINING PARTS: {SESSION_ID} ===\n")

c.execute("""
    SELECT m.id as msg_id, m.agent_id, m.time_created, m.data as msg_data,
           p.id as part_id, p.data as part_data
    FROM message m
    LEFT JOIN part p ON p.message_id = m.id
    WHERE m.session_id = ?
      AND m.time_created > 1783749946000
    ORDER BY m.time_created, p.time_created
""", (SESSION_ID,))

current_msg = None
for r in c.fetchall():
    msg_data = json.loads(r['msg_data']) if r['msg_data'] else {}
    role = msg_data.get('role', '?')
    
    if r['msg_id'] != current_msg:
        current_msg = r['msg_id']
        print(f"\n--- Message {r['msg_id']} | role={role} | agent={r['agent_id']} ---")
    
    if r['part_data']:
        part = json.loads(r['part_data'])
        ptype = part.get('type', '?')
        
        if ptype == 'text':
            text = part.get('text', '')[:1000]
            print(f"  [text] {text}")
        elif ptype == 'tool':
            tool = part.get('tool', '?')
            state = part.get('state', {})
            inp = str(state.get('input', ''))[:300]
            out = str(state.get('output', ''))[:500]
            print(f"  [tool:{tool}] input={inp}")
            if out:
                print(f"         output={out}")
        elif ptype == 'step-start':
            print(f"  [step-start]")
        elif ptype == 'step-finish':
            tokens = part.get('tokens', '?')
            print(f"  [step-finish] tokens={tokens}")
        elif ptype == 'reasoning':
            text = part.get('text', '')[:500]
            print(f"  [reasoning] {text}")
        else:
            preview = str(part)[:300]
            print(f"  [{ptype}] {preview}")

# Now check the "Auto Distill" session
print("\n\n=== SESSION: ses_0b0390750ffeM5SKcM3uYFY8Tm (Auto Distill) ===\n")
SID2 = 'ses_0b0390750ffeM5SKcM3uYFY8Tm'

c.execute("""
    SELECT m.id as msg_id, m.agent_id, m.time_created, m.data as msg_data,
           p.id as part_id, p.data as part_data
    FROM message m
    LEFT JOIN part p ON p.message_id = m.id
    WHERE m.session_id = ?
    ORDER BY m.time_created, p.time_created
""", (SID2,))

current_msg = None
for r in c.fetchall():
    msg_data = json.loads(r['msg_data']) if r['msg_data'] else {}
    role = msg_data.get('role', '?')
    
    if r['msg_id'] != current_msg:
        current_msg = r['msg_id']
        print(f"\n--- Message {r['msg_id']} | role={role} | agent={r['agent_id']} ---")
    
    if r['part_data']:
        part = json.loads(r['part_data'])
        ptype = part.get('type', '?')
        
        if ptype == 'text':
            text = part.get('text', '')[:1500]
            print(f"  [text] {text}")
        elif ptype == 'tool':
            tool = part.get('tool', '?')
            state = part.get('state', {})
            inp = str(state.get('input', ''))[:400]
            out = str(state.get('output', ''))[:600]
            print(f"  [tool:{tool}] input={inp}")
            if out:
                print(f"         output={out}")
        elif ptype == 'step-start':
            print(f"  [step-start]")
        elif ptype == 'step-finish':
            tokens = part.get('tokens', '?')
            print(f"  [step-finish] tokens={tokens}")
        elif ptype == 'reasoning':
            text = part.get('text', '')[:500]
            print(f"  [reasoning] {text}")
        else:
            preview = str(part)[:300]
            print(f"  [{ptype}] {preview}")

conn.close()
