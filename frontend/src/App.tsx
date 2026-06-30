import { useEffect, useMemo, useState } from "react";
import { BookOpenCheck, RefreshCw } from "lucide-react";
import { Shell } from "./components/shell";
import { Sidebar } from "./components/sidebar";
import { Stats } from "./components/stats";
import { RecordsTable } from "./components/table";
import { FormModal } from "./components/form-modal";
import { Toast } from "./components/toast";
import { createRecord, deleteRecord, listRecords, updateRecord } from "./lib/api";
import { entityConfigs, entityOrder, type EntityKey, type FieldOption } from "./data/entities";
import { cn, formatDateTime } from "./lib/utils";

type RecordMap = Partial<Record<EntityKey, Record<string, unknown>[]>>;
type OptionMap = Partial<Record<EntityKey, FieldOption[]>>;

function toOptionLabel(entity: EntityKey, record: Record<string, unknown>) {
  const config = entityConfigs[entity];
  return config.getRowTitle(record);
}

function makeOptions(entity: EntityKey, records: Record<string, unknown>[]): FieldOption[] {
  const config = entityConfigs[entity];
  return records.map((record) => {
    const value = Number(record[config.idField]);
    const label = toOptionLabel(entity, record);
    return { value, label };
  });
}

function buildEditPath(entity: EntityKey, record: Record<string, unknown>) {
  if (entity === "cursa") {
    return `/${record.id_aluno}/${record.id_disciplina}/${record.in_ano}/${record.in_semestre}`;
  }
  if (entity === "leciona") {
    return `/${record.id_professor}/${record.id_disciplina}`;
  }
  return `/${record[entityConfigs[entity].idField]}`;
}

function relationCount(record: Record<string, unknown>) {
  return Object.values(record).filter((value) => value && typeof value === "object" && !Array.isArray(value)).length;
}

export default function App() {
  const [selectedEntity, setSelectedEntity] = useState<EntityKey>("cursos");
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState<RecordMap>({});
  const [options, setOptions] = useState<OptionMap>({});
  const [loadingEntity, setLoadingEntity] = useState<Record<EntityKey, boolean>>({} as Record<EntityKey, boolean>);
  const [toast, setToast] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Record<string, unknown> | null>(null);
  const [inspectedRecord, setInspectedRecord] = useState<Record<string, unknown> | null>(null);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    async function bootstrap() {
      try {
        const loaded = await Promise.all(entityOrder.map(async (entity) => [entity, await listRecords(entityConfigs[entity].route)] as const));
        const nextRecords = Object.fromEntries(loaded) as RecordMap;
        setRecords(nextRecords);

        const nextOptions: OptionMap = {};
        for (const entity of entityOrder) {
          nextOptions[entity] = makeOptions(entity, nextRecords[entity] ?? []);
        }
        setOptions(nextOptions);
        setLastSync(new Date().toISOString());
      } catch (error) {
        setToast(error instanceof Error ? error.message : "Falha ao carregar dados da API.");
      }
    }

    void bootstrap();
  }, []);

  async function refreshEntity(entity: EntityKey) {
    setLoadingEntity((current) => ({ ...current, [entity]: true }));
    try {
      const response = await listRecords(entityConfigs[entity].route);
      setRecords((current) => ({ ...current, [entity]: response }));
      setOptions((current) => ({ ...current, [entity]: makeOptions(entity, response) }));
      setLastSync(new Date().toISOString());
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Falha ao atualizar os dados.");
    } finally {
      setLoadingEntity((current) => ({ ...current, [entity]: false }));
    }
  }

  const selectedRecords = records[selectedEntity] ?? [];
  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return selectedRecords;

    const config = entityConfigs[selectedEntity];

    return selectedRecords.filter((record) => {
      const haystack = config.searchableFields
        .map((field) => String(record[field] ?? "").toLowerCase())
        .join(" ");
      return haystack.includes(query) || config.getRowTitle(record).toLowerCase().includes(query);
    });
  }, [search, selectedEntity, selectedRecords]);

  const totalRecords = Object.values(records).reduce((sum, item) => sum + (item?.length ?? 0), 0);
  const selectedCount = filteredRecords.length;
  const selectedRelationCount = selectedRecords.reduce((sum, record) => sum + relationCount(record), 0);

  async function handleSubmit(values: Record<string, unknown>) {
    const config = entityConfigs[selectedEntity];

    try {
      if (editingRecord) {
        await updateRecord(config.route, buildEditPath(selectedEntity, editingRecord), values);
        setToast(`${config.title} atualizado com sucesso.`);
      } else {
        await createRecord(config.route, values);
        setToast(`${config.title} criado com sucesso.`);
      }

      setModalOpen(false);
      setEditingRecord(null);
      await refreshEntity(selectedEntity);
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Não foi possível salvar o registro.");
    }
  }

  async function handleDelete(record: Record<string, unknown>) {
    const config = entityConfigs[selectedEntity];
    const confirmed = window.confirm(`Remover este registro de ${config.title.toLowerCase()}?`);
    if (!confirmed) return;

    try {
      await deleteRecord(config.route, buildEditPath(selectedEntity, record));
      setToast(`${config.title} removido com sucesso.`);
      await refreshEntity(selectedEntity);
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Não foi possível excluir o registro.");
    }
  }

  const activeConfig = entityConfigs[selectedEntity];

  return (
    <Shell
      sidebar={
        <Sidebar
          selected={selectedEntity}
          onSelect={(entity) => {
            setSelectedEntity(entity);
            setSearch("");
          }}
          search={search}
          onSearchChange={setSearch}
          totalRecords={totalRecords}
          counts={Object.fromEntries(entityOrder.map((entity) => [entity, records[entity]?.length ?? 0])) as Record<EntityKey, number>}
        />
      }
    >
      <div className="space-y-6 pb-8 md:space-y-8">
        <header className="overflow-hidden rounded-[34px] border border-white/70 bg-white/88 shadow-[0_18px_70px_rgba(101,120,151,0.12)]">
          <div className={cn("p-6 md:p-8", activeConfig.tone)}>
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Dashboard universitário</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                  Gestão acadêmica com uma interface leve, clara e funcional.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                  Navegue entre instituições, cursos, disciplinas, pessoas e vínculos.
                </p>
              </div>
            </div>
          </div>
        </header>

        <Stats selected={selectedEntity} totalRecords={totalRecords} selectedCount={selectedCount} relationCount={selectedRelationCount} />

        <RecordsTable
          entity={selectedEntity}
          records={filteredRecords}
          loading={Boolean(loadingEntity[selectedEntity])}
          onCreate={() => {
            setEditingRecord(null);
            setModalOpen(true);
          }}
          onEdit={(record) => {
            setEditingRecord(record);
            setModalOpen(true);
          }}
          onDelete={(record) => void handleDelete(record)}
          onInspect={(record) => setInspectedRecord(record)}
        />
      </div>

      <FormModal
        entity={selectedEntity}
        open={modalOpen}
        initialValues={editingRecord}
        options={options}
        onClose={() => {
          setModalOpen(false);
          setEditingRecord(null);
        }}
        onSubmit={handleSubmit}
      />

      {inspectedRecord ? (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-slate-950/20 p-4 backdrop-blur-sm md:items-center">
          <div className="w-full max-w-2xl rounded-[30px] border border-white/80 bg-white shadow-[0_28px_100px_rgba(15,23,42,0.22)]">
            <div className={cn("rounded-t-[30px] px-6 py-5", activeConfig.tone)}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Detalhes</p>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-900">{activeConfig.getRowTitle(inspectedRecord)}</h3>
                  <p className="mt-2 text-sm text-slate-600">{activeConfig.getRowSubtitle(inspectedRecord)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setInspectedRecord(null)}
                  className="rounded-full bg-white/80 p-2 text-slate-500 transition hover:bg-white hover:text-slate-800"
                  aria-label="Fechar detalhes"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-6">
              <div className="grid gap-3 md:grid-cols-2">
                {activeConfig.getDetailSections(inspectedRecord).map((section) => (
                  <div key={section.label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{section.label}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-700">{String(section.value ?? "-")}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                ID: <span className="font-semibold text-slate-800">{String(inspectedRecord[activeConfig.idField] ?? "-")}</span>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setInspectedRecord(null)}
                  className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Toast message={toast} onClose={() => setToast(null)} />
    </Shell>
  );
}