export interface EditorContent {
  id?: number;
  html_content: string;
  text_content: string;
  json_content: string;
  created_at?: string;
}

export interface DatabaseResult {
  insertId?: number;
  rowsAffected: number;
  rows: {
    length: number;
    item: (index: number) => any;
    _array: EditorContent[];
  };
}

export type SQLiteCallback = (
  tx: SQLite.SQLTransaction,
  error: SQLite.SQLError,
) => boolean;
