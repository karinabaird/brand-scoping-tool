declare module 'xlsx' {
  interface ColInfo {
    wch?: number;
  }

  interface WorkSheet {
    '!cols'?: ColInfo[];
    [key: string]: unknown;
  }

  interface WorkBook {
    SheetNames: string[];
    Sheets: Record<string, WorkSheet>;
  }

  namespace utils {
    function aoa_to_sheet(data: unknown[][]): WorkSheet;
    function book_new(): WorkBook;
    function book_append_sheet(wb: WorkBook, ws: WorkSheet, name?: string): void;
  }

  function writeFile(wb: WorkBook, filename: string): void;
}
