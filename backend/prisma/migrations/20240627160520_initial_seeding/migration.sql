-- AlterTable
CREATE SEQUENCE counter_id_seq;
ALTER TABLE "counter" ALTER COLUMN "id" SET DEFAULT nextval('counter_id_seq');
ALTER SEQUENCE counter_id_seq OWNED BY "counter"."id";
