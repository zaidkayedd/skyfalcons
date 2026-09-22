import Image from "next/image";

interface LogoLoaderProps {
  isLoading: boolean;
}

export function LogoLoader({ isLoading }: LogoLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f1f1f] backdrop-blur-sm transition-opacity">
      <div className="flex flex-col items-center gap-4">
      
        <div className="relative h-32 w-32">
          <Image
            src="/loader.gif"
            alt="Loading..."
            fill
            unoptimized 
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}