import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-xl font-bold text-primary-600">
              RepDirectory
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Connect with trusted direct sales representatives in your area.
              Find quality products and services from Mary Kay, Pampered Chef,
              Avon, and more.
            </p>
          </div>

          {/* For Customers */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-900">
              For Customers
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/search"
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  Find a Rep
                </Link>
              </li>
              <li>
                <Link
                  href="/companies"
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  Browse Companies
                </Link>
              </li>
            </ul>
          </div>

          {/* For Reps */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-900">
              For Reps
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/auth/signup"
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  Join Directory
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-600 hover:text-primary-600"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} RepDirectory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
