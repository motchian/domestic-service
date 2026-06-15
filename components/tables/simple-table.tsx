import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type SimpleTableProps<T> = {
  columns: { key: keyof T | string; label: string; render?: (row: T) => React.ReactNode }[];
  rows: T[];
};

export function SimpleTable<T extends { id: string }>({ columns, rows }: SimpleTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={String(column.key)}>{column.label}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={String(column.key)}>
                {column.render ? column.render(row) : String(row[column.key as keyof T] ?? "")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
