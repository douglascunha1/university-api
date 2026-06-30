import { type EntityKey, entityConfigs } from "../data/entities";

type StatsProps = {
  selected: EntityKey;
  totalRecords: number;
  selectedCount: number;
  relationCount: number;
};

export function Stats({ selected, totalRecords, selectedCount, relationCount }: StatsProps) {
  const config = entityConfigs[selected];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(101,120,151,0.10)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Inventário total</div>
        <div className="mt-3 text-3xl font-semibold text-slate-900">{totalRecords}</div>
        <div className="mt-2 text-sm text-slate-500">Registros carregados em todas as entidades.</div>
      </div>
      <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(101,120,151,0.10)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Entidade ativa</div>
        <div className="mt-3 text-3xl font-semibold text-slate-900">{config.title}</div>
        <div className="mt-2 text-sm text-slate-500">{selectedCount} itens visíveis na lista atual.</div>
      </div>
      <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_50px_rgba(101,120,151,0.10)]">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Relações exibidas</div>
        <div className="mt-3 text-3xl font-semibold text-slate-900">{relationCount}</div>
        <div className="mt-2 text-sm text-slate-500">Campos com vínculos e informações aninhadas.</div>
      </div>
    </div>
  );
}