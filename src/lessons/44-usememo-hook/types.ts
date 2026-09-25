export interface Product {
  id: number;
  name: string;
}

export interface CallStats {
  calls: number;
  lastMs: number;
}

export interface ChartOptions {
  color: string;
  showGrid: boolean;
}
