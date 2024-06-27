-- CreateTable
CREATE TABLE "counter" (
    "id" INTEGER NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "counter_pkey" PRIMARY KEY ("id")
);
