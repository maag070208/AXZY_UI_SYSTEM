/**
 * Versionado y migraciones del formato de pantalla.
 *
 * Un esquema declara `version`. Cuando el formato cambia, el motor aplica la
 * migración registrada para cada salto; si falta, avisa (`JR070`) en lugar de
 * intentar adivinar. Sin este mecanismo, actualizar el motor rompería esquemas
 * guardados por el host.
 */

import { issue, type JsonEngineIssue } from "../shared/errors";
import type { ScreenSchema } from "../kernel/types";

/** Migra un esquema de una versión a la siguiente. */
export type SchemaMigration = (schema: ScreenSchema) => ScreenSchema;

/** Resultado de migrar un esquema. */
export interface MigrationResult {
  /** Esquema migrado (o el original si ya estaba al día). */
  schema: ScreenSchema;
  /** `true` cuando se aplicó alguna migración. */
  migrated: boolean;
  /** Versión de origen. */
  from: number;
  /** Versión de destino. */
  to: number;
  /** Avisos, incluido el de migración ausente. */
  issues: JsonEngineIssue[];
}

/** Migraciones registradas, indexadas por versión de origen. */
export type MigrationRegistry = Record<number, SchemaMigration>;

/** Registro por defecto: vacío (solo existe la versión 1). */
export const DEFAULT_MIGRATIONS: MigrationRegistry = {};

/**
 * Lleva un esquema hasta la versión objetivo aplicando migraciones en cadena.
 *
 * @example
 * migrateSchema({ version: 1, id: "x", content: [] }, 1); // migrated: false
 */
export function migrateSchema(
  schema: ScreenSchema,
  targetVersion: number,
  migrations: MigrationRegistry = DEFAULT_MIGRATIONS
): MigrationResult {
  const from = typeof schema.version === "number" ? schema.version : 0;
  const issues: JsonEngineIssue[] = [];

  if (from === targetVersion) {
    return { schema, migrated: false, from, to: targetVersion, issues };
  }

  if (from > targetVersion) {
    issues.push(
      issue("JR020", `El esquema es de una versión posterior (${from}) a la del motor (${targetVersion}).`, "version", {
        severity: "error",
        hint: "Actualiza el motor; no se puede degradar un esquema.",
      })
    );
    return { schema, migrated: false, from, to: targetVersion, issues };
  }

  let current = schema;
  let version = from;

  while (version < targetVersion) {
    const migration = migrations[version];
    if (!migration) {
      issues.push(
        issue("JR070", `No hay migración registrada de la versión ${version} a la ${version + 1}.`, "version", {
          severity: "error",
          hint: "Registra la migración en `migrations` o guarda el esquema en la versión actual.",
        })
      );
      return { schema: current, migrated: false, from, to: version, issues };
    }
    current = { ...migration(current), version: version + 1 };
    version += 1;
  }

  return { schema: current, migrated: version !== from, from, to: version, issues };
}
