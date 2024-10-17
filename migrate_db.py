import sqlite3
import pandas as pd
from sqlalchemy import create_engine

# Define paths to SQLite and PostgreSQL
sqlite_path = 'Election.db'  # Replace with your SQLite DB path
postgres_url = "postgresql+psycopg2://postgres:wtf123DTF123@localhost:5432/icai_dashboard"

# Connect to SQLite
sqlite_conn = sqlite3.connect(sqlite_path)

# Create a PostgreSQL engine
pg_engine = create_engine(postgres_url)

# Function to migrate a table from SQLite to PostgreSQL
def migrate_table(table_name, pg_table_name):
    print(f"Migrating {table_name}...")
    # Read data from SQLite
    df = pd.read_sql(f"SELECT * FROM {table_name}", sqlite_conn)
    print(f"Found {len(df)} records in {table_name}.")
    
    # Write data to PostgreSQL
    df.to_sql(pg_table_name, pg_engine, if_exists='replace', index=False)
    print(f"Successfully migrated {table_name} to PostgreSQL as {pg_table_name}.")

# Migrate both tables
migrate_table('Summary', 'summary')
migrate_table('Western_Indian', 'western_indian')

# Close the SQLite connection
sqlite_conn.close()
print("Migration completed successfully.")
