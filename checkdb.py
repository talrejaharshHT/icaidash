import sqlite3

# Path to your SQLite database
sqlite_path = 'Election.db'  # Replace with your path

# Connect to SQLite
conn = sqlite3.connect(sqlite_path)
cursor = conn.cursor()

# List all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("Tables in SQLite database:", tables)

conn.close()
