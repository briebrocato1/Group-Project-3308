import re

# Read data from the input file
with open('routes_data.txt', 'r') as file:
    data = file.read()

# Define a regex pattern to extract fields
field_pattern = re.compile(r"'((?:[^']|'')*)'|(-?\d+\.\d+|-?\d+|true|false)", re.IGNORECASE)

# Configuration: Expected number of fields
EXPECTED_FIELDS = 15

# Extract rows using parentheses
rows = re.findall(r"\((.*?)\)", data)

# Initialize a list to store valid rows
valid_rows = []

# Step 1: Process each row
for idx, row in enumerate(rows, start=1):
    # Extract fields using the regex pattern
    fields = [match[0] if match[0] else match[1] for match in field_pattern.findall(row)]

    # Convert boolean values to lowercase strings ('true', 'false')
    fields = [field.lower() if field in ['true', 'false'] else field for field in fields]

    # Handle cases where the row has fewer fields than expected
    if len(fields) < EXPECTED_FIELDS:
        print(f"Error: Row {idx} has {len(fields)} fields (expected {EXPECTED_FIELDS}). Attempting to fix...")

        # Try to fix rows with one missing field
        if len(fields) + 1 == EXPECTED_FIELDS:
            fields.append('')  # Append an empty field to balance it
        else:
            print(f"Skipping row {idx} due to incorrect field count.")
            continue

    # Handle rows with too many fields by merging excess into the last field
    if len(fields) > EXPECTED_FIELDS:
        corrected_fields = fields[:EXPECTED_FIELDS - 1]
        corrected_fields.append(" ".join(fields[EXPECTED_FIELDS - 1:]))
        fields = corrected_fields

    # Ensure the row now has exactly the expected number of fields
    if len(fields) == EXPECTED_FIELDS:
        valid_rows.append(fields)

# Step 2: Write SQL insert statements for cleaned rows
with open('cleaned_routes_insert.sql', 'w') as f:
    for fields in valid_rows:
        # Escape single quotes for SQL compatibility
        fields = [field.replace("'", "''") if isinstance(field, str) else field for field in fields]

        # Construct the INSERT statement with explicit column names
        sql_values = []
        for field in fields:
            if isinstance(field, str):
                # For string fields, ensure proper escaping for SQL
                sql_values.append(f"'{field}'")
            else:
                # For non-string fields, just add them as they are
                sql_values.append(str(field))
        
        # Combine the column names and values
        sql_statement = f"INSERT INTO routes (routeName, grade, safety, sport, trad, toprope, boulder, snow, alpine, " \
                        f"firstAscent, description, location, areaLongitude, areaLatitude, areaName) VALUES " \
                        f"({', '.join(sql_values)});"

        f.write(sql_statement + "\n")

print("SQL statements have been saved to 'cleaned_routes_insert.sql'.")
