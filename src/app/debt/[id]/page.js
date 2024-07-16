"use client";
import React, { Fragment, useCallback } from "react";
import SectionHeaders from "../../../components/layout/SectionHeaders";

import { useEffect, useState } from "react";

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Tooltip} from "@nextui-org/react";
import { DeleteIcon } from "../../../components/nextUiItems/DeleteIcon";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import InputField  from "../../../components/InputComponent/InputField";

import { v4 as uuidv4 } from "uuid";
import Link from "next/link";

export default function DebtPagePayment() {
  const session = useSession();
  const {status} = session;
  // const { data: profileData } = useProfile();
  const [isAdmin, setIsAdmin] = useState(false);
  const [amountPaid, setAmountPaid] = useState(0);
  const [additionalDebt, setAdditionalDebt] = useState(0);
  const [debt, setDebt] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          // console.log("ddaatta", data.admin);
         
          setIsAdmin(data.admin);
        })
      });
    }
  }, [session, status]);

  const columns = [
    { name: "AMOUNT SETTLED", uid: "amountPaid" },
    { name: "ADDITIONAL DEBT(Amount Bought on Credit)", uid: "additionalDebt" },
    { name: "DATE OF PAYMENT", uid: "dateOfPayment" },
    { name: "NEW BALANCE", uid: "newBalance" },
    { name: "ACTIONS", uid: "actions" },
  
  ];

  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];

    /* eslint-disable no-fallthrough */
    switch (columnKey) {
      case "amountPaid":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">{item.amountPaid}</p>
          </div>
        );
      case "additionalDebt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400"> {item.additionalDebt}</p>
          </div>
        );
      case "dateOfPayment":
        return (
          <Chip className="capitalize" color={statusColorMap.active} size="sm" variant="flat">
            {format(new Date(item.updatedAt), "MMMM d, yyyy")}
          </Chip>
        );
      case "newBalance":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400"> {item.newBalance}</p>
          </div>
        );
      case "actions":
        if (debt.indexOf(item) === debt.length - 1) {
          return (
            <div className="relative flex items-center gap-2">
              {isAdmin && columnKey.uid === "actions" && (
                <Tooltip color="danger" content="Delete user">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    {/* <DeleteIcon /> */}
                    <DeleteIcon onClick={() => handleDeleteDebtRow(item._id)} />
                  </span>
                </Tooltip>
              )}
            </div>
          );
        }
      default:
        return cellValue;
    }
   /* eslint-enable no-fallthrough */
  };


  const fetchDebts = useCallback(async () => {
    try {
      const response = await fetch("/api/debt?_id=" + id);
      const debts = await response.json();
      setDebt(debts.data);
    } catch (error) {
      console.error("Error fetching debts:", error);
      setDebt([]);
    }
  }, [id]);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  const handleDeleteDebtRow = async (id) => {
    try {
      // Send a DELETE request to the server to delete the item
      const response = await fetch("/api/debt?_id="+id, {
      // const response = await fetch(`/api/debt?_id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Fetch the updated list of debts
      fetchDebts();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("An error occurred while deleting item.");
    }
  };


  const handleDeleteUserDebtHistory = async () => {
    let lastNewBalance = debt[debt.length - 1].newBalance;
    if (lastNewBalance == 0){
      
      // await deletingUserDebtHistoryPromise; fetch("/api/debt?_id=" + id)
      await fetch("/api/debt?_id="+id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ additionalDebt, amountPaid, newBalance }),
       
      }); 

    } 
  }

  const handlePayment = async () => {
    // Check if there are new balances, and if not, update debt to the newBalance from the last row
    // let lastRow = rows[rows.length - 1];
    let newBalance;

    if (amountPaid > 0) {
      newBalance =
        (debt[debt.length - 1]?.newBalance || 0) - Number(amountPaid);

      setAmountPaid(0);
      
     
    }

    if (additionalDebt > 0) {
      newBalance =
        (debt[debt.length - 1]?.newBalance || 0) + Number(additionalDebt);

      setAdditionalDebt(0);
     
    }

  

   // Enable the "Add Row" button only if there is debt owed
  const addRowButton = document.querySelector('button[disabled]');
  if (newBalance > 0 && addRowButton) {
    addRowButton.removeAttribute("disabled");
  }

    try {
      // await savingDebtPromise;
      await fetch("/api/debt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ additionalDebt, amountPaid, newBalance }),
        body: JSON.stringify({
          additionalDebt,
          amountPaid,
          newBalance,
          userId: id,
        }),
      });
      fetchDebts();
     
    } catch (error) {
      console.error("Error saving debt:", error);
      toast.error("An error occurred while saving debt.");
    }
  };

  return (
    <section>
      <div className="text-center">
        <div className="m-4">
        <SectionHeaders mainHeader="debt" />
        </div>
        <Link href="/debt">
          <span className="text-blue-500 text-lg underline">Go Back</span>
        </Link>

        {isAdmin && (
        <InputField
        type="button"
          // label="Submit"
          value="Delete Debtor History"
          onClick={() => handleDeleteUserDebtHistory()}
          newBalance={debt?.[debt.length - 1]?.newBalance}
          deleteHistory={debt?.[debt.length - 1]?.newBalance}
          alertMessage={
            debt?.[debt.length - 1]?.newBalance == 0
              ? "This will delete user debt history."
              : ""
          }
          className="my-2"
        />

        )}
        
        <h3 className="text-400-primary  text-4xl italic py-3">
        Debt Owed: <span> {debt?.[debt.length - 1]?.newBalance || 0} </span>
        </h3>

        {isAdmin && (
        <Fragment>

        <InputField
         type={Number}
          label="Amount bought on Credit"
          value={additionalDebt}
          onChange={(e) => setAdditionalDebt(e.target.value)}
          disabled={!!amountPaid}
          alertMessage={
            additionalDebt > 0
              ? "This will increase your debt. Proceed with caution."
              : ""
          }
          className="my-2"

        />

        <InputField
        type={Number}
          label="Settlement Amount Paid"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          disabled={!!additionalDebt}
          alertMessage={
            amountPaid > 0
              ? "This will reduce your debt. Make sure you have enough balance."
              : ""
          }
          className="my-2"
        />

        <InputField
        type="button"
          label="Submit"
          value="Save"
          onClick={() => { handlePayment() }}
          className="my-2"
        />

        </Fragment>
        )}

      </div>

{/* next UI Table */}
      <Table
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      // selectionMode="none"
    >
       <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody  items={
            debt
              ? debt.map((e) => {
                  // console.log({ e });
                  if (e.amountPaid == 0) {
                    e.amountPaid = null;
                  }
                  if (e.additionalDebt == 0) {
                    e.additionalDebt = null;
                  }
                  return e;
                })
              : []
          }>
        {(item) => (
          <TableRow  key={uuidv4()}>
            {(columnKey) => <TableCell  key={uuidv4()}>

              {renderCell(item, columnKey)}
              
              </TableCell>}
          </TableRow>
        )}
      </TableBody>
      
    </Table>

    </section>
  );

}
