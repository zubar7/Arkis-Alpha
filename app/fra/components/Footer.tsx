export default function Footer() {
  return (
    <footer className="mt-[80px] px-[24px] py-[24px]">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left side - Logo */}
        <div className="w-[108px] h-[16px] overflow-hidden opacity-50">
          <img
            src="http://localhost:3845/assets/9abbc8964add752e11f9c740560c0924e9617f09.svg"
            alt="ARKIS"
            className="w-full h-full"
            style={{ filter: 'brightness(0) saturate(100%) invert(45%) sepia(8%) saturate(631%) hue-rotate(183deg) brightness(93%) contrast(87%)' }}
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
