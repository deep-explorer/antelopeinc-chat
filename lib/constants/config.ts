export const antelopeEndpoint = process.env.NEXT_PUBLIC_ANTELOPE_ENDPOINT!
export const companyUrl = process.env.NEXT_PUBLIC_COMPANY_URL!

export const ENVIRONMENT: 'production' | 'preview' | 'development' = process.env
  .NEXT_PUBLIC_VERCEL_ENV as any
