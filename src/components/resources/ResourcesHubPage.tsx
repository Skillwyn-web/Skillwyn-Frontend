"use client";

import { useMemo, useState } from "react";
import { BookOpen, Code2, Database, Download, ExternalLink, FileText, Search, Server } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type Category = "All" | "DSA" | "Frontend" | "Backend" | "System Design" | "Interview Prep";

const categories: Category[] = ["All", "DSA", "Frontend", "Backend", "System Design", "Interview Prep"];

const resources = [
  ["DSA", "Striver's DSA Sheet", "450 Qs, company-tagged", ["Free", "Sheet"], "Open Link"],
  ["DSA", "NeetCode 150", "Blind 75 extended", ["Free", "Video"], "Open Link"],
  ["Frontend", "React Interview Questions Sheet", "100 Qs", ["Free", "Sheet"], "View Sheet"],
  ["System Design", "System Design Primer", "GitHub guide", ["Free", "GitHub"], "Open Link"],
  ["Backend", "CS50", "Free Harvard course", ["Free", "Video"], "Open Link"],
  ["Frontend", "Namaste JavaScript", "YouTube playlist", ["Free", "Video"], "Open Link"],
  ["Backend", "DBMS Notes PDF", "Database fundamentals", ["PDF", "Free"], "Download"],
  ["Backend", "OS Notes PDF", "Operating systems notes", ["PDF", "Free"], "Download"],
  ["Interview Prep", "HR Interview Questions", "Common HR prompts", ["PDF", "Free"], "Download"],
  ["Interview Prep", "Resume Templates Pack", "Canva placeholder", ["Template"], "Open Link"],
  ["Backend", "SQL 50", "LeetCode study plan", ["Free", "Sheet"], "Open Link"],
  ["Frontend", "Frontend Roadmap", "roadmap.sh path", ["Free", "Roadmap"], "Open Link"],
] as const;

export default function ResourcesHubPage() {
  const [active, setActive] = useState<Category>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return resources.filter(([category, title]) => {
      const categoryMatch = active === "All" || category === active;
      const searchMatch = title.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [active, query]);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#0f172a]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-amber-600">Featured</p>
            <h1 className="mt-2 text-3xl font-bold">SkillWyn Pro Pack</h1>
            <p className="mt-2 text-[#5b6fb3]">Premium sheets, templates, interview prep, and guided learning packs.</p>
          </div>
          <button className="mt-5 rounded-xl bg-amber-500 px-5 py-3 font-bold text-white md:mt-0">Get Access →</button>
        </div>

        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActive(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active === category ? "bg-[#2563eb] text-white" : "bg-white text-slate-600 hover:text-[#2563eb]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="flex min-w-72 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" className="w-full bg-transparent text-sm outline-none" />
          </label>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(([category, title, description, tags, cta]) => (
            <ResourceCard key={title} category={category as Category} title={title} description={description} tags={[...tags]} cta={cta} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ResourceCard({ category, title, description, tags, cta }: { category: Category; title: string; description: string; tags: string[]; cta: string }) {
  const Icon = category === "DSA" ? Code2 : category === "Frontend" ? BookOpen : category === "Backend" ? Database : category === "System Design" ? Server : FileText;
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#eff6ff] text-[#2563eb]">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold">{title}</h2>
          <p className="mt-1 truncate text-sm text-[#5b6fb3]">{description}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{tag}</span>
        ))}
      </div>
      <button className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-4 py-2 text-sm font-bold text-white">
        {cta} {cta === "Download" ? <Download className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
      </button>
    </article>
  );
}
