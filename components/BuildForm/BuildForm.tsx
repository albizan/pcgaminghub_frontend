import { useForm } from "react-hook-form";
import { http } from "../../utils/http";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/auth";
import FormErrors from "./FormErrors";
import { parseErrors } from "../../utils/form";

export default function BuildForm({ defaultValues, buildId }) {
  useEffect(() => {
    const token = localStorage ? getAccessToken() : "";
    if (!token) router.push("/login");
  }, []);

  const [successMessage, setSuccessMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errors, setErrors] = useState<FormErrors>();
  const router = useRouter();

  const { register, handleSubmit } = useForm({ mode: "onSubmit", defaultValues: defaultValues || {} });

  async function onSubmit(formData) {
    try {
      let result = buildId ? await http.put(`/build/${buildId}`, formData) : await http.post("/build/new", formData);
      if (result.status) {
        setSuccessMessage("Operazione completata con successo");
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response.status === 400) {
        const errorDetails = error.response?.data?.error?.details;
        setErrors(parseErrors(errorDetails));
        setErrorMessage("Errore, verifica i dati inseriti");
      } else {
        setErrorMessage("Si è verificato un errore imprevisto");
      }
    }
  }

  return (
    <form className="text-gray-800 font-semibold px-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-gray-800 text-xl lg:text-3xl">{buildId ? "Modifica configurazione" : "Nuova Configurazione"}</h1>
      {buildId && <p className="text-sm text-gray-600">{buildId}</p>}
      {errorMessage && <p className="text-red-400 text-center text-2xl my-6">{errorMessage}</p>}
      {successMessage && <p className="text-green-600 text-center text-2xl my-6">{successMessage}</p>}
      <p className="text-lg mt-8">Prezzo</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400" type="text" placeholder="Prezzo" name="price" ref={register()} />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors.price}</p>}

      <p className="text-lg mt-8">Nome</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400" type="text" placeholder="Nome" name="name" ref={register()} />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors.name}</p>}

      <p className="text-lg mt-8">URL immagine anteprima</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400" type="text" placeholder="URL immagine" name="imageUrl" ref={register()} />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}

      <p className="text-lg mt-8">Sottotitolo</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400" type="text" placeholder="Sottotitolo" name="subTitle" ref={register()} />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors.subTitle}</p>}

      <p className="text-lg mt-8">Descrizione</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400" type="text" placeholder="Descrizione" name="description" ref={register()} />
      </div>
      {errors && <p className="text-red-500 text-sm">{errors.description}</p>}

      <p className="text-lg mt-8">Brand Processore</p>
      <select className="border border-gray-500 rounded px-2 py-1 focus:outline-none" name="cpuBrand" ref={register()}>
        <option value=""></option>
        <option value="AMD">AMD</option>
        <option value="INTEL">INTEL</option>
      </select>
      {errors && <p className="text-red-500 text-sm">{errors.cpuBrand}</p>}

      <p className="text-lg mt-8">Brand Scheda Video</p>
      <select className="border border-gray-500 rounded px-2 py-1 focus:outline-none" name="gpuBrand" ref={register()}>
        <option value=""></option>
        <option value="AMD">AMD</option>
        <option value="NVIDIA">NVIDIA</option>
      </select>
      {errors && <p className="text-red-500 text-sm">{errors.gpuBrand}</p>}

      <p className="text-lg mt-8">Processore</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="CPU.asin" ref={register()} />
          {errors && errors.CPU && <p className="text-red-500 text-sm">{errors.CPU.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="CPU.label" ref={register()} />
          {errors && errors.CPU && <p className="text-red-500 text-sm">{errors.CPU.label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">Scheda Video</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="GPU.asin" ref={register()} />
          {errors && errors.GPU && <p className="text-red-500 text-sm">{errors.GPU.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="GPU.label" ref={register()} />
          {errors && errors.GPU && <p className="text-red-500 text-sm">{errors.GPU.label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">Alimentatore</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="Alimentatore.asin" ref={register()} />
          {errors && errors.Alimentatore && <p className="text-red-500 text-sm">{errors.Alimentatore.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="Alimentatore.label" ref={register()} />
          {errors && errors.Alimentatore && <p className="text-red-500 text-sm">{errors.Alimentatore.label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">Scheda Madre</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="Scheda Madre.asin" ref={register()} />
          {errors && errors["Scheda Madre"] && <p className="text-red-500 text-sm">{errors["Scheda Madre"].asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="Scheda Madre.label" ref={register()} />
          {errors && errors["Scheda Madre"] && <p className="text-red-500 text-sm">{errors["Scheda Madre"].label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">Case</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="Case.asin" ref={register()} />
          {errors && errors.Case && <p className="text-red-500 text-sm">{errors.Case.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="Case.label" ref={register()} />
          {errors && errors.Case && <p className="text-red-500 text-sm">{errors.Case.label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">RAM</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="RAM.asin" ref={register()} />
          {errors && errors.RAM && <p className="text-red-500 text-sm">{errors.RAM.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="RAM.label" ref={register()} />
          {errors && errors.RAM && <p className="text-red-500 text-sm">{errors.RAM.label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">SSD</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="SSD.asin" ref={register()} />
          {errors && errors.SSD && <p className="text-red-500 text-sm">{errors.SSD.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="SSD.label" ref={register()} />
          {errors && errors.SSD && <p className="text-red-500 text-sm">{errors.SSD.label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">HDD</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="HDD.asin" ref={register()} />
          {errors && errors.HDD && <p className="text-red-500 text-sm">{errors.HDD.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="HDD.label" ref={register()} />
          {errors && errors.HDD && <p className="text-red-500 text-sm">{errors.HDD.label}</p>}
        </div>
      </div>

      <p className="text-lg mt-8">Dissipatore</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="ASIN" name="Dissipatore.asin" ref={register()} />
          {errors && errors.Dissipatore && <p className="text-red-500 text-sm">{errors.Dissipatore.asin}</p>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="Dissipatore.label" ref={register()} />
          {errors && errors.Dissipatore && <p className="text-red-500 text-sm">{errors.Dissipatore.label}</p>}
        </div>
      </div>

      <button className="gradient text-white px-5 py-3 uppercase text-2xl w-full rounded mt-8" type="submit">
        Invia
      </button>
    </form>
  );
}
