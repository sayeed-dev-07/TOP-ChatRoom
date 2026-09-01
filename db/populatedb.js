const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 ),
   is_admin BOOLEAN,
   is_member BOOLEAN,
   first_name VARCHAR ( 255 ),
   last_name VARCHAR ( 255 ),
);

INSERT INTO users (username, password, is_admin, is_member, first_name, last_name) 
VALUES
  ('sayeed', '664651', false, false, 'Sayeed', 'Shorif');
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
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();
