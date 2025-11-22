'use client'

import { useState } from "react"
import { InstallerListCard } from "@/components/InstallerListCard"
import { InstallerCard } from "@/components/InstallerCard"
import { Pagination } from "@/components/Pagination"
import { FilterBar } from "@/components/FilterBar"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Database } from "@/app/lib/supabase/types"

const ITEMS_PER_PAGE = 24

type Installer = Database['public']['Tables']['installers']['Row']

interface InstallersListClientProps {
  installers: Installer[]
  nabcepInstallers: Installer[]
}

export function InstallersListClient({ installers, nabcepInstallers }: InstallersListClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter NABCEP installers based on active filter and search
  const filteredNabcepInstallers = nabcepInstallers.filter(installer => {
    const matchesSearch = searchQuery === "" ||
      installer.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.location_city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.certification_type?.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "gold") {
      return matchesSearch && installer.tier === 'Gold'
    }
    if (activeFilter === "silver") {
      return matchesSearch && installer.tier === 'Silver'
    }
    if (activeFilter === "bronze") {
      return matchesSearch && installer.tier === 'Bronze'
    }
    if (activeFilter === "premium") {
      return matchesSearch && installer.is_premium
    }
    if (activeFilter === "verified") {
      return matchesSearch && installer.is_verified
    }

    return matchesSearch
  })

  // Filter non-NABCEP installers
  const nonNabcepInstallers = installers.filter(installer => {
    const certType = installer.certification_type?.toLowerCase() || ''
    return !(certType.includes('pvip') ||
      certType.includes('pvsi') ||
      certType.includes('pv installation') ||
      certType.includes('pv system'))
  })

  const filteredNonNabcepInstallers = nonNabcepInstallers.filter(installer => {
    const matchesSearch = searchQuery === "" ||
      installer.company_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.location_city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      installer.certification_type?.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeFilter === "gold") {
      return matchesSearch && installer.tier === 'Gold'
    }
    if (activeFilter === "silver") {
      return matchesSearch && installer.tier === 'Silver'
    }
    if (activeFilter === "bronze") {
      return matchesSearch && installer.tier === 'Bronze'
    }
    if (activeFilter === "nabcep") {
      return false
    }
    if (activeFilter === "premium") {
      return matchesSearch && installer.is_premium
    }
    if (activeFilter === "verified") {
      return matchesSearch && installer.is_verified
    }

    return matchesSearch
  })

  const totalPages = Math.ceil(filteredNonNabcepInstallers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedNonNabcepInstallers = filteredNonNabcepInstallers.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{nabcepInstallers.length}</div>
            <div className="text-sm text-muted-foreground">NABCEP Certified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{filteredNonNabcepInstallers.length}</div>
            <div className="text-sm text-muted-foreground">Other Installers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{installers.length}+</div>
            <div className="text-sm text-muted-foreground">Total Installers</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Bar */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        totalResults={filteredNabcepInstallers.length + filteredNonNabcepInstallers.length}
        onSearch={setSearchQuery}
        onAdvancedFilterChange={() => { }}
        showViewToggle={false}
      />

      {/* Results */}
      <div className="mt-8 space-y-12">
        {/* NABCEP section */}
        {(activeFilter === "all" || activeFilter === "nabcep") && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-foreground">NABCEP Certified Installers</h2>
              <Badge variant="default" className="bg-primary/15 text-primary px-3 py-1 border border-primary/20">
                {filteredNabcepInstallers.length} Certified
              </Badge>
            </div>

            {filteredNabcepInstallers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNabcepInstallers.map((installer) => (
                  <InstallerCard
                    key={installer.id}
                    id={installer.id}
                    name={installer.name}
                    certification_type={installer.certification_type || ""}
                    certification_number={installer.certification_number || ""}
                    certification_expires={installer.certification_expires || ""}
                    company_name={installer.company_name || ""}
                    company_website={installer.company_website || ""}
                    phone={installer.phone || ""}
                    location_city={installer.location_city || ""}
                    location_state={installer.location_state || ""}
                    location_zip={installer.location_zip || ""}
                    country={installer.country || "USA"}
                    is_verified={installer.is_verified || false}
                    is_premium={installer.is_premium || false}
                    tier={installer.tier}
                    total_safety_score={installer.total_safety_score}
                  />
                ))}
              </div>
            ) : activeFilter === "nabcep" ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <p className="text-muted-foreground">
                    No NABCEP certified installers found matching your criteria.
                  </p>
                </CardContent>
              </Card>
            ) : null}
          </section>
        )}

        {/* Non-NABCEP section */}
        {activeFilter !== "nabcep" && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-foreground">Other Solar Installers</h2>
              <Badge variant="outline" className="px-3 py-1">
                {filteredNonNabcepInstallers.length} Available
              </Badge>
            </div>

            {filteredNonNabcepInstallers.length > 0 ? (
              <>
                <div className="space-y-3">
                  {paginatedNonNabcepInstallers.map((installer) => (
                    <InstallerListCard
                      key={installer.id}
                      id={installer.id}
                      name={installer.name}
                      certification_type={installer.certification_type || ""}
                      certification_number={installer.certification_number || ""}
                      certification_expires={installer.certification_expires || ""}
                      company_name={installer.company_name || ""}
                      company_website={installer.company_website || ""}
                      phone={installer.phone || ""}
                      location_city={installer.location_city || ""}
                      location_state={installer.location_state || ""}
                      location_zip={installer.location_zip || ""}
                      country={installer.country || "USA"}
                      is_verified={installer.is_verified || false}
                      is_premium={installer.is_premium || false}
                      tier={installer.tier}
                      total_safety_score={installer.total_safety_score}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                      itemsPerPage={ITEMS_PER_PAGE}
                      totalItems={filteredNonNabcepInstallers.length}
                    />
                  </div>
                )}
              </>
            ) : (
              <Card className="p-8 text-center">
                <CardContent>
                  <p className="text-muted-foreground">
                    No other installers found matching your criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        )}

        {/* No Results Message */}
        {((activeFilter === "nabcep" && filteredNabcepInstallers.length === 0) ||
          (activeFilter !== "nabcep" && filteredNonNabcepInstallers.length === 0 && filteredNabcepInstallers.length === 0)) && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No installers found matching your criteria. Try adjusting your filters.
              </p>
            </div>
          )}
      </div>
    </>
  )
}
