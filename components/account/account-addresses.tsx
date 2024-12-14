'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/auth-store';
import { Button } from '@/components/ui/button';
import { AddressForm } from '@/components/account/address-form';
import { Address } from '@/lib/types/auth';
import { MapPin, Pencil, Trash } from 'lucide-react';

export function AccountAddresses() {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const user = useAuthStore((state) => state.user);
  const { removeAddress, setDefaultAddress } = useAuthStore();

  if (!user) return null;

  return (
    <div className="space-y-6">
      {!isAddingAddress && !editingAddress && (
        <Button onClick={() => setIsAddingAddress(true)}>
          Yeni Adres Ekle
        </Button>
      )}

      {(isAddingAddress || editingAddress) && (
        <AddressForm
          address={editingAddress}
          onCancel={() => {
            setIsAddingAddress(false);
            setEditingAddress(null);
          }}
          onSuccess={() => {
            setIsAddingAddress(false);
            setEditingAddress(null);
          }}
        />
      )}

      <div className="grid gap-4">
        {user.addresses.map((address) => (
          <div
            key={address.id}
            className="border rounded-lg p-4 relative"
          >
            {address.isDefault && (
              <span className="absolute top-4 right-4 text-sm text-green-600 font-medium">
                Varsayılan Adres
              </span>
            )}
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
              <div className="flex-grow">
                <h3 className="font-medium">{address.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {address.fullName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {address.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {address.district} / {address.city} {address.zipCode}
                </p>
                <p className="text-sm text-muted-foreground">
                  {address.phone}
                </p>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingAddress(address)}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Düzenle
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAddress(address.id)}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Sil
                  </Button>

                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      Varsayılan Yap
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}