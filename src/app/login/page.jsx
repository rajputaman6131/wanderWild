"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../loading";
import toast from "react-hot-toast";

const LoginPage = () => {
  const { status } = useSession();
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true)
      await signIn("google");
    } catch (error) {
      toast.error("Something went wrong");

      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  if (status === "loading" || loading) {
    return <Loading />
  }

  if (status === "authenticated") {
    router.push("/")
  }

  return (
    <div className="wrapper">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.socialButton} onClick={handleLogin}>
            Sign in with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
