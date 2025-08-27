-- CreateTable
CREATE TABLE "public"."Reader" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Reader_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Author" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "unpublished" BOOLEAN NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "author" TEXT NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReaderAuthor" (
    "postId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReaderAuthor_pkey" PRIMARY KEY ("postId","commentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reader_email_key" ON "public"."Reader"("email");

-- AddForeignKey
ALTER TABLE "public"."ReaderAuthor" ADD CONSTRAINT "ReaderAuthor_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ReaderAuthor" ADD CONSTRAINT "ReaderAuthor_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "public"."Reader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
