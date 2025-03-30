
export interface AuditResult {
  pass: boolean;
  element?: HTMLElement;
  issue?: string;
  severity: 'critical' | 'warning' | 'info';
  suggestion?: string;
}

export interface AuditSummary {
  totalIssues: number;
  criticalIssues: number;
  warningIssues: number;
  infoIssues: number;
  results: AuditResult[];
}
