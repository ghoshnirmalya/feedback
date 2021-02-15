# Migration `20210209175200-changes-id-to-uuid-for-all-models`

This migration has been generated by Nirmalya Ghosh at 2/9/2021, 11:22:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_fileId_fkey"

ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey"

ALTER TABLE "File" DROP CONSTRAINT "File_projectId_fkey"

ALTER TABLE "Project" DROP CONSTRAINT "Project_teamId_fkey"

ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey"

ALTER TABLE "User" DROP CONSTRAINT "User_teamId_fkey"

ALTER TABLE "UserTeams" DROP CONSTRAINT "UserTeams_teamId_fkey"

ALTER TABLE "UserTeams" DROP CONSTRAINT "UserTeams_userId_fkey"

ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_A_fkey"

ALTER TABLE "_TeamToUser" DROP CONSTRAINT "_TeamToUser_B_fkey"

ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fileId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Comment_id_seq"

ALTER TABLE "File" DROP CONSTRAINT "File_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "projectId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "File_id_seq"

ALTER TABLE "Project" DROP CONSTRAINT "Project_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Project_id_seq"

ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Session_id_seq"

ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq"

ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq"

ALTER TABLE "UserTeams" DROP CONSTRAINT "UserTeams_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD PRIMARY KEY ("id");
DROP SEQUENCE "UserTeams_id_seq"

ALTER TABLE "_TeamToUser" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT

ALTER TABLE "Comment" ADD FOREIGN KEY("fileId")REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Comment" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "File" ADD FOREIGN KEY("projectId")REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "Project" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "Session" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "User" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "UserTeams" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "UserTeams" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "_TeamToUser" ADD FOREIGN KEY("A")REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "_TeamToUser" ADD FOREIGN KEY("B")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210209140534-adds-oauth-specific-attributes-to-user-model..20210209175200-changes-id-to-uuid-for-all-models
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,9 +12,9 @@
 // --------------------------------------
 model User {
-  id        Int         @id @default(autoincrement())
+  id        String         @id @default(uuid())
   createdAt DateTime    @default(now())
   updatedAt DateTime    @updatedAt
   name      String
   email     String      @unique
@@ -22,63 +22,63 @@
   sessions  Session[]
   comments  Comment[]
   userTeams UserTeams[]
   teams     Team[]      @relation(fields: [teamId], references: [id])
-  teamId    Int?
+  teamId    String?
   avatar    String
 }
 model Session {
-  id                 Int       @id @default(autoincrement())
+  id                 String       @id @default(uuid())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   expiresAt          DateTime?
   handle             String    @unique
   user               User?     @relation(fields: [userId], references: [id])
-  userId             Int?
+  userId             String?
   hashedSessionToken String?
   antiCSRFToken      String?
   publicData         String?
   privateData        String?
 }
 model Project {
-  id        Int      @id @default(autoincrement())
+  id        String      @id @default(uuid())
   name      String
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   files     File[]
   team      Team?    @relation(fields: [teamId], references: [id])
-  teamId    Int?
+  teamId    String?
   isPublic  Boolean  @default(false)
 }
 model File {
-  id        Int       @id @default(autoincrement())
+  id        String       @id @default(uuid())
   name      String
   url       String
   createdAt DateTime  @default(now())
   updatedAt DateTime  @updatedAt
   project   Project   @relation(fields: [projectId], references: [id])
-  projectId Int
+  projectId String
   comments  Comment[]
 }
 model Comment {
-  id          Int      @id @default(autoincrement())
+  id          String      @id @default(uuid())
   body        String
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
   file        File     @relation(fields: [fileId], references: [id])
-  fileId      Int
+  fileId      String
   user        User     @relation(fields: [userId], references: [id])
-  userId      Int
+  userId      String
   coordinateX Float
   coordinateY Float
 }
 model Team {
-  id          Int         @id @default(autoincrement())
+  id          String         @id @default(uuid())
   createdAt   DateTime    @default(now())
   updatedAt   DateTime    @updatedAt
   projects    Project[]
   name        String
@@ -87,10 +87,10 @@
   users       User[]
 }
 model UserTeams {
-  id     Int   @id @default(autoincrement())
+  id     String   @id @default(uuid())
   user   User? @relation(fields: [userId], references: [id])
   team   Team? @relation(fields: [teamId], references: [id])
-  userId Int?
-  teamId Int?
+  userId String?
+  teamId String?
 }
```

