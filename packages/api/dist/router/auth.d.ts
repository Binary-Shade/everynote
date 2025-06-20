export declare const authRouter: {
    getSession: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: {
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
    }>;
    getSecretMessage: import("@trpc/server").TRPCQueryProcedure<{
        input: void;
        output: string;
    }>;
};
//# sourceMappingURL=auth.d.ts.map