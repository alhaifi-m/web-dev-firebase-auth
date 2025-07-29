"use client";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        sessionStorage.removeItem("user");
        router.push("/sign-in");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-xl">My App</div>
      <div>
        <Link href="/" className="text-white mx-2">
          Home
        </Link>

        {user && (
          <Link href="/protected-page" className="text-white mx-2">
            Protected Page
          </Link>
        )}

        {
            user ? (
                <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                  LogOut
                </button>
            ) : (
                <Link href="/sign-in" className="text-white mx-2">
                  Sign In
                </Link>
            )
        }
      </div>
    </nav>
  );
};

export default Navbar;
