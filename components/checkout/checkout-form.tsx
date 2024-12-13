"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddressForm } from "./forms/address-form";
import { PaymentForm } from "./forms/payment-form";

export function CheckoutForm() {
  const [activeTab, setActiveTab] = useState("address");

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="address">Teslimat Adresi</TabsTrigger>
          <TabsTrigger value="payment">Ödeme</TabsTrigger>
          <TabsTrigger value="review">İnceleme</TabsTrigger>
        </TabsList>
        
        <TabsContent value="address">
          <AddressForm onComplete={() => setActiveTab("payment")} />
        </TabsContent>
        
        <TabsContent value="payment">
          <PaymentForm onComplete={() => setActiveTab("review")} />
        </TabsContent>
        
        <TabsContent value="review">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Sipariş Özeti</h3>
            {/* Sipariş detayları buraya gelecek */}
            <Button 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
              onClick={() => {
                // Siparişi tamamla
              }}
            >
              Siparişi Onayla
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}