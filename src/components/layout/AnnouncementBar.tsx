import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="sticky top-0 z-[100] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-4 py-2.5 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold text-[#ffffff]">
        <span className="hidden sm:inline">Special Offer:</span> Enroll to the Algorithmic Vault today and get a massive 50% discount!{" "}
        <Link href="/algorithmic-vault#pricing" className="ml-2 font-bold text-[#ffffff] underline underline-offset-2 hover:text-[#e0e7ff]">
          Claim Offer
        </Link>
      </p>
    </div>
  );
}
