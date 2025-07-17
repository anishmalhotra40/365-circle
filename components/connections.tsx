"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Star, Linkedin } from "lucide-react";
import cn from "classnames";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const supabase = createClient();

type Connection = {
  id: number;
  Name?: string;
  "Designation "?: string;
  "Organization Name"?: string;
  "Organization Type (Small/ Medium/ Large)"?: string;
  "Industry "?: string;
  "Sub Sector"?: string;
  "Type of connect (Founder/ Employee/ Freelancer)"?: string;
  "Designation Type (Senior/ Mid/ Entry Level)"?: string;
  "Phone Number"?: string;
  "Email ID"?: string;
  "Linkedin "?: string;
  "Featured "?: string;
  "Featured post URL "?: string;
  "Photo URL"?: string;
};

type ProfileCardProps = {
  name: string;
  designation: string;
  organization_name: string;
  industry: string;
  linkedin_url?: string;
  featured: boolean;
  post_url?: string;
  photo_url?: string;
};

function ProfileCard({ name, designation, organization_name, industry, linkedin_url, featured, post_url, photo_url }: ProfileCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-md transition-all duration-150 border border-blue-100/30 cursor-pointer
      hover:shadow-lg hover:-translate-y-1 hover:scale-[1.025]">
      {/* Featured Tag */}
      {featured && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-yellow-400/90 px-3 py-1 text-xs font-bold text-white shadow">Featured</span>
      )}
      {/* Profile Photo */}
      <div className="mb-4 flex justify-center">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-150">
          {photo_url && !imageError ? (
            <Image 
              src={photo_url} 
              alt={name} 
              width={80} 
              height={80} 
              className="h-full w-full rounded-full object-cover" 
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="h-full w-full rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-lg">
                {name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* Profile Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-150" title={name}>{name}</h3>
        <p className="mt-1 text-sm text-blue-700 font-medium truncate" title={designation}>{designation}</p>
        <p className="mt-1 text-xs text-gray-500 truncate" title={organization_name}>{organization_name}</p>
        <p className="mt-1 text-xs text-blue-500 font-semibold truncate" title={industry}>{industry}</p>
      </div>
      {/* Contact & Featured Post Icons */}
      <div className="mt-5 flex justify-center gap-3">
        {post_url && (
          <a href={post_url.startsWith('http') ? post_url : `https://${post_url}`} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Featured Post">
            <Star className="w-5 h-5" />
          </a>
        )}
        {linkedin_url && (
          <a href={linkedin_url.startsWith('http') ? linkedin_url : `https://${linkedin_url}`} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}

const Connections = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConnections() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('365circle')
        .select('*')
        .order('id', { ascending: false });
      if (error) {
        setError(error.message);
        setConnections([]);
      } else {
        setConnections(data || []);
      }
      setLoading(false);
    }
    fetchConnections();
  }, []);

  // Industry filter logic (case-sensitive, fallback to "Others")
  const industryCounts = connections.reduce((acc: Record<string, number>, curr) => {
    const ind = curr["Industry "] && curr["Industry "] !== "-" && curr["Industry "] !== "Other" ? curr["Industry "] : "Others";
    acc[ind] = (acc[ind] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sortedIndustries = Object.entries(industryCounts).sort((a, b) => b[1] - a[1]).map(([ind]) => ind);
  const topIndustries = sortedIndustries.filter(i => i !== "Others").slice(0, 6);
  const filterOptions = ["All", ...topIndustries, "Others"];

  const filteredConnections =
    selectedIndustry === "All"
      ? connections
      : selectedIndustry === "Others"
      ? connections.filter((p) => !p["Industry "] || p["Industry "] === "-" || p["Industry "] === "Other")
      : connections.filter((p) => p["Industry "] === selectedIndustry);

  // 2 rows x 3 columns = 6 cards per page
  const CARDS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredConnections.length / CARDS_PER_PAGE);
  const paginatedConnections = filteredConnections.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  );

  useEffect(() => {
    setPage(1);
  }, [selectedIndustry]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="text-blue-600 text-xl font-semibold">Loading connections...</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="text-red-600 text-lg font-semibold mb-4">{error}</span>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Retry</button>
      </div>
    );
  }

  return (
    <>
      <section id="connections" className="pb-10 md:pb-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="inline-block text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-blue-900 dark:text-blue-200 drop-shadow-lg px-2 py-1 rounded-md">
              Connections Across Industry
            </h2>
            <p className="text-base md:text-lg text-blue-900 dark:text-blue-200 mt-2 max-w-xl mx-auto font-medium opacity-80">
              Discover professionals from various fields.
            </p>
          </div>
          <div className="flex justify-end mb-6 md:mb-8 relative">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2 text-base font-semibold rounded-xl border border-[#405ff4] bg-white text-[#405ff4] hover:bg-blue-50 shadow transition-all min-w-[180px] justify-between focus:outline-none focus:ring-2 focus:ring-[#405ff4]",
                  dropdownOpen && "ring-2 ring-[#405ff4]"
                )}
              >
                <span>Filter: <span className="font-bold text-[#405ff4]">{selectedIndustry}</span></span>
                <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-12 right-0 w-52 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-[#405ff4] animate-fade-in">
                  {filterOptions.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedIndustry(type);
                        setDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-5 py-3 text-base transition-colors focus:outline-none",
                        selectedIndustry === type
                          ? "bg-[#405ff4] text-white font-bold"
                          : "hover:bg-blue-50 text-[#405ff4]"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedConnections.map((prof) => (
              <ProfileCard
                key={prof.id}
                name={prof.Name || ""}
                designation={prof["Designation "] || ""}
                organization_name={prof["Organization Name"] || ""}
                industry={prof["Industry "] || ""}
                linkedin_url={prof["Linkedin "] || undefined}
                featured={!!prof["Featured "] && (prof["Featured "].toLowerCase() === "yes" || prof["Featured "].toLowerCase() === "true")}
                post_url={prof["Featured post URL "] || undefined}
                photo_url={prof["Photo URL"] || undefined}
              />
            ))}
          </div>
          {/* Pagination controls if needed */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10 gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border bg-white text-[#405ff4] font-semibold disabled:opacity-50 flex items-center gap-2 shadow-sm hover:bg-blue-50 transition"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <span className="px-4 py-2 text-[#405ff4] font-bold">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border bg-white text-[#405ff4] font-semibold disabled:opacity-50 flex items-center gap-2 shadow-sm hover:bg-blue-50 transition"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Connections;