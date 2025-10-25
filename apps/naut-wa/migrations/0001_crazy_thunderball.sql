CREATE TABLE "Message" (
	"id" serial PRIMARY KEY NOT NULL,
	"message" text NOT NULL,
	"role" varchar(191) NOT NULL,
	"userId" varchar(191) NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"inputTokens" integer,
	"outputTokens" integer
);
--> statement-breakpoint
ALTER TABLE "User" ADD COLUMN "conversationState" varchar(191) DEFAULT 'greeting';--> statement-breakpoint
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE cascade;