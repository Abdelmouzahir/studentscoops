/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Slv9lfwnT5L
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import Header_stud from "@/app/main-component/layout/header_stud/page"
export default function PaymentOptions() {
  return (
    <>
    <Header_stud />
    <section className="w-full py-12 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
            <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
            <div className="grid gap-6">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <CreditCardIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Visa, Mastercard, American Express</p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Pay with Card
                </Link>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <WalletCardsIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Fast, secure, and easy checkout</p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Pay with PayPal
                </Link>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <DollarSignIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Pay with cash when your order arrives</p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Pay on Delivery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function DollarSignIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}


function CreditCardIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function WalletCardsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2" />
      <path d="M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21" />
    </svg>
  )
}