-- 1. Add the rating column to the routes table if it doesn’t already exist.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'routes' AND column_name = 'rating') THEN
        ALTER TABLE routes
        ADD COLUMN rating DECIMAL(2,1) DEFAULT NULL;
    END IF;
END $$;

-- 2. Create the reviews table only if it doesn’t already exist.
CREATE TABLE IF NOT EXISTS reviews (
    review_id SERIAL PRIMARY KEY,
    route_id INT REFERENCES routes(id),
    user_id INT, -- assuming there's a users table with unique user IDs
    rating INT CHECK (rating BETWEEN 1 AND 5)
);

-- 3. Calculate average ratings per route and update the rating column in routes.
WITH avg_ratings AS (
    SELECT route_id, AVG(rating)::DECIMAL(2,1) AS avg_rating
    FROM reviews
    GROUP BY route_id
)
UPDATE routes
SET rating = avg_ratings.avg_rating
FROM avg_ratings
WHERE routes.id = avg_ratings.route_id;
