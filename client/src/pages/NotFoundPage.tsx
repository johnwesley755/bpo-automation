import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-black p-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
}