export default function Header() {
  return (
    <header className="bg-[#181923] px-[24px] py-[16px] rounded-[10px] flex gap-[48px] items-center overflow-hidden">
      {/* Logo */}
      <div className="w-[108px] h-[16px] overflow-hidden shrink-0">
        <img
          src="/arkis-logo.svg"
          alt="ARKIS"
          className="w-full h-full"
        />
      </div>

      {/* Navigation Badge */}
      <div className="flex gap-[13px] items-center shrink-0">
        <div className="bg-white h-[32px] px-[12px] py-[10px] rounded-[8px] flex items-center justify-center">
          <p className="text-[12px] font-medium text-[#111217] leading-normal tracking-[-0.42px]">
            FRA Dashboard
          </p>
        </div>
      </div>
    </header>
  );
}
