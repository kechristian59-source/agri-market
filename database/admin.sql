-- Run after database/schema.sql. Creates no admin by itself.
-- Use the secure script backend/scripts/create-admin.mjs to create the first admin.
create index if not exists users_role_idx on users(role);
