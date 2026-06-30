import { ChevronRight, Pencil, Plus, Trash2 } from "lucide-react";
import { entityConfigs, type EntityKey } from "../data/entities";
import { cn, formatDate, formatDateTime, formatNumber } from "../lib/utils";

type TableProps = {
  entity: EntityKey;
  records: Record<string, unknown>[];
  loading: boolean;
  onCreate: () => void;
  onEdit: (record: Record<string, unknown>) => void;
  onDelete: (record: Record<string, unknown>) => void;
  onInspect: (record: Record<string, unknown>) => void;
};

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (typeof value === "number") return formatNumber(value);
  if (typeof value === "string") {
    if (/^\d{4}-\d{2}-\d{2}T/.test(value)) return formatDateTime(value);
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return formatDate(value);
    return value;
  }
  return JSON.stringify(value);
}

function recordKey(entity: EntityKey, record: Record<string, unknown>) {
  if (entity === "cursa") {
    return `${record.id_aluno}-${record.id_disciplina}-${record.in_ano}-${record.in_semestre}`;
  }

  if (entity === "leciona") {
    return `${record.id_professor}-${record.id_disciplina}`;
  }

  return String(record[entityConfigs[entity].idField] ?? JSON.stringify(record));
}

export function RecordsTable({
  entity,
  records,
  loading,
  onCreate,
  onEdit,
  onDelete,
  onInspect,
}: TableProps) {
  const config = entityConfigs[entity];

  return (
    <section className="rounded-[30px] border border-white/70 bg-white/92 shadow-[0_18px_50px_rgba(101,120,151,0.10)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{config.title}</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">{config.subtitle}</h2>
        </div>
        {config.canCreate ? (
          <button
            type="button"
            onClick={onCreate}
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            {config.createLabel}
          </button>
        ) : null}
      </div>

      <div className="divide-y divide-slate-100">
        {loading ? (
          <div className="px-6 py-10 text-sm text-slate-500">Carregando registros...</div>
        ) : records.length === 0 ? (
          <div className="px-6 py-10 text-sm text-slate-500">Nenhum registro encontrado para esta entidade.</div>
        ) : (
          records.map((record) => {
            const summary = config.summaryFields.map((field) => formatValue(record[field])).join(" • ");

            return (
              <article key={recordKey(entity, record)} className="px-6 py-5 transition hover:bg-slate-50/80">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="truncate text-lg font-semibold text-slate-900">{config.getRowTitle(record)}</h3>
                      <span className={cn("rounded-full px-3 py-1 text-xs font-medium", config.toneSoft, config.accent)}>
                        {String(record[config.idField] ?? "Sem ID")}
                      </span>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-500">{config.getRowSubtitle(record)}</p>
                    <p className="mt-3 text-sm text-slate-600">{summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {config.getRowMeta(record).map((item) =>
                        item ? (
                          <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {item}
                          </span>
                        ) : null,
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onInspect(record)}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    >
                      Detalhes
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    {config.canUpdate ? (
                      <button
                        type="button"
                        onClick={() => onEdit(record)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </button>
                    ) : null}
                    {config.canDelete ? (
                      <button
                        type="button"
                        onClick={() => onDelete(record)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Excluir
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}