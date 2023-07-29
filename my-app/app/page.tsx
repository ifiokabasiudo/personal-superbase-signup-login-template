import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

          const { data: profile } = await supabase.from("profiles").select().single();

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            {profile.full_name ? (
              <div className="flex items-center gap-4">
                Hey, {profile.full_name}!
                <LogoutButton />
              </div>
            ) : (
              <div>
              <Link
                href="/login"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                style={{marginRight: "20px"}}
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
              >
                Sign Up
              </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
