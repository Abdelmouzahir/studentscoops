'use client';
import React, { useState, useEffect } from 'react';
import { useTable, useGlobalFilter } from 'react-table';
import { MoreHorizontal } from "lucide-react";
import { useUserAuth } from '@/services/utils';
import { getRestaurantInformation, getMenuInformationByUser } from '@/services/GetRequest/getRequest';
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
import Link from 'next/link';

export default function SettingsRestaurant() {
  const { user } = useUserAuth();
  const [restaurantData, setRestaurantData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [globalFilter, setGlobalFilter] = useState('');

  const handleProductEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleProductDelete = (productId) => {
    setMenuData(menuData.filter((product) => product.id !== productId));
  };

  const fetchMenu = async (restaurants) => {
    for (const restaurant of restaurants) {
      await getMenu(restaurant.id);
      console.log("restaurant id: ", restaurant.id);
    }
  };

  const getMenu = async (id) => {
    const data = await getMenuInformationByUser(id, user);
    setMenuData((prevData) => [...prevData, ...data]);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getRestaurantInformation();
      setRestaurantData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (restaurantData.length > 0) {
      fetchMenu(restaurantData);
    }
  }, [restaurantData]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleString();
  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'imageUrl',
        Cell: ({ cell: { value }, row: { original } }) => (
          <img
            alt={`Product image - ${original.name}`}
            className="aspect-square rounded-md object-cover"
            height="64"
            src={value}
            width="64"
          />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ cell: { value } }) => <Badge variant="outline">{value}</Badge>,
      },
      {
        Header: 'Price',
        accessor: 'price',
        Cell: ({ cell: { value } }) => `$${value}`,
      },
      {
        Header: 'Total Sales',
        accessor: 'totalSales',
        Cell: () => '0',
      },
      {
        Header: 'Created at',
        accessor: 'createdAt',
        Cell: ({ cell: { value } }) => formatDate(value),
      },
      {
        Header: 'Actions',
        accessor: 'actions',
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
              <DropdownMenuItem onClick={() => handleProductEdit(original)}>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={() => handleProductDelete(original.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
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
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-gray-500">
            You can start selling as soon as you add a product.
          </p>
          <Link href="/restraunt/AddMenu " className='mt-4'>
            <Button>Add Product</Button>
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
              <CardDescription>Manage your products and view their sales performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table {...getTableProps()}>
                <TableHeader>
                  {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <TableHead {...column.getHeaderProps()}>{column.render('Header')}</TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-{menuData.length}</strong> of <strong>{menuData.length}</strong> products
              </div>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
