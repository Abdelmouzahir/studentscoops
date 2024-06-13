/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G4TCFFaWzHA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import Header_stud from "../student/header_stud/page"
export default function Payment() {
  return (<>
    <Header_stud />
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Payment Successful</h1>
                <p className="text-gray-500 dark:text-gray-400">Thank you for your purchase!</p>
              </div>
              <div className="text-4xl font-bold">$149.99</div>
            </div>
          </div>
          <div className="mt-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
            <h2 className="text-2xl font-bold">Order Summary</h2>
            <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-800">
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                  <img src="/placeholder.svg" alt="Product Image" width={64} height={64} className="rounded-md" />
                  <div className="ml-4">
                    <p className="font-medium">Acme Widgets</p>
                    <p className="text-gray-500 dark:text-gray-400">Quantity: 2</p>
                  </div>
                </div>
                <p className="font-medium">$99.99</p>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center">
                  <img src="/placeholder.svg" alt="Product Image" width={64} height={64} className="rounded-md" />
                  <div className="ml-4">
                    <p className="font-medium">Acme Gizmos</p>
                    <p className="text-gray-500 dark:text-gray-400">Quantity: 1</p>
                  </div>
                </div>
                <p className="font-medium">$49.99</p>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <p className="text-gray-500 dark:text-gray-400">Total</p>
                <p className="font-medium">$149.99</p>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link
              href="#"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              View Order History
            </Link>
            <Link
              href="/restraunt/Restrauntitems"
              className="ml-4 inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

  
  
