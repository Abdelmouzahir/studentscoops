"use client";
import React, { useState, useEffect } from "react";
import { useTable, useGlobalFilter } from "react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { useUserAuth } from "@/services/utils";
import {
  getMenuInformation,
  getRestaurantInformationByUser,
} from "@/services/GetRequest/getRequest";
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
  const [restaurantData, setRestaurantData] = useState([]);
  const [menuData, setMenuData] = useState(null);
  const route = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    console.log("user: ", user);
    async function gettingRestaurantMenu() {
      const data = await getMenuInformation(user);
      console.log("data: ", data);
      if (data.length <= 0) {
      }
      setMenuData(data);
    }
    async function userIsActive() {
      const data = await getRestaurantInformationByUser(user);
      if (!data.length == 0) {
        gettingRestaurantMenu();
      }
    }
    if (user) {
      userIsActive();
    }
    if (user == false) {
      route.push("/");
    }
  }, [user]);

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleProductDelete = (productId) => {
    setMenuData(menuData.filter((product) => product.id !== productId));
  };

  const columns = React.useMemo(
    () => [
      /*
      {
        Header: "Image",
        accessor: "imageUrl",
        Cell: ({ cell: { value }, row: { original } }) => (
          <Image
            alt={`Product image - ${original.name}`}
            className="aspect-square rounded-md object-cover"
            height="64"
            src={"url(/assets/images/restCover.jpg)"}
            width="64"
          />
        ),
      },
      */
      {
        Header: 'Image',
        accessor: 'imageUrl',
        Cell: ({ row: { original } }) => (
          <img
            alt={`Product image - ${original.name}`}
            className="aspect-square rounded-md object-cover"
            height="64"
            src="/assets/images/food.png" // Correct path to the image
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
          const date = new Date(value.seconds * 1000); // Assuming the value is a Firestore timestamp
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

      // {
      //   Header: "Total Sales",
      //   accessor: "totalSales",
      //   Cell: () => "0",
      //   className: "hidden md:table-cell",
      // },
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

  const data = React.useMemo(() => menuData || [], [menuData]);

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
      {menuData === null ? (
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
