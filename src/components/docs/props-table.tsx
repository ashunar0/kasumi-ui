import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

type PropDef = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

type PropsTableProps = {
  props: PropDef[];
};

export function PropsTable({ props }: PropsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.map((prop) => (
          <TableRow key={prop.name}>
            <TableCell className="font-mono text-sm">{prop.name}</TableCell>
            <TableCell className="font-mono text-sm text-muted-foreground">
              {prop.type}
            </TableCell>
            <TableCell className="font-mono text-sm">
              {prop.default ?? "—"}
            </TableCell>
            <TableCell>{prop.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
