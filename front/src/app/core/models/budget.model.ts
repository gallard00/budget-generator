import { BudgetItem } from './budget-item.model';

export interface Budget {
  id?: number;
  date: string;
  total?: number;
  clientId: number;
  client?: string;
  items: BudgetItem[];
}
