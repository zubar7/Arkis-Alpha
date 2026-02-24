export default function Footer() {
  return (
    <footer className="mt-[80px] px-[24px] py-[24px]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="w-[108px] h-[16px] overflow-hidden opacity-50">
          <img
            src="/arkis-logo-gray.svg"
            alt="ARKIS"
            className="w-full h-full"
          />
        </div>

        {/* Right side - Copyright */}
        <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.36px] leading-[16px]">
          © 2026 Arkis. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
