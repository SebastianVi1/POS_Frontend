import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactElement } from "react";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginSchema } from '../schemas/authSchemas';
import useFetch from "../../../hooks/useFetch";
import { loginUser } from "../services";

type LoginForm = z.infer<typeof loginSchema>;

export default function LonginPage(): ReactElement {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema)
  });



  const processLogin = async (formData: LoginForm) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(formData);
      if (!response) {
        throw new Error("No llego mi pa")
      }
      console.log("Login succesful!");

    } catch (err: any) {
      setError(`algo salio mal ${err}`)
      console.log(err);


    } finally {
      setIsLoading(false);
    }
  };

  return (

    <>
      <div>
        <form onSubmit={handleSubmit(processLogin)}>
          <label>Username</label>
          <input {...register("username")}></input>
          <label>Password</label>
          <input {...register("password")}></input>
          {errors.username && <p style={{ color: 'red' }}>{errors.username?.message}</p>}
          <button type="submit">Submit</button>
        </form>
      </div >


    </>
  )
}

