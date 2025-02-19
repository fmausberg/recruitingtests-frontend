import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Sorry, we could not find the requested page :(</p>
      <Link href="/">Better return Home?</Link>
    </div>
  )
}