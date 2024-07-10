"use client";
import { ref, onValue, off } from "firebase/database";
import { database } from "@/app/firebase/config";
import React, { useState, useEffect, useCallback } from "react";
import { useTable, useGlobalFilter } from "react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useUserAuth } from "@/services/utils";
import { db } from "@/app/firebase/config";
import { deleteDoc, doc } from "firebase/firestore";
import { getRestaurantMenu } from "@/services/RealTimeDatabase/getData/getData";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function SettingsRestaurant() {
  const { user } = useUserAuth();
  const [menuData, setMenuData] = useState([]);
  const route = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const restaurantRef = ref(database, "restaurants/" + user + "/menu");

  const getRestaurantMenuCallback = useCallback(getRestaurantMenu, [user]);

  useEffect(() => {
    function gettingMenu(){
    try {
      const unsubscribe = onValue(restaurantRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const formattedData = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setMenuData(formattedData);
        } else {
          setMenuData([]);
        }
      });
    } catch (error) {
      console.log(error);
    }}

    return gettingMenu();
  }, [restaurantRef]);
  useEffect(() => {
    // restaurantMenu();
    if (user == false) {
      route.push("/");
    }
  }, [user]);

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleProductDelete = async (productId) => {
    await deleteDoc(doc(db, "restaurant_menu", productId)).then(() => {
      setMenuData((prevMenuData) =>
        prevMenuData.filter((product) => product.id !== productId)
      );
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Image",
        accessor: "imageUrl",
        Cell: ({ cell: { value }, row: { original } }) => (
          <Image
            alt={`Product image - ${original.name}`}
            className="aspect-square rounded-md object-cover"
            height="64"
            src={original.imageUrl}
            width="64"
          />
        ),
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => <Badge variant="outline">{value}</Badge>,
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ cell: { value } }) => `$${value}`,
        className: "hidden md:table-cell",
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => {
          const date = new Date(value);
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
          const year = date.getFullYear();
          const hours = date.getHours();
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");
          const ampm = hours >= 12 ? "PM" : "AM";
          const formattedHours = (hours % 12 || 12).toString().padStart(2, "0"); // Convert 0 to 12 for 12-hour format

          return (
            <div>
              {`${day}-${month}-${year}`}
              <br />
              {`${formattedHours}:${minutes}:${seconds} ${ampm}`}
            </div>
          );
        },
        className: "hidden md:table-cell",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row: { original } }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleProductEdit(original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => handleProductDelete(original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [menuData]
  );

  const data = React.useMemo(() => menuData, [menuData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter: setTableGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  useEffect(() => {
    setTableGlobalFilter(globalFilter);
  }, [globalFilter, setTableGlobalFilter]);

  return (
    <div>
      {menuData.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-screen ">
          <h3 className="text-2xl font-bold tracking-tight text-primary">
            You have no products
          </h3>
          <p className="text-sm text-gray-500">
            You can start selling as soon as you add a product.
          </p>
          <Link href="/restraunt/AddMenu" className="mt-4">
            <Button className="bg-primary">Add Product</Button>
          </Link>
        </div>
      ) : (
        <>
          <Input
            placeholder="Filter products"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="max-w-sm mb-4"
          />
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your products and view their sales performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table {...getTableProps()}>
                <TableHeader>
                  {headerGroups.map((headerGroup) => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <TableHead
                          {...column.getHeaderProps()}
                          className={column.className}
                        >
                          {column.render("Header")}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <TableCell
                            {...cell.getCellProps()}
                            className={cell.column.className}
                          >
                            {cell.render("Cell")}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{menuData.length}</strong> of{" "}
                <strong>{menuData.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
