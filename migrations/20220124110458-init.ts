import { Model } from "denodb";

export class Init20220124110458 {

    async up(client: any): Promise<void> {
        await client.queryObject(`DROP TABLE IF EXISTS "users";`);

        await client.queryObject(`DROP SEQUENCE IF EXISTS users_id_seq;`);

        await client.queryObject(`CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;`);
        await client.queryObject(`CREATE TABLE "public"."users" (
            "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
            "username" character varying(128) NOT NULL,
            "email" character varying(128) NOT NULL,
            CONSTRAINT "users_email" UNIQUE ("email"),
            CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
            CONSTRAINT "users_username" UNIQUE ("username")
        ) WITH (oids = false);`);
    }

    async down(client: any): Promise<void> {
    }
}