
export interface TestResult {
  name: string;
  status: 'idle' | 'running' | 'success' | 'failed' | 'warning';
  message: string;
  details?: any;
}

export interface IntegrationVerificationPanelProps {
  forcePreviewMode?: boolean;
}

export interface TestItemProps {
  test: TestResult;
  index: number;
  runTest: (index: number) => Promise<void>;
  isRunningAll: boolean;
}
