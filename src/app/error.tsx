'use client' // Error boundaries must be Client Components
 
// import * as Sentry from "@sentry/nextjs";
// import { useEffect } from 'react'
 
// export const metadata = {
//   title: 'Error Page'
// }


// export default function Error({
//   error,
//   reset,
// }: {
//   error: Error & { digest?: string }
//   reset: () => void
// }) {
//   useEffect(() => {
//     Sentry.captureException(error);
//   }, [error]);
 
//   return (
//     <div>
//       <h2>Something went wrong!</h2>
//       <button
//         onClick={
//           // Attempt to recover by trying to re-render the segment
//           () => reset()
//         }
//       >
//         Try again
//       </button>
//     </div>
//   )
// }