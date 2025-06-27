import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-mercury text-foreground p-6">
      <h1 className="text-4xl font-bold mb-4">403 - Access Denied</h1>
      <p className="text-lg mb-6">
        You do not have permission to view this page.
      </p>
      <Link
        href="/"
        className="text-stoplight hover:underline text-md font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
}
