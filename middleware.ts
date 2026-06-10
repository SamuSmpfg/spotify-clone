import { createMiddleWareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, NextRequest } from "./node_modules/next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabse = createMiddleWareClient({
    req,
    res
  })

  await supabse.auth.getSession()
  return res

}