// Brand logo images from Figma assets
const BRAND_IMAGES = [
  { name: 'Whirlpool', src: 'https://www.figma.com/api/mcp/asset/854945fa-6e53-4266-9990-a5a52f5b987e' },
  { name: 'Samsung', src: 'https://www.figma.com/api/mcp/asset/e537b4e4-23ae-4d48-bd16-2d5c5f221e51' },
  { name: 'LG', src: 'https://www.figma.com/api/mcp/asset/0b97050a-88ed-4389-983f-4c4048db11cd' },
  { name: 'Bosch', src: 'https://www.figma.com/api/mcp/asset/5f980eda-66dc-4353-9a33-204b04d82180' },
  { name: 'Generac', src: 'https://www.figma.com/api/mcp/asset/de9b7a6d-82d5-406c-90b4-fe5a31f31a78' },
  { name: 'Frigidaire', src: 'https://www.figma.com/api/mcp/asset/a2651048-9e49-4989-aaab-ad05ee7e24ae' },
  { name: 'Amana', src: 'https://www.figma.com/api/mcp/asset/aa7a9d96-18b5-4d51-99da-d7d7e6482dc0' },
  { name: 'GE', src: 'https://www.figma.com/api/mcp/asset/9409907c-5022-448b-92c0-34cc67c89d3e' },
  { name: 'KitchenAid', src: 'https://www.figma.com/api/mcp/asset/bbc1d5be-5adb-4a81-ac13-bbc7f3f44537' },
  { name: 'Brand', src: 'https://www.figma.com/api/mcp/asset/4409239f-6f3f-4491-8f82-2b8654329735' },
];

export function TrustedBy() {
  return (
    <section className="py-20 px-12 bg-white">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-[1116px] mx-auto text-center mb-14">
          <p className="text-[1rem] font-semibold text-primary uppercase tracking-wide mb-3">
            OUR PARTNERS
          </p>
          <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold text-black leading-[1.2] mb-3">
            Trusted by
          </h2>
          <p className="text-[1rem] text-muted max-w-[700px] mx-auto">
            We partner with major brands to ensure you can get the repairs, maintenance, protection and replacements on the products you have today or want tomorrow.
          </p>
        </div>

        {/* Logos grid */}
        <div className="border-t border-b border-border">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-x divide-y divide-border">
            {BRAND_IMAGES.map(({ name, src }) => (
              <div
                key={name}
                className="flex items-center justify-center p-8 min-h-[128px]"
              >
                <img
                  src={src}
                  alt={name}
                  className="max-h-10 max-w-[140px] object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
