import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from './ProfileForm'
import SubscriptionCard from './SubscriptionCard'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select(`
      *,
      rep_companies(
        company:companies(*)
      )
    `)
    .eq('id', user.id)
    .single()

  // Fetch all companies for the form
  const { data: allCompanies } = await supabase
    .from('companies')
    .select('*')
    .order('name')

  const companies = profile?.rep_companies?.map((rc: any) => rc.company) || []

  return (
    <div className="py-8">
      <div className="container max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage your representative profile</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Preview Link */}
            {profile && (
              <div className="card bg-primary-50 border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-primary-900">Your Public Profile</h3>
                    <p className="mt-1 text-sm text-primary-700">
                      See how customers view your profile
                    </p>
                  </div>
                  <Link
                    href={`/rep/${user.id}`}
                    className="btn btn-primary"
                    target="_blank"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            )}

            {/* Profile Form */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
              <ProfileForm
                profile={profile}
                userId={user.id}
                allCompanies={allCompanies || []}
                currentCompanies={companies}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SubscriptionCard
              isProSubscriber={profile?.is_pro_subscriber || false}
              stripeCustomerId={profile?.stripe_customer_id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
