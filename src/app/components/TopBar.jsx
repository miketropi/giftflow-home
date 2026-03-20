export default function TopBar() {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] flex h-11 items-center justify-center border-b border-white/10 bg-black px-4 text-white"
      role="banner"
    >
      <p className="max-w-full truncate text-center text-xs sm:text-[14px]">
        <span className="font-semibold">WordPress Plugin</span>
        <span className="mx-2 opacity-70">•</span>
        <span className="opacity-90">Manage Donations, Donors & Campaigns</span>
        <span className="mx-2 hidden opacity-70 sm:inline">•</span>
        <span className="hidden opacity-90 sm:inline">Modern & Easy to Use</span>
      </p>
    </div>
  );
}
