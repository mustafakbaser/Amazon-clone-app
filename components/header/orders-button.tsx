'use client';

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { useToast } from "@/hooks/use-toast";

export function OrdersButton() {
  const router = useRouter();
  const { toast } = useToast();
  const user = useAuthStore((state) => state.user);

  const handleClick = () => {
    if (!user) {
      toast({
        title: "Giriş Yapın",
        description: "Siparişlerinizi görüntülemek için giriş yapmanız gerekiyor.",
      });
      router.push("/auth/login?redirect=/account/orders");
      return;
    }

    router.push("/account/orders");
  };

  return (
    <button onClick={handleClick} className="link">
      <p>İadeler</p>
      <p className="font-extrabold md:text-sm">ve Siparişler</p>
    </button>
  );
}