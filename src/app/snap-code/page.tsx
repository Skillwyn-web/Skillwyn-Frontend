import SnapCodeFeed from "@/components/snap-code/SnapCodeFeed";
import { Navbar } from "@/components/layout/Navbar";

export default function SnapCodePage() {
    return (
        <main className="h-screen w-full bg-black flex flex-col">
            {/* Optional: Include Navbar if desired, but for reels usually sticky or hidden. 
           We will include it but fixed at top or maybe distinct from feed. 
           For immersive feel, let's keep it simple and just show the feed which has its own top bar.
       */}
            {/* <div className="absolute top-0 w-full z-50">
          <Navbar /> 
       </div> */}

            <div className="flex-1 w-full h-full">
                <SnapCodeFeed />
            </div>
        </main>
    );
}
