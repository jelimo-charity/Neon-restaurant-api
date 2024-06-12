ALTER TABLE "AuthonUsersTable" RENAME TO "AuthUsersTable";--> statement-breakpoint
ALTER TABLE "AuthUsersTable" DROP CONSTRAINT "AuthonUsersTable_userId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AuthUsersTable" ADD CONSTRAINT "AuthUsersTable_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
