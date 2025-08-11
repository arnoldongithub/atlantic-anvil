const CATS = ["Trump","Republican Party","Culture","Europe","Elon Musk","Steve Bannon"];

export default function CategoryCarousel({ active, onChange }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-2 py-3">
        {CATS.map(cat => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => onChange && onChange(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full border text-sm transition
                ${isActive ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' : 'bg-white text-slate-900 border-slate-200 hover:border-slate-900'}
              `}
              aria-pressed={isActive}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}

