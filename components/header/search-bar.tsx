'use client';

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="hidden sm:flex items-center h-10 flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500 rounded">
      <Input 
        type="text" 
        className="p-2 h-full w-6 flex-grow flex-shrink rounded-l focus-visible:ring-0 focus-visible:ring-offset-0" 
        placeholder="Amazon.com.tr'de Ara"
      />
      <Button variant="ghost" size="icon" className="h-full px-5 bg-yellow-400 hover:bg-yellow-500">
        <Search className="h-5 w-5 text-gray-800" />
      </Button>
    </div>
  );
}