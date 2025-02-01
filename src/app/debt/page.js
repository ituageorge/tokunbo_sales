"use client";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Avatar } from "@nextui-org/react";
import SectionHeaders from "../../components/layout/SectionHeaders";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UserTabs from "../../components/layout/UserTabs";

const columns = [
  { uid: "image", name: "Image" },
  { uid: "name", name: "Name" },
  { uid: "phone", name: "Phone Number" },
  { uid: "streetAddress", name: "Street Address" },
  { uid: "view", name: "View" },
];

export default function ProfilePage() {
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  const [debtors, setDebtors] = useState([]);

  useEffect(() => {
    fetch("/api/debtors")
      .then((response) => response.json())
      .then((data) => setDebtors(data));
  }, []);

  const renderCell = (item, columnKey) => {
    if (!item || !columnKey) return ""; // or return a default value
    const user = item[columnKey.uid]; // access the property using columnKey.uid
    switch (columnKey.uid) {
      case "image":
        return (
          <Avatar src={user} className="w-12 h-12 sm:w-20 sm:h-20 text-large" />
        );
      case "name":
        return user ? user : "";
      case "phone":
        return user ? user : "";
      case "streetAddress":
        return user ? user : "";
      case "view":
        return (
          <Link href={`/debt/${item.userId.toString()}`}>
            <Chip className="capitalize" color={statusColorMap.active} size="sm" variant="flat">
              View
            </Chip>
          </Link>
        );
      default:
        return "";
    }
  };

  return (
    <section className="p-4">
      <UserTabs isAdmin={true} />
      <div className="text-center m-3">
        <SectionHeaders mainHeader="Debtors" />
      </div>

      {/* Next UI Table */}
      <div className="overflow-x-auto">
        <Table
          isStriped
          aria-label="Debtors Table"
          className="w-full"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>

          <TableBody items={debtors}>
            {(item) => (
              <TableRow key={uuidv4()}>
                {columns.map((columnKey) => (
                  <TableCell key={uuidv4()}>
                    {renderCell(item, columnKey)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}