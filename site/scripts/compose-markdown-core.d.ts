export type MigrationModules = {
  core: string;
  architectureRules: string;
  fileOwnership: string;
  auditOutput: string;
  validation: string;
  overwritePolicy: string;
  cleanup: string;
  finalReport: string;
  start?: string;
  startFinalReport?: string;
  upgrade?: string;
  upgradeFinalReport?: string;
  modes: Record<string, string>;
  themes: Record<string, string>;
  stacks: Record<string, string>;
  contexts: Record<string, string>;
};

export function composeMigrationBrief(input: {
  modules: MigrationModules;
  version: string;
  registryUrl: string;
  theme: string;
  mode: string;
  stack: string;
  contexts: string[];
  projectType: string;
  generatedAt: string;
}): string;

export function composeStartBrief(input: {
  modules: MigrationModules;
  version: string;
  registryUrl: string;
  theme: string;
  contexts: string[];
  generatedAt: string;
}): string;

export function composeUpgradeBrief(input: {
  modules: MigrationModules;
  fromVersion: string;
  toVersion: string;
  registryUrl: string;
  theme: string;
  comparisonHarness?: boolean;
  affectedItems?: string[];
  generatedAt: string;
}): string;
