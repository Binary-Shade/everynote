/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export declare const createTRPCContext: (opts: {
    headers: Headers;
}) => Promise<{
    session: {
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined;
        };
    } | null;
    db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof import("@acme/db/schema")> & {
        $client: import("drizzle-orm/node-postgres").NodePgClient;
    };
}>;
/**
 * Create a server-side caller
 * @see https://trpc.io/docs/server/server-side-calls
 */
export declare const createCallerFactory: <TRecord extends import("@trpc/server").RouterRecord>(router: Pick<import("@trpc/server/unstable-core-do-not-import").Router<{
    ctx: {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            };
            user: {
                id: string;
                email: string;
                emailVerified: boolean;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined;
            };
        } | null;
        db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof import("@acme/db/schema")> & {
            $client: import("drizzle-orm/node-postgres").NodePgClient;
        };
    };
    meta: object;
    errorShape: {
        data: {
            zodError: import("zod").typeToFlattenedError<any, string> | null;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
            httpStatus: number;
            path?: string;
            stack?: string;
        };
        message: string;
        code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
    };
    transformer: true;
}, TRecord>, "_def">) => import("@trpc/server/unstable-core-do-not-import").RouterCaller<{
    ctx: {
        session: {
            session: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                expiresAt: Date;
                token: string;
                ipAddress?: string | null | undefined;
                userAgent?: string | null | undefined;
            };
            user: {
                id: string;
                email: string;
                emailVerified: boolean;
                name: string;
                createdAt: Date;
                updatedAt: Date;
                image?: string | null | undefined;
            };
        } | null;
        db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof import("@acme/db/schema")> & {
            $client: import("drizzle-orm/node-postgres").NodePgClient;
        };
    };
    meta: object;
    errorShape: {
        data: {
            zodError: import("zod").typeToFlattenedError<any, string> | null;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
            httpStatus: number;
            path?: string;
            stack?: string;
        };
        message: string;
        code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
    };
    transformer: true;
}, TRecord>;
/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */
/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export declare const createTRPCRouter: {
    <TInput extends import("@trpc/server").RouterRecord>(input: TInput): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            session: {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: {
                    id: string;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined;
                };
            } | null;
            db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof import("@acme/db/schema")> & {
                $client: import("drizzle-orm/node-postgres").NodePgClient;
            };
        };
        meta: object;
        errorShape: {
            data: {
                zodError: import("zod").typeToFlattenedError<any, string> | null;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, TInput>;
    <TInput extends import("@trpc/server/unstable-core-do-not-import").CreateRouterOptions>(input: TInput): import("@trpc/server/unstable-core-do-not-import").BuiltRouter<{
        ctx: {
            session: {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: {
                    id: string;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    image?: string | null | undefined;
                };
            } | null;
            db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof import("@acme/db/schema")> & {
                $client: import("drizzle-orm/node-postgres").NodePgClient;
            };
        };
        meta: object;
        errorShape: {
            data: {
                zodError: import("zod").typeToFlattenedError<any, string> | null;
                code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_KEY;
                httpStatus: number;
                path?: string;
                stack?: string;
            };
            message: string;
            code: import("@trpc/server/unstable-core-do-not-import").TRPC_ERROR_CODE_NUMBER;
        };
        transformer: true;
    }, import("@trpc/server/unstable-core-do-not-import").DecorateCreateRouterOptions<TInput>>;
};
/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export declare const publicProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<{
    session: {
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined;
        };
    } | null;
    db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof import("@acme/db/schema")> & {
        $client: import("drizzle-orm/node-postgres").NodePgClient;
    };
}, object, {}, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
/**
 * Protected (authenticated) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null.
 *
 * @see https://trpc.io/docs/procedures
 */
export declare const protectedProcedure: import("@trpc/server/unstable-core-do-not-import").ProcedureBuilder<{
    session: {
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined;
        };
    } | null;
    db: import("drizzle-orm/node-postgres").NodePgDatabase<typeof import("@acme/db/schema")> & {
        $client: import("drizzle-orm/node-postgres").NodePgClient;
    };
}, object, {
    session: {
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            image?: string | null | undefined;
        };
        session: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            expiresAt: Date;
            token: string;
            ipAddress?: string | null | undefined;
            userAgent?: string | null | undefined;
        };
    };
}, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, typeof import("@trpc/server/unstable-core-do-not-import").unsetMarker, false>;
//# sourceMappingURL=trpc.d.ts.map