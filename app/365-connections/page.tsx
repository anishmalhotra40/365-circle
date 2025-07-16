"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Mail, Star, Linkedin} from "lucide-react";
import cn from "classnames";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

const supabase = createClient();

// Updated type to match new schema (case-sensitive, spaces, etc.)
type Connection = {
  id: number;
  Name?: string;
  Designation?: string;
  "Organization Name"?: string;
  "Organization Type"?: string;
  Industry?: string;
  "Sub Sector"?: string;
  "Connect Type"?: string;
  "Designation Level"?: string;
  "Phone Number"?: string;
  Email?: string;
  "LinkedIn URL"?: string;
  Featured?: string; // text, "true" or null/empty
  "Post URL"?: string;
};

type ProfileCardProps = {
  name: string;
  designation: string;
  organization_name: string;
  industry: string;
  email?: string;
  linkedin_url?: string;
  featured: boolean;
  post_url?: string;
};

function ProfileCard({ name, designation, organization_name, industry, email, linkedin_url, featured, post_url }: ProfileCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Featured Tag */}
      {featured && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-yellow-400/90 px-3 py-1 text-xs font-bold text-white shadow">Featured</span>
      )}
      {/* Profile Photo */}
      <div className="mb-4 flex justify-center">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
          <Image src="/placeholder.svg" alt={name} width={80} height={80} className="h-full w-full rounded-full object-contain" />
        </div>
      </div>
      {/* Profile Info */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={name}>{name}</h3>
        <p className="mt-1 text-sm text-blue-700 font-medium truncate" title={designation}>{designation}</p>
        <p className="mt-1 text-xs text-gray-500 truncate" title={organization_name}>{organization_name}</p>
        <p className="mt-1 text-xs text-blue-500 font-semibold truncate" title={industry}>{industry}</p>
      </div>
      {/* Contact & Featured Post Icons */}
      <div className="mt-5 flex justify-center gap-3">
        {email && (
          <a href={`mailto:${email}`} className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="Email">
            <Mail className="w-5 h-5" />
          </a>
        )}
        {linkedin_url && (
          <a href={linkedin_url.startsWith('http') ? linkedin_url : `https://${linkedin_url}`} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 transition" title="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {featured && post_url && (
          <a href={post_url} target="_blank" rel="noopener noreferrer" className="rounded-full p-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition" title="Featured Post">
            <Star className="w-5 h-5" />
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
    const ind = curr.Industry && curr.Industry !== "-" && curr.Industry !== "Other" ? curr.Industry : "Others";
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
      ? connections.filter((p) => !p.Industry || p.Industry === "-" || p.Industry === "Other")
      : connections.filter((p) => p.Industry === selectedIndustry);

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
      <section id="connections" className="py-20 md:py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#22306e]">
              Connections Across Industry
            </h2>
            <p className="text-lg text-[#22306e] mt-4 max-w-xl mx-auto font-medium">
              Discover professionals from various fields.
            </p>
          </div>
          <div className="flex justify-end mb-12 relative">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl border border-[#405ff4] bg-white text-[#405ff4] hover:bg-blue-50 shadow transition-all min-w-[200px] justify-between focus:outline-none focus:ring-2 focus:ring-[#405ff4]",
                  dropdownOpen && "ring-2 ring-[#405ff4]"
                )}
              >
                <span>Filter: <span className="font-bold text-[#405ff4]">{selectedIndustry}</span></span>
                <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-14 right-0 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-[#405ff4] animate-fade-in">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedConnections.map((prof) => (
              <ProfileCard
                key={prof.id}
                name={prof.Name || ""}
                designation={prof.Designation || ""}
                organization_name={prof["Organization Name"] || ""}
                industry={prof.Industry || ""}
                email={prof.Email || undefined}
                linkedin_url={prof["LinkedIn URL"] || undefined}
                featured={!!prof.Featured && prof.Featured.toLowerCase() === "true"}
                post_url={prof["Post URL"] || undefined}
              />
            ))}
          </div>
          {/* Pagination controls if needed */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg border bg-white text-[#405ff4] font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <span className="px-4 py-2 text-[#405ff4] font-bold">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg border bg-white text-[#405ff4] font-semibold disabled:opacity-50 flex items-center gap-2"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Connections;
