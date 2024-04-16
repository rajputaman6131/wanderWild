"use client";
import { signIn, useSession } from "next-auth/react";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "../loading";
import toast from "react-hot-toast";
import Link from "next/link";

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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <button onClick={handleLogin} className={styles.btn}>
          Sign in with Google
        </button>
        <p className={styles.footer}>
          By signing in, you agree to our <Link href="/terms-conditions" className={styles.link}>terms of service</Link> and <Link href="/privacy-policy" className={styles.link}>privacy policy</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
