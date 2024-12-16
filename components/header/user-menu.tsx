'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function UserMenu() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!user) {
    return (
      <Link href="/auth/login">
        <div className="link">
          <p>Merhaba, Giriş yapın</p>
          <p className="font-extrabold md:text-sm">Hesap ve Listeler</p>
        </div>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem className="font-medium">
          Merhaba, {user.firstName}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/account">
          <DropdownMenuItem>Hesabım</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => logout()}>
          Çıkış Yap
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}