DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AuthonUsersTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" "role" DEFAULT 'user'
);
