import styles from "./page.module.scss";
import LoginForm from "@/components/form/LoginForm";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session=await getSession()

  if(session!==null) redirect("/dashboard")

  return (
    <section className={styles.loginPage}>
      <div className={styles.formWrapper}>
        <h1 className="logo">Orpheu</h1>
        <LoginForm />
      </div>
    </section>
  );
}
