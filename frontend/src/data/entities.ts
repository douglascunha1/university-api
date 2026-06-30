import {
  BookOpen,
  GraduationCap,
  Landmark,
  LibraryBig,
  Link2,
  PencilRuler,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react";

export type EntityKey =
  | "instituicoes"
  | "tipos-curso"
  | "tipos-disciplina"
  | "titulos"
  | "cursos"
  | "disciplinas"
  | "professores"
  | "alunos"
  | "cursa"
  | "leciona";

export type FieldType = "text" | "number" | "date" | "select" | "checkbox";

export type FieldOption = {
  value: number;
  label: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  min?: number;
  step?: string;
  helpText?: string;
  optionsFrom?: EntityKey;
  nullable?: boolean;
  displayValue?: (record: Record<string, unknown>) => string;
};

export type EntityConfig = {
  key: EntityKey;
  route: string;
  title: string;
  subtitle: string;
  icon: typeof Users;
  tone: string;
  toneSoft: string;
  accent: string;
  createLabel: string;
  idField: string;
  summaryFields: string[];
  searchableFields: string[];
  canUpdate: boolean;
  canDelete: boolean;
  canCreate: boolean;
  getRowTitle: (record: Record<string, unknown>) => string;
  getRowSubtitle: (record: Record<string, unknown>) => string;
  getRowMeta: (record: Record<string, unknown>) => Array<string | undefined>;
  getDetailSections: (record: Record<string, unknown>) => Array<{
    label: string;
    value: string | number | boolean | undefined;
  }>;
  fields: FieldConfig[];
  createButtonIcon?: typeof Users;
};

const defaultResult = (label: string, value: unknown) => `${label}: ${String(value ?? "-")}`;

export const entityConfigs: Record<EntityKey, EntityConfig> = {
  instituicoes: {
    key: "instituicoes",
    route: "instituicoes",
    title: "Instituições",
    subtitle: "Base administrativa da universidade",
    icon: Landmark,
    tone: "from-sky-100 via-cyan-50 to-white",
    toneSoft: "bg-sky-50",
    accent: "text-sky-700",
    createLabel: "Nova instituição",
    idField: "id_instituicao",
    summaryFields: ["tx_sigla", "tx_descricao"],
    searchableFields: ["tx_sigla", "tx_descricao"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_sigla ?? "Instituição"),
    getRowSubtitle: (record) => String(record.tx_descricao ?? "Sem descrição"),
    getRowMeta: (record) => [defaultResult("ID", record.id_instituicao)],
    getDetailSections: (record) => [
      { label: "Sigla", value: record.tx_sigla as string | undefined },
      { label: "Descrição", value: record.tx_descricao as string | undefined },
    ],
    fields: [
      { name: "tx_sigla", label: "Sigla", type: "text", required: true, placeholder: "UFPR" },
      {
        name: "tx_descricao",
        label: "Descrição",
        type: "text",
        required: true,
        placeholder: "Universidade Federal do Paraná",
      },
    ],
  },
  "tipos-curso": {
    key: "tipos-curso",
    route: "tipos-curso",
    title: "Tipos de curso",
    subtitle: "Classificação acadêmica dos cursos",
    icon: GraduationCap,
    tone: "from-emerald-100 via-lime-50 to-white",
    toneSoft: "bg-emerald-50",
    accent: "text-emerald-700",
    createLabel: "Novo tipo de curso",
    idField: "id_tipo_curso",
    summaryFields: ["tx_descricao"],
    searchableFields: ["tx_descricao"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_descricao ?? "Tipo de curso"),
    getRowSubtitle: () => "Categoria para organizar cursos",
    getRowMeta: (record) => [defaultResult("ID", record.id_tipo_curso)],
    getDetailSections: (record) => [{ label: "Descrição", value: record.tx_descricao as string | undefined }],
    fields: [{ name: "tx_descricao", label: "Descrição", type: "text", required: true }],
  },
  "tipos-disciplina": {
    key: "tipos-disciplina",
    route: "tipos-disciplina",
    title: "Tipos de disciplina",
    subtitle: "Natureza da disciplina no currículo",
    icon: BookOpen,
    tone: "from-amber-100 via-orange-50 to-white",
    toneSoft: "bg-amber-50",
    accent: "text-amber-700",
    createLabel: "Novo tipo de disciplina",
    idField: "id_tipo_disciplina",
    summaryFields: ["tx_descricao"],
    searchableFields: ["tx_descricao"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_descricao ?? "Tipo de disciplina"),
    getRowSubtitle: () => "Usado para agrupar disciplinas",
    getRowMeta: (record) => [defaultResult("ID", record.id_tipo_disciplina)],
    getDetailSections: (record) => [{ label: "Descrição", value: record.tx_descricao as string | undefined }],
    fields: [{ name: "tx_descricao", label: "Descrição", type: "text", required: true }],
  },
  titulos: {
    key: "titulos",
    route: "titulos",
    title: "Títulos",
    subtitle: "Titulação acadêmica dos professores",
    icon: ShieldCheck,
    tone: "from-rose-100 via-pink-50 to-white",
    toneSoft: "bg-rose-50",
    accent: "text-rose-700",
    createLabel: "Novo título",
    idField: "id_titulo",
    summaryFields: ["tx_descricao"],
    searchableFields: ["tx_descricao"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_descricao ?? "Título"),
    getRowSubtitle: () => "Referência para cadastro de docentes",
    getRowMeta: (record) => [defaultResult("ID", record.id_titulo)],
    getDetailSections: (record) => [{ label: "Descrição", value: record.tx_descricao as string | undefined }],
    fields: [{ name: "tx_descricao", label: "Descrição", type: "text", required: true }],
  },
  cursos: {
    key: "cursos",
    route: "cursos",
    title: "Cursos",
    subtitle: "Oferta curricular por instituição e tipo",
    icon: LibraryBig,
    tone: "from-violet-100 via-indigo-50 to-white",
    toneSoft: "bg-violet-50",
    accent: "text-violet-700",
    createLabel: "Novo curso",
    idField: "id_curso",
    summaryFields: ["tx_descricao", "id_instituicao", "id_tipo_curso"],
    searchableFields: ["tx_descricao"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_descricao ?? "Curso"),
    getRowSubtitle: (record) => {
      const instituicao = record.instituicao as Record<string, unknown> | undefined;
      const tipoCurso = record.tipo_curso as Record<string, unknown> | undefined;
      return `${String(instituicao?.tx_sigla ?? "Sem instituição")} • ${String(tipoCurso?.tx_descricao ?? "Sem tipo")}`;
    },
    getRowMeta: (record) => [
      defaultResult("ID", record.id_curso),
      `Instituição: ${String((record.instituicao as Record<string, unknown> | undefined)?.tx_sigla ?? record.id_instituicao ?? "-")}`,
    ],
    getDetailSections: (record) => [
      { label: "Descrição", value: record.tx_descricao as string | undefined },
      { label: "Instituição", value: (record.instituicao as Record<string, unknown> | undefined)?.tx_descricao as string | undefined },
      { label: "Tipo de curso", value: (record.tipo_curso as Record<string, unknown> | undefined)?.tx_descricao as string | undefined },
    ],
    fields: [
      { name: "id_instituicao", label: "Instituição", type: "select", required: true, optionsFrom: "instituicoes" },
      { name: "id_tipo_curso", label: "Tipo de curso", type: "select", required: true, optionsFrom: "tipos-curso" },
      { name: "tx_descricao", label: "Descrição", type: "text", required: true, placeholder: "Análise e Desenvolvimento de Sistemas" },
    ],
  },
  disciplinas: {
    key: "disciplinas",
    route: "disciplinas",
    title: "Disciplinas",
    subtitle: "Conteúdo acadêmico por curso e tipo",
    icon: PencilRuler,
    tone: "from-teal-100 via-cyan-50 to-white",
    toneSoft: "bg-teal-50",
    accent: "text-teal-700",
    createLabel: "Nova disciplina",
    idField: "id_disciplina",
    summaryFields: ["tx_sigla", "tx_descricao"],
    searchableFields: ["tx_sigla", "tx_descricao"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_sigla ?? "Disciplina"),
    getRowSubtitle: (record) => String(record.tx_descricao ?? "Sem descrição"),
    getRowMeta: (record) => [
      defaultResult("Período", record.in_periodo),
      defaultResult("CH", record.in_carga_horaria),
      `Tipo: ${String((record.tipo_disciplina as Record<string, unknown> | undefined)?.tx_descricao ?? record.id_tipo_disciplina ?? "-")}`,
    ],
    getDetailSections: (record) => [
      { label: "Sigla", value: record.tx_sigla as string | undefined },
      { label: "Descrição", value: record.tx_descricao as string | undefined },
      { label: "Período", value: record.in_periodo as number | undefined },
      { label: "Carga horária", value: record.in_carga_horaria as number | undefined },
      { label: "Curso", value: (record.curso as Record<string, unknown> | undefined)?.tx_descricao as string | undefined },
      { label: "Tipo", value: (record.tipo_disciplina as Record<string, unknown> | undefined)?.tx_descricao as string | undefined },
    ],
    fields: [
      { name: "id_curso", label: "Curso", type: "select", optionsFrom: "cursos", nullable: true, helpText: "Opcional" },
      { name: "id_tipo_disciplina", label: "Tipo de disciplina", type: "select", required: true, optionsFrom: "tipos-disciplina" },
      { name: "tx_sigla", label: "Sigla", type: "text", required: true, placeholder: "LP1" },
      { name: "tx_descricao", label: "Descrição", type: "text", required: true, placeholder: "Lógica de Programação" },
      { name: "in_periodo", label: "Período", type: "number", required: true, min: 1 },
      { name: "in_carga_horaria", label: "Carga horária", type: "number", required: true, min: 40 },
    ],
  },
  professores: {
    key: "professores",
    route: "professores",
    title: "Professores",
    subtitle: "Corpo docente e titulação",
    icon: UserRound,
    tone: "from-cyan-100 via-sky-50 to-white",
    toneSoft: "bg-cyan-50",
    accent: "text-cyan-700",
    createLabel: "Novo professor",
    idField: "id_professor",
    summaryFields: ["tx_nome", "tx_telefone"],
    searchableFields: ["tx_nome", "tx_telefone"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_nome ?? "Professor"),
    getRowSubtitle: (record) => {
      const titulo = record.titulo as Record<string, unknown> | undefined;
      return `${String(titulo?.tx_descricao ?? "Sem título")} • ${String(record.tx_telefone ?? "Sem telefone")}`;
    },
    getRowMeta: (record) => [
      defaultResult("ID", record.id_professor),
      `Sexo: ${String(record.tx_sexo ?? "-")}`,
      `Estado civil: ${String(record.tx_estado_civil ?? "-")}`,
    ],
    getDetailSections: (record) => [
      { label: "Nome", value: record.tx_nome as string | undefined },
      { label: "Título", value: (record.titulo as Record<string, unknown> | undefined)?.tx_descricao as string | undefined },
      { label: "Telefone", value: record.tx_telefone as string | undefined },
      { label: "Nascimento", value: record.dt_nascimento as string | undefined },
      { label: "Sexo", value: record.tx_sexo as string | undefined },
      { label: "Estado civil", value: record.tx_estado_civil as string | undefined },
    ],
    fields: [
      { name: "id_titulo", label: "Título", type: "select", required: true, optionsFrom: "titulos" },
      { name: "tx_nome", label: "Nome", type: "text", required: true, placeholder: "Marina Costa" },
      {
        name: "tx_sexo",
        label: "Sexo",
        type: "select",
        required: true,
        optionsFrom: undefined,
        helpText: "m ou f",
      },
      {
        name: "tx_estado_civil",
        label: "Estado civil",
        type: "select",
        required: true,
        helpText: "s, c ou d",
      },
      { name: "dt_nascimento", label: "Nascimento", type: "date", required: true },
      { name: "tx_telefone", label: "Telefone", type: "text", required: true, placeholder: "41999990000" },
    ],
  },
  alunos: {
    key: "alunos",
    route: "alunos",
    title: "Alunos",
    subtitle: "Cadastro de estudantes",
    icon: Users,
    tone: "from-lime-100 via-emerald-50 to-white",
    toneSoft: "bg-lime-50",
    accent: "text-lime-700",
    createLabel: "Novo aluno",
    idField: "id_aluno",
    summaryFields: ["tx_nome", "tx_sexo", "dt_nascimento"],
    searchableFields: ["tx_nome"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => String(record.tx_nome ?? "Aluno"),
    getRowSubtitle: (record) => `Sexo: ${String(record.tx_sexo ?? "-")} • Nascimento: ${String(record.dt_nascimento ?? "-")}`,
    getRowMeta: (record) => [defaultResult("ID", record.id_aluno)],
    getDetailSections: (record) => [
      { label: "Nome", value: record.tx_nome as string | undefined },
      { label: "Sexo", value: record.tx_sexo as string | undefined },
      { label: "Nascimento", value: record.dt_nascimento as string | undefined },
    ],
    fields: [
      { name: "tx_nome", label: "Nome", type: "text", required: true, placeholder: "João Pereira" },
      {
        name: "tx_sexo",
        label: "Sexo",
        type: "select",
        required: true,
        helpText: "m ou f",
      },
      { name: "dt_nascimento", label: "Nascimento", type: "date", required: true },
    ],
  },
  cursa: {
    key: "cursa",
    route: "cursa",
    title: "Matrículas",
    subtitle: "Histórico acadêmico por aluno e disciplina",
    icon: Link2,
    tone: "from-amber-100 via-yellow-50 to-white",
    toneSoft: "bg-amber-50",
    accent: "text-amber-700",
    createLabel: "Nova matrícula",
    idField: "id_aluno",
    summaryFields: ["id_aluno", "id_disciplina", "in_ano", "in_semestre"],
    searchableFields: ["id_aluno", "id_disciplina"],
    canUpdate: true,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => {
      const aluno = record.aluno as Record<string, unknown> | undefined;
      const disciplina = record.disciplina as Record<string, unknown> | undefined;
      return `${String(aluno?.tx_nome ?? `Aluno ${record.id_aluno}`)} • ${String(disciplina?.tx_sigla ?? `Disciplina ${record.id_disciplina}`)}`;
    },
    getRowSubtitle: (record) => `Ano ${String(record.in_ano ?? "-")} / Semestre ${String(record.in_semestre ?? "-")}`,
    getRowMeta: (record) => [
      `Faltas: ${String(record.in_faltas ?? 0)}`,
      `Aprovado: ${record.bl_aprovado ? "Sim" : "Não"}`,
    ],
    getDetailSections: (record) => [
      { label: "Aluno", value: (record.aluno as Record<string, unknown> | undefined)?.tx_nome as string | undefined },
      { label: "Disciplina", value: (record.disciplina as Record<string, unknown> | undefined)?.tx_descricao as string | undefined },
      { label: "Ano", value: record.in_ano as number | undefined },
      { label: "Semestre", value: record.in_semestre as number | undefined },
      { label: "Faltas", value: record.in_faltas as number | undefined },
      { label: "Aprovado", value: record.bl_aprovado as boolean | undefined },
    ],
    fields: [
      { name: "id_aluno", label: "Aluno", type: "select", required: true, optionsFrom: "alunos" },
      { name: "id_disciplina", label: "Disciplina", type: "select", required: true, optionsFrom: "disciplinas" },
      { name: "in_ano", label: "Ano", type: "number", required: true, min: 2000 },
      { name: "in_semestre", label: "Semestre", type: "number", required: true, min: 1 },
      { name: "in_faltas", label: "Faltas", type: "number", min: 0, nullable: true },
      { name: "nm_nota1", label: "Nota 1", type: "number", step: "0.01", nullable: true },
      { name: "nm_nota2", label: "Nota 2", type: "number", step: "0.01", nullable: true },
      { name: "nm_nota3", label: "Nota 3", type: "number", step: "0.01", nullable: true },
      { name: "bl_aprovado", label: "Aprovado", type: "checkbox", nullable: true },
    ],
  },
  leciona: {
    key: "leciona",
    route: "leciona",
    title: "Leciona",
    subtitle: "Vínculo entre professor e disciplina",
    icon: Link2,
    tone: "from-slate-100 via-stone-50 to-white",
    toneSoft: "bg-slate-50",
    accent: "text-slate-700",
    createLabel: "Novo vínculo",
    idField: "id_professor",
    summaryFields: ["id_professor", "id_disciplina"],
    searchableFields: ["id_professor", "id_disciplina"],
    canUpdate: false,
    canDelete: true,
    canCreate: true,
    getRowTitle: (record) => {
      const professor = record.professor as Record<string, unknown> | undefined;
      const disciplina = record.disciplina as Record<string, unknown> | undefined;
      return `${String(professor?.tx_nome ?? `Professor ${record.id_professor}`)} • ${String(disciplina?.tx_sigla ?? `Disciplina ${record.id_disciplina}`)}`;
    },
    getRowSubtitle: () => "Relacionamento docente/disciplina",
    getRowMeta: (record) => [defaultResult("Professor", record.id_professor), defaultResult("Disciplina", record.id_disciplina)],
    getDetailSections: (record) => [
      { label: "Professor", value: (record.professor as Record<string, unknown> | undefined)?.tx_nome as string | undefined },
      { label: "Disciplina", value: (record.disciplina as Record<string, unknown> | undefined)?.tx_descricao as string | undefined },
    ],
    fields: [
      { name: "id_professor", label: "Professor", type: "select", required: true, optionsFrom: "professores" },
      { name: "id_disciplina", label: "Disciplina", type: "select", required: true, optionsFrom: "disciplinas" },
    ],
  },
};

export const entityOrder: EntityKey[] = [
  "instituicoes",
  "tipos-curso",
  "tipos-disciplina",
  "titulos",
  "cursos",
  "disciplinas",
  "professores",
  "alunos",
  "cursa",
  "leciona",
];

export const entityBadges: Array<{ label: string; value: string; tone: string }> = [
  { label: "Instituições", value: "Base organizacional", tone: "bg-sky-50 text-sky-700" },
  { label: "Currículo", value: "Cursos e disciplinas", tone: "bg-emerald-50 text-emerald-700" },
  { label: "Docência", value: "Professores e títulos", tone: "bg-rose-50 text-rose-700" },
  { label: "Acadêmico", value: "Alunos e matrículas", tone: "bg-amber-50 text-amber-700" },
];
