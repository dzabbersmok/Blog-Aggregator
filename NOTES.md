Database connection string
psql "postgres://postgres:postgres1988@localhost:5432/gator"

Before submitting your final answer, you need to manually clean your database:

    Connect to your database:
        Mac: psql postgres
        Linux: sudo -u postgres psql

    Switch to your gator database:

    \c gator

Clear the users table:

TRUNCATE users;

Verify it's empty:

SELECT * FROM users;

(Should show no rows)

Exit psql:

\q

Now submit your tests:

bootdev run 93a9da27-b9ed-484f-bbf0-f45f1a9610da -s

This ensures the tests start with a completely empty users table, just like they expect!