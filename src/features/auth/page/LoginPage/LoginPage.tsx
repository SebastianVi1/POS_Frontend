import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactElement } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { loginSchema } from "../../schemas/authSchemas.ts";
import { useAuthContext } from "../../../../../context/authContext.tsx";
import styles from "./LoginPage.module.scss";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { loading, error, login } = useAuthContext();

  const processLogin = async (formData: LoginForm) => {
    await login(formData.username, formData.password);
  };

  return (
    <div className={styles.mainWrapper}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(processLogin)} className={styles.form}>
          <h1 className={styles.title}>Sign In</h1>

          <label className={styles.label} htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className={`${styles.input} ${errors.username ? styles.inputError : ""}`}
            {...register("username")}
          />
          {errors.username && (
            <span className={styles.fieldError}>{errors.username.message}</span>
          )}

          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
            {...register("password")}
          />
          {errors.password && (
            <span className={styles.fieldError}>{errors.password.message}</span>
          )}

          {error && <span className={styles.apiError}>{error}</span>}

          <button
            type="submit"
            className={`${styles.submitBtn} ${loading ? styles.loading : ""}`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className={styles.registerText}>
            Don't have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </div>
  );
}
