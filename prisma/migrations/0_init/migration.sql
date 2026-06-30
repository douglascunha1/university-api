-- ============================================================
-- DDL - Sistema Universitário
-- SGBD: PostgreSQL
-- ============================================================

-- ─── Lookup Tables ──────────────────────────────────────────

CREATE TABLE titulo (
  id_titulo    SERIAL        PRIMARY KEY,
  tx_descricao VARCHAR(150)  NOT NULL UNIQUE
);

CREATE TABLE tipo_curso (
  id_tipo_curso SERIAL        PRIMARY KEY,
  tx_descricao  VARCHAR(150)  NOT NULL UNIQUE
);

CREATE TABLE tipo_disciplina (
  id_tipo_disciplina SERIAL        PRIMARY KEY,
  tx_descricao       VARCHAR(150)  NOT NULL UNIQUE
);

-- ─── Instituição ────────────────────────────────────────────

CREATE TABLE instituicao (
  id_instituicao SERIAL        PRIMARY KEY,
  tx_sigla       VARCHAR(15)   NOT NULL UNIQUE,
  tx_descricao   VARCHAR(150)  NOT NULL UNIQUE
);

-- ─── Professor ──────────────────────────────────────────────

CREATE TABLE professor (
  id_professor    SERIAL       PRIMARY KEY,
  id_titulo       INTEGER      NOT NULL,
  tx_nome         VARCHAR(50)  NOT NULL,
  tx_sexo         CHAR(1)      NOT NULL DEFAULT 'm',
  tx_estado_civil CHAR(1)      NOT NULL DEFAULT 's',
  dt_nascimento   DATE         NOT NULL,
  tx_telefone     VARCHAR(13)  NOT NULL,

  CONSTRAINT fk_professor_titulo
    FOREIGN KEY (id_titulo) REFERENCES titulo (id_titulo)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT chk_professor_sexo
    CHECK (tx_sexo IN ('m', 'f')),

  CONSTRAINT chk_professor_estado_civil
    CHECK (tx_estado_civil IN ('s', 'c', 'd'))
);

-- ─── Curso ──────────────────────────────────────────────────

CREATE TABLE curso (
  id_curso       SERIAL        PRIMARY KEY,
  id_instituicao INTEGER       NOT NULL,
  id_tipo_curso  INTEGER       NOT NULL,
  tx_descricao   VARCHAR(150)  NOT NULL,

  CONSTRAINT fk_curso_instituicao
    FOREIGN KEY (id_instituicao) REFERENCES instituicao (id_instituicao)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT fk_curso_tipo_curso
    FOREIGN KEY (id_tipo_curso) REFERENCES tipo_curso (id_tipo_curso)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT uq_curso
    UNIQUE (id_instituicao, id_tipo_curso, tx_descricao)
);

-- ─── Disciplina ─────────────────────────────────────────────

CREATE TABLE disciplina (
  id_disciplina      SERIAL        PRIMARY KEY,
  id_curso           INTEGER,
  id_tipo_disciplina INTEGER       NOT NULL,
  tx_sigla           VARCHAR(10)   NOT NULL UNIQUE,
  tx_descricao       VARCHAR(150)  NOT NULL UNIQUE,
  in_periodo         INTEGER       NOT NULL,
  in_carga_horaria   INTEGER       NOT NULL,

  CONSTRAINT fk_disciplina_curso
    FOREIGN KEY (id_curso) REFERENCES curso (id_curso)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT fk_disciplina_tipo
    FOREIGN KEY (id_tipo_disciplina) REFERENCES tipo_disciplina (id_tipo_disciplina)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT chk_disciplina_periodo
    CHECK (in_periodo >= 1),

  CONSTRAINT chk_disciplina_carga_horaria
    CHECK (in_carga_horaria >= 40)
);

-- ─── Leciona (Professor × Disciplina) ───────────────────────

CREATE TABLE leciona (
  id_professor  INTEGER NOT NULL,
  id_disciplina INTEGER NOT NULL,

  PRIMARY KEY (id_professor, id_disciplina),

  CONSTRAINT fk_leciona_professor
    FOREIGN KEY (id_professor) REFERENCES professor (id_professor)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT fk_leciona_disciplina
    FOREIGN KEY (id_disciplina) REFERENCES disciplina (id_disciplina)
    ON UPDATE CASCADE ON DELETE CASCADE
);

-- ─── Aluno ──────────────────────────────────────────────────

CREATE TABLE aluno (
  id_aluno      SERIAL        PRIMARY KEY,
  tx_nome       VARCHAR(100)  NOT NULL,
  tx_sexo       CHAR(1)       NOT NULL,
  dt_nascimento DATE          NOT NULL,

  CONSTRAINT chk_aluno_sexo
    CHECK (tx_sexo IN ('m', 'f'))
);

-- ─── Cursa (Aluno × Disciplina) ─────────────────────────────

CREATE TABLE cursa (
  id_aluno      INTEGER         NOT NULL,
  id_disciplina INTEGER         NOT NULL,
  in_ano        INTEGER         NOT NULL,
  in_semestre   INTEGER         NOT NULL,
  in_faltas     INTEGER         NOT NULL DEFAULT 0,
  nm_nota1      NUMERIC(4,2),
  nm_nota2      NUMERIC(4,2),
  nm_nota3      NUMERIC(4,2),
  bl_aprovado   BOOLEAN         NOT NULL DEFAULT FALSE,

  PRIMARY KEY (id_aluno, id_disciplina, in_ano, in_semestre),

  CONSTRAINT fk_cursa_aluno
    FOREIGN KEY (id_aluno) REFERENCES aluno (id_aluno)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT fk_cursa_disciplina
    FOREIGN KEY (id_disciplina) REFERENCES disciplina (id_disciplina)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT chk_cursa_faltas
    CHECK (in_faltas >= 0),

  CONSTRAINT chk_cursa_nota1
    CHECK (nm_nota1 IS NULL OR nm_nota1 >= 0),

  CONSTRAINT chk_cursa_nota2
    CHECK (nm_nota2 IS NULL OR nm_nota2 >= 0),

  CONSTRAINT chk_cursa_nota3
    CHECK (nm_nota3 IS NULL OR nm_nota3 >= 0)
);
