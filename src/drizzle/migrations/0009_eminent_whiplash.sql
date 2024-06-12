ALTER TABLE "AuthonUsersTable" ADD COLUMN "userId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AuthonUsersTable" ADD CONSTRAINT "AuthonUsersTable_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
