export interface ICategoryService {
  id: number;
  name: string;
  description: string;
  created_dt: string; // ISO 8601 datetime string
  created_by: string | null;
  updated_dt: string; // ISO 8601 datetime string
  updated_by: string | null;
  deleted_dt: string | null;
  deleted_by: string | null;
}
