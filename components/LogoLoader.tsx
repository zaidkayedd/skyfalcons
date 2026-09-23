import Image from "next/image";

interface LogoLoaderProps {
  isLoading: boolean;
}

export function LogoLoader({ isLoading }: LogoLoaderProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c1c1c] sm:bg-[#1f1f1f] backdrop-blur-sm transition-opacity">
      <div className="flex flex-col items-center gap-4">
        
        {/* Mobile View: Video Loader */}
        {/* Replace bg-[#2b2b2b] with the exact background color code of the box inside your video */}
        <div className="relative h-32 w-32 md:hidden overflow-hidden ">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full " 
          >
            <source src="/loaderrr.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Desktop View: Original GIF Loader */}
        <div className="relative hidden h-32 w-32 md:block">
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