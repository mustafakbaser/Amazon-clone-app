export default function Footer() {
  return (
    <footer className="bg-[#232F3E] text-white">
      <div className="max-w-screen-xl mx-auto py-10 px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Hakkımızda</h3>
            <ul className="space-y-2 text-sm">
              <li>Kariyer</li>
              <li>İletişim</li>
              <li>Amazon Science</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Bizimle Para Kazanın</h3>
            <ul className="space-y-2 text-sm">
              <li>Amazon'da Satış Yapın</li>
              <li>Ortaklık Programı</li>
              <li>Fulfilment by Amazon</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Amazon Ödeme Araçları</h3>
            <ul className="space-y-2 text-sm">
              <li>Kredi Kartı</li>
              <li>Taksitli Ödeme</li>
              <li>Hediye Kartı</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Size Yardımcı Olalım</h3>
            <ul className="space-y-2 text-sm">
              <li>COVID-19 ve Amazon</li>
              <li>Kargo Takip</li>
              <li>İadeler</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-10 border-t border-gray-700 text-center">
          <p className="text-sm">© 1996-{new Date().getFullYear()}, Amazon.com, Inc. veya bağlı kuruluşları</p>
        </div>
      </div>
    </footer>
  );
}