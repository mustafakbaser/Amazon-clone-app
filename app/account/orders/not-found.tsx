import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function OrdersNotFound() {
  return (
    <div className="max-w-screen-xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Sayfa Bulunamadı</h2>
      <p className="text-muted-foreground mb-8">
        Aradığınız sayfa bulunamadı veya artık mevcut değil.
      </p>
      <Button asChild>
        <Link href="/">Ana Sayfaya Dön</Link>
      </Button>
    </div>
  );
}