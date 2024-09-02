import * as React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Job } from "@/model/Job";

interface HeadCell {
  id: keyof Job;
  label: string;
  isEndCell: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "name",
    isEndCell: false,
    label: "File Name",
  },
  {
    id: "status",
    isEndCell: false,
    label: "Status",
  },
  {
    id: "createdAt",
    isEndCell: true,
    label: "Created At",
  },
];

interface TableHeadProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Job
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: "asc" | "desc";
  orderBy: string;
  rowCount: number;
}

/**
 * This header component is used to display the table header with sorting capabilities.
 * @param props the properties of the table header, including the number of selected items, the sort order, and the sort order
 * @returns 
 */
export default function SortableTableHeader(props: TableHeadProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Job) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all jobs" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.isEndCell ? "right" : "left"}
            padding={headCell.isEndCell ? "normal" : "none"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
