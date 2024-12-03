import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link className='mt-2 btn btn-secondary' href={'/'}>Go Back to Home Page</Link> 
    </div>
  )
}
