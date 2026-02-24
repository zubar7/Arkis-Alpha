export default function Header() {
  return (
    <header className="bg-[#181923] px-[24px] py-[16px] rounded-[10px] flex gap-[48px] items-center overflow-hidden">
      {/* Logo */}
      <div className="w-[108px] h-[16px] overflow-hidden shrink-0">
        <img
          src="http://localhost:3845/assets/9abbc8964add752e11f9c740560c0924e9617f09.svg"
          alt="ARKIS"
          className="w-full h-full"
        />
      </div>

      {/* Navigation Badge */}
      <div className="flex gap-[13px] items-center shrink-0">
        <div className="bg-white h-[32px] px-[12px] py-[10px] rounded-[8px] flex items-center justify-center">
          <p className="text-[12px] font-medium text-[#111217] leading-normal">
            FRA Dashboard
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-w-0" />

      {/* Refresh Button */}
      <button className="bg-[#619ee1] px-[12px] py-[10px] rounded-[8px] flex items-center gap-[6px] shrink-0 hover:bg-[#5591d4] transition-colors">
        <div className="size-[16px] shrink-0">
          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
            <path
              d="M14 2v4h-4M2 14v-4h4M14.4 6a6 6 0 1 1-1.4-3.5M1.6 10a6 6 0 1 0 1.4 3.5"
              stroke="#0f1014"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-[14px] font-semibold text-[#0f1014] tracking-[-0.42px] leading-[20px]">
          Refresh
        </span>
      </button>
    </header>
  );
}
