import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'
import { env } from '@/env.mjs'
import { z } from 'zod'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import r2 from '@/server/r2'

export const uploadsRouter = createTRPCRouter({
    getPresignedUrl: publicProcedure
        .input(z.object({ key: z.string() }))
        .query(async ({ input }) => {
            let s3keyPaths = input.key.split('/')
            const s3key =
                env.R2_ACCESS_KEY_ID === 'minioadmin'
                    ? s3keyPaths.slice(1, s3keyPaths.length).join('/')
                    : s3keyPaths.join('/')
            const signedUrl = await getSignedUrl(
                r2,
                new GetObjectCommand({
                    Bucket: env.R2_BUCKET_NAME,
                    Key: s3key,
                }),
                { expiresIn: 3600 }
            )
            return signedUrl
        }),
})