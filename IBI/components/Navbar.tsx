import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary-600">
            RepDirectory
          </Link>

          {/* Navigation Links */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/search"
              className="text-sm font-medium text-gray-700 hover:text-primary-600"
            >
              Find a Rep
            </Link>
            <Link
              href="/companies"
              className="text-sm font-medium text-gray-700 hover:text-primary-600"
            >
              Companies
            </Link>
          </div>

          {/* Auth Links */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Dashboard
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="text-sm font-medium text-gray-700 hover:text-primary-600"
                  >
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn btn-primary">
                  Join as Rep
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
