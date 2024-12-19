'use client';

import Link from "next/link";
import { Menu } from "lucide-react";
import { products } from "@/lib/constants/products";
import { getCategories } from "@/lib/catalog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = getCategories(products);

export function CategoryMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center link">
        <Menu className="h-6 w-6 mr-1" />
        Tüm Kategoriler
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        {categories.map((category) => (
          <DropdownMenuItem key={category.slug} asChild>
            <Link href={`/category/${category.slug}`} className="cursor-pointer">
              {category.name}
              <span className="ml-auto text-xs text-muted-foreground">
                {category.count}
              </span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
