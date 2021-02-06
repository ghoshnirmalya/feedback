# Migration `20210206040036-adds-description-to-team`

This migration has been generated by Nirmalya Ghosh at 2/6/2021, 9:30:36 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Team" ADD COLUMN     "description" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210205183152-adds-user-teams-model..20210206040036-adds-description-to-team
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
@@ -75,15 +75,16 @@
   coordinateY Float
 }
 model Team {
-  id        Int         @id @default(autoincrement())
-  createdAt DateTime    @default(now())
-  updatedAt DateTime    @updatedAt
-  projects  Project[]
-  name      String
-  UserTeams UserTeams[]
-  User      User[]
+  id          Int         @id @default(autoincrement())
+  createdAt   DateTime    @default(now())
+  updatedAt   DateTime    @updatedAt
+  projects    Project[]
+  name        String
+  description String?
+  UserTeams   UserTeams[]
+  User        User[]
 }
 model UserTeams {
   id     Int   @id @default(autoincrement())
```

