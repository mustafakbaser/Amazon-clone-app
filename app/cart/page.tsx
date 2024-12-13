import { CartContent } from "@/components/cart/cart-content";
import { CartSummary } from "@/components/cart/cart-summary";

export default function CartPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alışveriş Sepeti</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartContent />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
}