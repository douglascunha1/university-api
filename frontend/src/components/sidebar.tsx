import {
  ArrowRight,
  Database,
  GraduationCap,
  Search,
  School,
  Sparkles,
} from "lucide-react";
import { entityBadges, entityConfigs, entityOrder, type EntityKey } from "../data/entities";
import { cn } from "../lib/utils";

type SidebarProps = {
  selected: EntityKey;
  onSelect: (entity: EntityKey) => void;
  search: string;
  onSearchChange: (value: string) => void;
  totalRecords: number;
  counts: Partial<Record<EntityKey, number>>;
};

export function Sidebar({
  selected,
  onSelect,
  search,
  onSearchChange,
  totalRecords,
  counts,
}: SidebarProps) {
  return (
    <div className="sticky top-4 flex h-[calc(100vh-2rem)] flex-col rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_60px_rgba(102,119,142,0.12)] backdrop-blur-xl">
      <div className="mb-6 rounded-[24px] border border-slate-200/70 bg-gradient-to-br from-sky-50 via-white to-emerald-50 p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10">
            <School className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">UCA</p>
            <h1 className="text-lg font-semibold text-slate-900">Painel acadêmico</h1>
          </div>
        </div>
      </div>

      <label className="mb-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 transition focus-within:border-slate-300 focus-within:bg-white">
        <Search className="h-4 w-4 shrink-0" />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar entidade ou registro"
          className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
      </label>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-900 p-4 text-white">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/70">
            <Database className="h-4 w-4" />
            Registros
          </div>
          <div className="text-2xl font-semibold">{totalRecords}</div>
        </div>
        <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-800">
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-emerald-600">
            <Sparkles className="h-4 w-4" />
            Status
          </div>
          <div className="text-2xl font-semibold">Online</div>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {entityBadges.map((badge) => (
          <span key={badge.label} className={cn("rounded-full px-3 py-1 text-xs font-medium", badge.tone)}>
            {badge.label}
          </span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <span>Entidades</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>

        <div className="space-y-2">
          {entityOrder.map((entityKey) => {
            const config = entityConfigs[entityKey];
            const active = entityKey === selected;
            const count = counts[entityKey] ?? 0;
            const Icon = config.icon;

            return (
              <button
                key={entityKey}
                type="button"
                onClick={() => onSelect(entityKey)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition",
                  active
                    ? "border-slate-900/10 bg-slate-900 text-white shadow-lg shadow-slate-900/10"
                    : "border-slate-200 bg-white/90 text-slate-700 hover:border-slate-300 hover:bg-white",
                )}
              >
                <div className={cn(
                  "grid h-10 w-10 place-items-center rounded-xl",
                  active ? "bg-white/10" : config.toneSoft,
                )}>
                  <Icon className={cn("h-4.5 w-4.5", active ? "text-white" : config.accent)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold">{config.title}</div>
                  <div className={cn("truncate text-xs", active ? "text-white/75" : "text-slate-500")}>
                    {config.subtitle}
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    active ? "bg-white/10 text-white" : "bg-slate-100 text-slate-600",
                  )}
                >
                  {count}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}