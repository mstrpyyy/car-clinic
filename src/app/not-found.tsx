import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found'
}
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found 3</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}