import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const { data: { user } } = await supabase.auth.getUser();

  let username;

  if(user){
    username = user.user_metadata.username;
    console.log(username);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <div />
          <div>
            {user ? (
              <div className="flex items-center gap-4">
                Hey, {username}!
                <form action="/auth/signout" method="post">
                <button
                  className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                  type="submit"
                >
                  Logout
                </button>
                </form>
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

// const {
//   data: { session },
// } = await supabase.auth.getSession()
//
// console.log(session);
// let fullname;
//
// if (session) {
//   const { data: profile } = await supabase.from("profiles").select();
//   fullname = profile.find(x => x.id === session.user.id).full_name;
//   console.log(fullname)
// }
