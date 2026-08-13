import type { ShippingCountryAvailability } from "@/types";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 500;

function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * VIEW_WIDTH;
  const y = ((90 - lat) / 180) * VIEW_HEIGHT;
  return { x, y };
}

function radiusFor(count: number, max: number) {
  const minRadius = 6;
  const maxRadius = 20;
  if (max === 0) return minRadius;
  return minRadius + (maxRadius - minRadius) * Math.sqrt(count / max);
}

export function ShippingMap({ countries }: { countries: ShippingCountryAvailability[] }) {
  const maxAvailable = Math.max(...countries.map((c) => c.availableVehicles), 1);

  return (
    <div className="rounded-2xl border bg-slate-900 p-4 sm:p-8">
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} className="w-full" role="img" aria-label="World shipping availability map">
        <ContinentBlobs />
        {countries.map((country) => {
          const { x, y } = project(country.lat, country.lng);
          const radius = radiusFor(country.availableVehicles, maxAvailable);
          return (
            <g key={country.code}>
              <circle cx={x} cy={y} r={radius} className="fill-amber-400/25" />
              <circle cx={x} cy={y} r={radius * 0.45} className="fill-amber-400 animate-pulse">
                <title>
                  {country.name}: {country.availableVehicles} vehicles available to ship
                </title>
              </circle>
            </g>
          );
        })}
      </svg>
      <p className="mt-4 text-center text-sm text-slate-400">
        Hover or tap a marker to see how many vehicles are ready to ship from each region.
      </p>
    </div>
  );
}

function ContinentBlobs() {
  return (
    <g className="fill-slate-700">
      {/* North America */}
      <path d="M70,90 C130,55 220,50 270,90 C300,120 290,170 260,200 C240,230 230,260 200,270 C160,255 120,230 100,190 C75,160 55,120 70,90 Z" />
      {/* South America */}
      <path d="M230,280 C260,265 305,270 320,300 C335,335 325,380 305,415 C290,440 270,435 255,410 C235,375 225,320 230,280 Z" />
      {/* Europe */}
      <path d="M460,70 C500,55 550,60 570,90 C580,110 565,130 545,140 C520,150 480,145 465,120 C455,105 455,85 460,70 Z" />
      {/* Africa */}
      <path d="M470,165 C510,155 565,165 580,205 C595,250 585,310 560,355 C540,390 510,385 495,350 C475,305 460,220 470,165 Z" />
      {/* Asia */}
      <path d="M580,60 C660,40 800,45 890,90 C920,110 915,140 890,155 C860,175 820,165 790,180 C740,205 690,200 650,180 C610,160 580,120 580,60 Z" />
      {/* Australia */}
      <path d="M800,330 C840,315 900,320 920,350 C935,375 915,400 885,405 C855,410 815,400 800,375 C793,360 793,343 800,330 Z" />
    </g>
  );
}
