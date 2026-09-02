const { Client } = require("pg");
const { hash } = require("bcryptjs");

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(255),
  password VARCHAR(255),
  is_admin BOOLEAN,
  is_member BOOLEAN,
  first_name VARCHAR(255),
  last_name VARCHAR(255)
);
`;

const INSERT_USER_SQL = `
INSERT INTO users (
  username,
  password,
  is_admin,
  is_member,
  first_name,
  last_name
) 
VALUES ($1, $2, $3, $4, $5, $6);
`;

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
        const password = await hash("664651", 10);

        await client.connect();
        await client.query(CREATE_TABLE_SQL);
        await client.query(INSERT_USER_SQL, [
            "sayeed",
            password,
            false,
            false,
            "Sayeed",
            "Shorif",
        ]);

        console.log("done");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await client.end();
    }
}

main();