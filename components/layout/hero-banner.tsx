import Image from "next/image";

export function HeroBanner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Image
        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=2000&auto=format&fit=crop&q=80"
        alt="Amazon Banner"
        width={2000}
        height={600}
        className="w-full h-[500px] object-cover"
        priority
      />
    </div>
  );
}