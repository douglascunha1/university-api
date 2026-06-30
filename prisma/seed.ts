import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando seed...');

  const titulosData = [
    'Graduado', 'Especialista', 'Mestre', 'Doutor', 'Pós-Doutor',
    'Livre-Docente', 'Professor Titular', 'Técnico', 'Pesquisador', 'Bacharel',
  ];
  for (const tx_descricao of titulosData) {
    await prisma.titulo.upsert({ where: { tx_descricao }, update: {}, create: { tx_descricao } });
  }
  const titulos = await prisma.titulo.findMany();
  console.log(`${titulos.length} títulos`);

  const tiposCursoData = [
    'Bacharelado', 'Licenciatura', 'Tecnólogo', 'Pós-Graduação Lato Sensu',
    'Mestrado', 'Doutorado', 'Extensão', 'Técnico', 'Sequencial', 'MBA',
  ];
  for (const tx_descricao of tiposCursoData) {
    await prisma.tipoCurso.upsert({ where: { tx_descricao }, update: {}, create: { tx_descricao } });
  }
  const tiposCurso = await prisma.tipoCurso.findMany();
  console.log(`${tiposCurso.length} tipos de curso`);

  const tiposDisciplinaData = [
    'Obrigatória', 'Optativa', 'Eletiva', 'Complementar', 'Estágio',
    'TCC', 'Atividade Acadêmica', 'Módulo', 'Núcleo Comum', 'Específica',
  ];
  for (const tx_descricao of tiposDisciplinaData) {
    await prisma.tipoDisciplina.upsert({ where: { tx_descricao }, update: {}, create: { tx_descricao } });
  }
  const tiposDisciplina = await prisma.tipoDisciplina.findMany();
  console.log(`${tiposDisciplina.length} tipos de disciplina`);

  const instituicoesData = [
    { tx_sigla: 'USP',     tx_descricao: 'Universidade de São Paulo' },
    { tx_sigla: 'UNICAMP', tx_descricao: 'Universidade Estadual de Campinas' },
    { tx_sigla: 'UFRJ',    tx_descricao: 'Universidade Federal do Rio de Janeiro' },
    { tx_sigla: 'UFMG',    tx_descricao: 'Universidade Federal de Minas Gerais' },
    { tx_sigla: 'UnB',     tx_descricao: 'Universidade de Brasília' },
    { tx_sigla: 'UFRGS',   tx_descricao: 'Universidade Federal do Rio Grande do Sul' },
    { tx_sigla: 'UFPE',    tx_descricao: 'Universidade Federal de Pernambuco' },
    { tx_sigla: 'UFS',     tx_descricao: 'Universidade Federal de Sergipe' },
    { tx_sigla: 'UFBA',    tx_descricao: 'Universidade Federal da Bahia' },
    { tx_sigla: 'UFSC',    tx_descricao: 'Universidade Federal de Santa Catarina' },
  ];
  for (const inst of instituicoesData) {
    await prisma.instituicao.upsert({ where: { tx_sigla: inst.tx_sigla }, update: {}, create: inst });
  }
  const instituicoes = await prisma.instituicao.findMany();
  console.log(`${instituicoes.length} instituições`);

  const idDoutor = titulos.find(t => t.tx_descricao === 'Doutor')!.id_titulo;
  const idMestre = titulos.find(t => t.tx_descricao === 'Mestre')!.id_titulo;
  const idEspec  = titulos.find(t => t.tx_descricao === 'Especialista')!.id_titulo;

  const idUFS  = instituicoes.find(i => i.tx_sigla === 'UFS')!.id_instituicao;
  const idUSP  = instituicoes.find(i => i.tx_sigla === 'USP')!.id_instituicao;
  const idUFRJ = instituicoes.find(i => i.tx_sigla === 'UFRJ')!.id_instituicao;

  const idBach = tiposCurso.find(t => t.tx_descricao === 'Bacharelado')!.id_tipo_curso;
  const idLic  = tiposCurso.find(t => t.tx_descricao === 'Licenciatura')!.id_tipo_curso;
  const idTec  = tiposCurso.find(t => t.tx_descricao === 'Tecnólogo')!.id_tipo_curso;

  const idObrig = tiposDisciplina.find(t => t.tx_descricao === 'Obrigatória')!.id_tipo_disciplina;
  const idOpt   = tiposDisciplina.find(t => t.tx_descricao === 'Optativa')!.id_tipo_disciplina;

  const professoresData = [
    { id_titulo: idDoutor, tx_nome: 'Ana Paula Souza',     tx_sexo: 'f', tx_estado_civil: 'c', dt_nascimento: new Date('1975-03-12'), tx_telefone: '7991234-5678' },
    { id_titulo: idMestre, tx_nome: 'Carlos Eduardo Lima', tx_sexo: 'm', tx_estado_civil: 's', dt_nascimento: new Date('1980-07-22'), tx_telefone: '7999876-5432' },
    { id_titulo: idDoutor, tx_nome: 'Fernanda Costa',      tx_sexo: 'f', tx_estado_civil: 'd', dt_nascimento: new Date('1970-11-05'), tx_telefone: '8188765-4321' },
    { id_titulo: idEspec,  tx_nome: 'Roberto Andrade',     tx_sexo: 'm', tx_estado_civil: 'c', dt_nascimento: new Date('1985-02-18'), tx_telefone: '7998765-0001' },
    { id_titulo: idMestre, tx_nome: 'Juliana Ribeiro',     tx_sexo: 'f', tx_estado_civil: 's', dt_nascimento: new Date('1990-09-30'), tx_telefone: '7991111-2222' },
    { id_titulo: idDoutor, tx_nome: 'Marcos Ferreira',     tx_sexo: 'm', tx_estado_civil: 'c', dt_nascimento: new Date('1968-05-15'), tx_telefone: '7993333-4444' },
    { id_titulo: idEspec,  tx_nome: 'Patrícia Alves',      tx_sexo: 'f', tx_estado_civil: 's', dt_nascimento: new Date('1982-12-01'), tx_telefone: '7995555-6666' },
    { id_titulo: idMestre, tx_nome: 'Thiago Nascimento',   tx_sexo: 'm', tx_estado_civil: 'd', dt_nascimento: new Date('1978-04-25'), tx_telefone: '7997777-8888' },
    { id_titulo: idDoutor, tx_nome: 'Vanessa Oliveira',    tx_sexo: 'f', tx_estado_civil: 'c', dt_nascimento: new Date('1972-08-10'), tx_telefone: '7999999-0000' },
    { id_titulo: idEspec,  tx_nome: 'Diego Carvalho',      tx_sexo: 'm', tx_estado_civil: 's', dt_nascimento: new Date('1995-01-20'), tx_telefone: '7990000-1111' },
  ];
  for (const prof of professoresData) {
    const existing = await prisma.professor.findFirst({ where: { tx_nome: prof.tx_nome } });
    if (!existing) await prisma.professor.create({ data: prof });
  }
  const professores = await prisma.professor.findMany({ orderBy: { id_professor: 'asc' } });
  console.log(`${professores.length} professores`);

  const cursosData = [
    { id_instituicao: idUFS,  id_tipo_curso: idBach, tx_descricao: 'Ciência da Computação' },
    { id_instituicao: idUFS,  id_tipo_curso: idBach, tx_descricao: 'Sistemas de Informação' },
    { id_instituicao: idUSP,  id_tipo_curso: idBach, tx_descricao: 'Engenharia de Software' },
    { id_instituicao: idUSP,  id_tipo_curso: idLic,  tx_descricao: 'Matemática' },
    { id_instituicao: idUFRJ, id_tipo_curso: idBach, tx_descricao: 'Engenharia de Computação' },
    { id_instituicao: idUFRJ, id_tipo_curso: idTec,  tx_descricao: 'Redes de Computadores' },
    { id_instituicao: idUFS,  id_tipo_curso: idLic,  tx_descricao: 'Física' },
    { id_instituicao: idUSP,  id_tipo_curso: idBach, tx_descricao: 'Estatística' },
    { id_instituicao: idUFRJ, id_tipo_curso: idBach, tx_descricao: 'Matemática Aplicada' },
    { id_instituicao: idUFS,  id_tipo_curso: idTec,  tx_descricao: 'Análise e Desenvolvimento de Sistemas' },
  ];
  for (const curso of cursosData) {
    await prisma.curso.upsert({
      where:  { id_instituicao_id_tipo_curso_tx_descricao: { id_instituicao: curso.id_instituicao, id_tipo_curso: curso.id_tipo_curso, tx_descricao: curso.tx_descricao } },
      update: {},
      create: curso,
    });
  }
  const cursos = await prisma.curso.findMany({ orderBy: { id_curso: 'asc' } });
  console.log(`${cursos.length} cursos`);

  const idCC = cursos.find(c => c.tx_descricao === 'Ciência da Computação')!.id_curso;
  const idSI = cursos.find(c => c.tx_descricao === 'Sistemas de Informação')!.id_curso;

  const disciplinasData = [
    { id_curso: idCC, id_tipo_disciplina: idObrig, tx_sigla: 'CALC1',  tx_descricao: 'Cálculo I',                       in_periodo: 1, in_carga_horaria: 80 },
    { id_curso: idCC, id_tipo_disciplina: idObrig, tx_sigla: 'ALGO1',  tx_descricao: 'Algoritmos e Programação I',      in_periodo: 1, in_carga_horaria: 80 },
    { id_curso: idCC, id_tipo_disciplina: idObrig, tx_sigla: 'BD1',    tx_descricao: 'Banco de Dados I',                in_periodo: 3, in_carga_horaria: 60 },
    { id_curso: idCC, id_tipo_disciplina: idObrig, tx_sigla: 'SO1',    tx_descricao: 'Sistemas Operacionais',           in_periodo: 4, in_carga_horaria: 60 },
    { id_curso: idCC, id_tipo_disciplina: idOpt,   tx_sigla: 'IA1',    tx_descricao: 'Inteligência Artificial',         in_periodo: 5, in_carga_horaria: 60 },
    { id_curso: idSI, id_tipo_disciplina: idObrig, tx_sigla: 'ES1',    tx_descricao: 'Engenharia de Software I',        in_periodo: 3, in_carga_horaria: 60 },
    { id_curso: idSI, id_tipo_disciplina: idObrig, tx_sigla: 'REDES1', tx_descricao: 'Fundamentos de Redes',            in_periodo: 2, in_carga_horaria: 60 },
    { id_curso: idSI, id_tipo_disciplina: idOpt,   tx_sigla: 'SEGC1',  tx_descricao: 'Segurança Computacional',         in_periodo: 6, in_carga_horaria: 40 },
    { id_curso: idCC, id_tipo_disciplina: idObrig, tx_sigla: 'POO1',   tx_descricao: 'Programação Orientada a Objetos', in_periodo: 2, in_carga_horaria: 60 },
    { id_curso: idSI, id_tipo_disciplina: idObrig, tx_sigla: 'APS1',   tx_descricao: 'Análise e Projeto de Sistemas',   in_periodo: 4, in_carga_horaria: 60 },
  ];
  for (const disc of disciplinasData) {
    await prisma.disciplina.upsert({ where: { tx_sigla: disc.tx_sigla }, update: {}, create: disc });
  }
  const disciplinas = await prisma.disciplina.findMany({ orderBy: { id_disciplina: 'asc' } });
  console.log(`${disciplinas.length} disciplinas`);

  for (let i = 0; i < disciplinas.length; i++) {
    const l = { id_professor: professores[i % professores.length].id_professor, id_disciplina: disciplinas[i].id_disciplina };
    await prisma.leciona.upsert({
      where:  { id_professor_id_disciplina: { id_professor: l.id_professor, id_disciplina: l.id_disciplina } },
      update: {},
      create: l,
    });
  }
  const lecionaCount = await prisma.leciona.count();
  console.log(`${lecionaCount} registros em leciona`);

  const alunosData = [
    { tx_nome: 'Lucas Henrique Santos', tx_sexo: 'm', dt_nascimento: new Date('2001-04-15') },
    { tx_nome: 'Gabriela Menezes',      tx_sexo: 'f', dt_nascimento: new Date('2002-08-22') },
    { tx_nome: 'Pedro Augusto Farias',  tx_sexo: 'm', dt_nascimento: new Date('2000-12-10') },
    { tx_nome: 'Beatriz Lima',          tx_sexo: 'f', dt_nascimento: new Date('2003-03-30') },
    { tx_nome: 'Vitor Hugo Pereira',    tx_sexo: 'm', dt_nascimento: new Date('2001-07-05') },
    { tx_nome: 'Larissa Rodrigues',     tx_sexo: 'f', dt_nascimento: new Date('2002-01-18') },
    { tx_nome: 'Felipe Torres',         tx_sexo: 'm', dt_nascimento: new Date('2000-09-25') },
    { tx_nome: 'Isabela Castro',        tx_sexo: 'f', dt_nascimento: new Date('2003-06-11') },
    { tx_nome: 'Gustavo Marques',       tx_sexo: 'm', dt_nascimento: new Date('2001-11-02') },
    { tx_nome: 'Amanda Ferreira Dias',  tx_sexo: 'f', dt_nascimento: new Date('2002-05-20') },
  ];
  for (const aluno of alunosData) {
    const existing = await prisma.aluno.findFirst({ where: { tx_nome: aluno.tx_nome } });
    if (!existing) await prisma.aluno.create({ data: aluno });
  }
  const alunos = await prisma.aluno.findMany({ orderBy: { id_aluno: 'asc' } });
  console.log(`${alunos.length} alunos`);

  const cursaData = [
    { id_aluno: alunos[0].id_aluno, id_disciplina: disciplinas[0].id_disciplina, in_ano: 2024, in_semestre: 1, in_faltas: 2, nm_nota1: 8.5,  nm_nota2: 7.0, nm_nota3: 9.0,  bl_aprovado: true  },
    { id_aluno: alunos[0].id_aluno, id_disciplina: disciplinas[1].id_disciplina, in_ano: 2024, in_semestre: 1, in_faltas: 0, nm_nota1: 9.0,  nm_nota2: 9.5, nm_nota3: 10.0, bl_aprovado: true  },
    { id_aluno: alunos[1].id_aluno, id_disciplina: disciplinas[0].id_disciplina, in_ano: 2024, in_semestre: 1, in_faltas: 5, nm_nota1: 5.0,  nm_nota2: 6.0, nm_nota3: 7.0,  bl_aprovado: true  },
    { id_aluno: alunos[1].id_aluno, id_disciplina: disciplinas[2].id_disciplina, in_ano: 2024, in_semestre: 2, in_faltas: 3, nm_nota1: 4.0,  nm_nota2: 3.5, nm_nota3: null, bl_aprovado: false },
    { id_aluno: alunos[2].id_aluno, id_disciplina: disciplinas[3].id_disciplina, in_ano: 2024, in_semestre: 1, in_faltas: 1, nm_nota1: 8.0,  nm_nota2: 8.5, nm_nota3: 9.0,  bl_aprovado: true  },
    { id_aluno: alunos[3].id_aluno, id_disciplina: disciplinas[4].id_disciplina, in_ano: 2024, in_semestre: 2, in_faltas: 0, nm_nota1: 10.0, nm_nota2: 9.0, nm_nota3: 9.5,  bl_aprovado: true  },
    { id_aluno: alunos[4].id_aluno, id_disciplina: disciplinas[5].id_disciplina, in_ano: 2024, in_semestre: 1, in_faltas: 8, nm_nota1: 3.0,  nm_nota2: 4.0, nm_nota3: 5.0,  bl_aprovado: false },
    { id_aluno: alunos[5].id_aluno, id_disciplina: disciplinas[6].id_disciplina, in_ano: 2024, in_semestre: 2, in_faltas: 2, nm_nota1: 7.5,  nm_nota2: 8.0, nm_nota3: 7.0,  bl_aprovado: true  },
    { id_aluno: alunos[6].id_aluno, id_disciplina: disciplinas[7].id_disciplina, in_ano: 2024, in_semestre: 1, in_faltas: 4, nm_nota1: 6.0,  nm_nota2: 7.0, nm_nota3: 8.0,  bl_aprovado: true  },
    { id_aluno: alunos[7].id_aluno, id_disciplina: disciplinas[8].id_disciplina, in_ano: 2024, in_semestre: 2, in_faltas: 0, nm_nota1: 9.5,  nm_nota2: 9.0, nm_nota3: 10.0, bl_aprovado: true  },
  ];
  for (const c of cursaData) {
    await prisma.cursa.upsert({
      where:  { id_aluno_id_disciplina_in_ano_in_semestre: { id_aluno: c.id_aluno, id_disciplina: c.id_disciplina, in_ano: c.in_ano, in_semestre: c.in_semestre } },
      update: {},
      create: c,
    });
  }
  const cursaCount = await prisma.cursa.count();
  console.log(`${cursaCount} registros em cursa`);

  console.log('\nSeed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });