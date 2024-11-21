#!/bin/bash

# DO NOT PUSH THIS FILE TO GITHUB
# This file contains sensitive information and should be kept private

# TODO: Set your PostgreSQL URI - Use the External Database URL from the Render dashboard
PG_URI="postgresql://boulderingbuffs:wGpwedZTI26bBeoq03lSUGVrHR97yTL3@dpg-csvrb00gph6c73fp8io0-a.oregon-postgres.render.com/routes_db"

# Execute each .sql file in the directory
for file in init_data/*.sql; do
    echo "Executing $file..."
    psql $PG_URI -f "$file"
done