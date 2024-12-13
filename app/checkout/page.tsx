import { CheckoutForm } from "@/components/checkout/checkout-form";
import { CheckoutSummary } from "@/components/checkout/checkout-summary";

export default function CheckoutPage() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ödeme</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>
        <div>
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}