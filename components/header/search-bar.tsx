'use client';

import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");

  // Show the current query when /search is opened directly or reloaded.
  useEffect(() => {
    if (pathname === "/search") {
      setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
    }
  }, [pathname]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="hidden sm:flex items-center h-10 flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded"
    >
      <Input 
        type="text" 
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Ara"
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0" 
        placeholder="Amazon.com.tr'de Ara"
      />
      <Button type="submit" variant="ghost" size="icon" aria-label="Ara" className="h-full w-12 bg-yellow-400 hover:bg-yellow-500">
        <Search className="h-5 w-5 text-gray-800" />
      </Button>
    </form>
  );
}
