import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function OrderProcess() {
  const [orderStatus, setOrderStatus] = useState("Placing Order");
  const [showCancelButton, setShowCancelButton] = useState(true);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);

  useEffect(() => {
    const orderAnimation = () => {
      setTimeout(() => {
        setOrderStatus("Confirming Order");
        setTimeout(() => {
          setShowOrderConfirmation(true);
          setOrderStatus("Order Confirmed");
          setShowCancelButton(false);
        }, 3000); // Adjust timing as per your animation needs
      }, 3000); // Adjust timing as per your animation needs
    };
    orderAnimation();
  }, []);

  const handleCancelOrder = () => {
    // Implement cancel order logic here
    setShowCancelButton(false);
    setOrderStatus("Order Canceled");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {!showOrderConfirmation && (
        <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative h-64 w-64">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background">
              <ShoppingCartIcon className="h-16 w-16 text-primary" />
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">{orderStatus}</p>
          {showCancelButton && (
            <button
              className="mt-4 inline-flex h-10 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring animate-fade-in"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          )}
        </div>
      )}
      {showOrderConfirmation && (
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="animate-fade-in">
              <CircleCheckIcon className="mx-auto h-16 w-16 text-green-500" />
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Order Confirmed</h1>
            <p className="mt-4 text-muted-foreground">
              Thank you for your order! Your order is being processed and will be shipped soon.
            </p>
          </div>
          <div className="mt-10 w-full max-w-md animate-slide-up">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Your order summary content here */}
              </CardContent>
            </Card>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 animate-fade-in"
                prefetch={false}
              >
                Track Order
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 animate-fade-in"
                prefetch={false}
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </main>
      )}
      <footer className="bg-muted p-6 text-sm text-muted-foreground">
        <div className="container mx-auto">&copy; 2024 Acme Inc. All rights reserved.</div>
      </footer>
    </div>
  );
}
