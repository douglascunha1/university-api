import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { entityConfigs, type EntityKey, type FieldOption } from "../data/entities";
import { cn } from "../lib/utils";

type FormModalProps = {
  entity: EntityKey;
  open: boolean;
  initialValues: Record<string, unknown> | null;
  options: Partial<Record<EntityKey, FieldOption[]>>;
  onClose: () => void;
  onSubmit: (values: Record<string, unknown>) => Promise<void> | void;
};

function createInitialState(entity: EntityKey, initialValues: Record<string, unknown> | null) {
  const config = entityConfigs[entity];
  const nextState: Record<string, unknown> = {};

  for (const field of config.fields) {
    const value = initialValues?.[field.name];
    if (field.type === "checkbox") {
      nextState[field.name] = Boolean(value ?? false);
      continue;
    }

    if (value === null || value === undefined) {
      nextState[field.name] = field.nullable ? "" : "";
      continue;
    }

    if (field.type === "date" && typeof value === "string") {
      nextState[field.name] = value.slice(0, 10);
      continue;
    }

    nextState[field.name] = value;
  }

  return nextState;
}

const stringSelectFields = new Set(["tx_sexo", "tx_estado_civil"]);

function fieldToPayloadValue(name: string, type: string, value: unknown, nullable?: boolean) {
  if (type === "checkbox") return Boolean(value);
  if (value === "" || value === null || value === undefined) return nullable ? null : "";
  if (type === "select" && stringSelectFields.has(name)) return String(value);
  if (type === "number" || type === "select") return Number(value);
  return value;
}

export function FormModal({ open, entity, initialValues, options, onClose, onSubmit }: FormModalProps) {
  const config = entityConfigs[entity];
  const [values, setValues] = useState<Record<string, unknown>>(() => createInitialState(entity, initialValues));
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) setValues(createInitialState(entity, initialValues));
  }, [entity, initialValues, open]);

  const title = initialValues ? `Editar ${config.title.toLowerCase()}` : config.createLabel;
  const subtitle = initialValues
    ? "Atualize os campos necessários e salve a alteração."
    : "Preencha os campos para criar um novo registro.";

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = Object.fromEntries(
        config.fields.map((field) => [field.name, fieldToPayloadValue(field.name, field.type, values[field.name], field.nullable)]),
      );

      await onSubmit(payload);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/25 p-4 backdrop-blur-sm md:items-center">
      <div className="w-full max-w-3xl overflow-hidden rounded-[30px] border border-white/80 bg-white shadow-[0_28px_100px_rgba(15,23,42,0.22)]">
        <div className={cn("px-6 py-5", config.tone)}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Formulário</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{subtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-white/80 p-2 text-slate-500 transition hover:bg-white hover:text-slate-800"
              aria-label="Fechar formulário"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[78vh] overflow-y-auto p-6">
          <div className="grid gap-4 md:grid-cols-2">
            {config.fields.map((field) => {
              const fieldValue = values[field.name];
              const id = `field-${field.name}`;

              if (field.type === "checkbox") {
                return (
                  <label key={field.name} className="flex min-h-24 items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{field.label}</div>
                      {field.helpText ? <div className="mt-1 text-xs leading-5 text-slate-500">{field.helpText}</div> : null}
                    </div>
                    <input
                      checked={Boolean(fieldValue)}
                      onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.checked }))}
                      type="checkbox"
                      className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    />
                  </label>
                );
              }

              const optionList = field.optionsFrom ? options[field.optionsFrom] ?? [] : [];

              return (
                <label key={field.name} className={field.type === "select" ? "md:col-span-1" : "md:col-span-1"} htmlFor={id}>
                  <div className="mb-2 flex items-end justify-between gap-3">
                    <span className="text-sm font-semibold text-slate-700">
                      {field.label}
                      {field.required ? <span className="ml-1 text-rose-500">*</span> : null}
                    </span>
                    {field.helpText ? <span className="text-xs text-slate-400">{field.helpText}</span> : null}
                  </div>

                  {field.type === "select" ? (
                    <select
                      id={id}
                      value={String(fieldValue ?? "")}
                      onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                    >
                      <option value="">Selecione</option>
                      {field.name === "tx_sexo" ? (
                        <>
                          <option value="m">Masculino</option>
                          <option value="f">Feminino</option>
                        </>
                      ) : null}
                      {field.name === "tx_estado_civil" ? (
                        <>
                          <option value="s">Solteiro</option>
                          <option value="c">Casado</option>
                          <option value="d">Divorciado</option>
                        </>
                      ) : null}
                      {field.optionsFrom ? (
                        optionList.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))
                      ) : null}
                    </select>
                  ) : (
                    <input
                      id={id}
                      value={String(fieldValue ?? "")}
                      min={field.min}
                      step={field.step}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.name]: field.type === "number" ? event.target.value : event.target.value,
                        }))
                      }
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400"
                    />
                  )}
                </label>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Salvando..." : "Salvar registro"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}