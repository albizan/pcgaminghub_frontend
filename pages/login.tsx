import { useForm } from "react-hook-form";
import { http } from "../utils/http";
import { saveAccessToken, isLoggedIn, getAccessToken } from "../utils/auth";
import { setAuthCookie } from "../utils/cookie";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn()) {
      setAuthCookie(getAccessToken());
    }
    router.push("/dashboard");
  }, []);

  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit = async (data) => {
    try {
      const result = await http.post("/user/login", data);
      const accessToken: string = result.data.accessToken || "";
      saveAccessToken(accessToken);
      setAuthCookie(accessToken);
      setErrorMessage("");
      setsuccessMessage("Accesso autorizzato, dashboard in caricamento");
      router.push("/dashboard");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("Credenziali invalide");
        setsuccessMessage("");
        return;
      }
      setsuccessMessage("");
      setErrorMessage("Si è verificato un errore imprevisto");
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  return (
    <section className="flex w-full h-screen justify-center items-center text-gray-700">
      <div className="">
        <div className="header text-center mb-12">
          <h1 className="font-semibold text-2xl lg:text-5xl leading-none">Accedi</h1>
          <p className="font-thin text-gray-500 lg:text-lg">Accesso consentito solo agli amministratori</p>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="username">
              <label className="text-lg" htmlFor="username">
                Username
              </label>
              <input
                name="username"
                ref={register({ required: true })}
                placeholder="username"
                id="username"
                type="text"
                className="border rounded-lg border-gray-400 px-5 py-3 w-full focus:outline-none focus:border-indigo-400"
              />
              <div className="w-full h-12">{errors.username && <span>Inserire username</span>}</div>
            </div>
            <div className="password">
              <label className="text-lg" htmlFor="password">
                Password
              </label>
              <input
                name="password"
                ref={register({ required: true })}
                placeholder="password"
                id="password"
                type="password"
                className="border rounded-lg border-gray-400 px-5 py-3 w-full focus:outline-none focus:border-indigo-400 "
              />
              <div className="w-full h-12">{errors.password && <span>Inserire password</span>}</div>
            </div>
            <button className="text-lg mt-6 uppercase gradient text-gray-200 px-5 py-4 rounded-lg w-full focus:outline-none lift">Accedi</button>
          </form>
          <div className="h-12">
            <p className="text-red-600 text-lg">{errorMessage}</p>
          </div>
          <div className="h-12">
            <p className="text-green-400 text-lg">{successMessage}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
