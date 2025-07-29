"use client";
import useAuth from "../hooks/useAuth";

const ProtectedPage = () => {
  const { user, loading } = useAuth();
  console.log("User:", user);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <div>Redirecting...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-24">
        <h1 className="text-4xl font-bold text-white">Protected Page</h1>
        <p className="text-lg text-gray-900 mt-4">
          Welcome to the protected page, {user.email}!
        </p>
      </main>
    </div>
  );
};

export default ProtectedPage;
