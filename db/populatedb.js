const { Client } = require("pg");
const { hash } = require("bcryptjs");

async function main() {
    console.log("seeding...");

    const databaseUrl = process.argv[2];

    if (!databaseUrl) {
        console.error("Database URL is required.");
        process.exit(1);
    }

    const client = new Client({
        connectionString: databaseUrl,
    });

    try {

        const hashedPassword = await hash("664651", 10);


        const SEED_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255),
  password VARCHAR(255),
  is_admin BOOLEAN,
  is_member BOOLEAN,
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255),
  message TEXT,
  img_link TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (
  username,
  password,
  is_admin,
  is_member,
  first_name,
  last_name
) 
VALUES (
  'sayeed',
  '${hashedPassword}',
  false,
  false, 
  'sayeed',
  'shorif'
);

INSERT INTO messages (title, message, img_link, user_id)
VALUES (
  'Self-Discovery and Knowing Your Worth',
  'Embracing time alone is essential for knowing yourself, belonging to oneself, becoming comfortable in your own skin, and recognizing the universe within. Explore the full statements in the referenced documents.',
  'https://i.pinimg.com/736x/df/a4/2d/dfa42dd7c9d6148b624c8f8d63085bb4.jpg',
  1
);
`;

        await client.connect();
        await client.query(SEED_SQL);

        console.log("done");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.end();
    }
}

main();