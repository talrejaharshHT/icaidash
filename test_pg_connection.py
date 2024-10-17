import psycopg2

# Connection details
conn = psycopg2.connect(
    dbname="icai_dashboard",
    user="postgres",
    password="securepassword",
    host="localhost",
    port="5432"
)

# Test the connection
cur = conn.cursor()
cur.execute("SELECT * FROM voters;")
rows = cur.fetchall()

print("Voters Data:", rows)

# Close connection
cur.close()
conn.close()
