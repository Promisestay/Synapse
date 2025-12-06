import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-(--color-bg) text-[#11182D]">
      <div className="container max-w-[1200px] mx-auto px-5">
        <div className="text-center">
          <h1 className="text-[120px] font-extrabold m-0 -tracking-[4px] text-[#11182D]">404</h1>
          <h2 className="text-4xl my-4 text-[#11182D]">Page Not Found</h2>
          <p className="text-lg text-[#6b7280] mb-8">Sorry, the page you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
