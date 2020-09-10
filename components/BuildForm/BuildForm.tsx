import { useForm } from "react-hook-form";
import { http } from "../../utils/http";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../utils/auth";

export default function BuildForm({ defaultValues, buildId }) {
  useEffect(() => {
    const token = localStorage ? getAccessToken() : "";
    if (!token) router.push("/login");
  }, []);
  const [message, setMessage] = useState<string>();
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm({ mode: "onBlur", defaultValues: defaultValues || {} });
  const onSubmit = async (data) => {
    try {
      const result = await http.post("/build/new", data);
      if (result.status) {
        router.push("/dashboard");
      }
    } catch (error) {
      setMessage("Si è verificato un errore imprevisto");
    }
  };

  return (
    <form className="text-gray-800 font-semibold px-4" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-gray-800 text-xl lg:text-3xl">{buildId ? "Modifica configurazione" : "Nuova Configurazione"}</h1>
      {buildId && <p className="text-sm text-gray-600">{buildId}</p>}
      {message && <p className="text-red-400 text-center text-2xl my-6">{message}</p>}
      <p className="text-lg mt-8">Prezzo</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input
          className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400"
          type="text"
          placeholder="Prezzo"
          name="price"
          ref={register({ required: "Inserire un prezzo" })}
        />
      </div>
      {errors.price && <span className="text-red-400 text-sm">{errors.price.message}</span>}

      <p className="text-lg mt-8">Nome</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input
          className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400"
          type="text"
          placeholder="Nome"
          name="name"
          ref={register({ required: "Inserire un nome" })}
        />
      </div>
      {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}

      <p className="text-lg mt-8">Descrizione</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <input
          className="flex-1 mt-4 lg:mt-0 p-4 lg:mx-2 border rounded border-gray-400"
          type="text"
          placeholder="Descrizione"
          name="description"
          ref={register({ required: false })}
        />
      </div>

      <p className="text-lg mt-8">Brand Processore</p>
      <select className="border border-gray-500 rounded px-2 py-1 focus:outline-none" name="cpuBrand" ref={register({ required: "Brand Processore mancante" })}>
        <option value=""></option>
        <option value="AMD">AMD</option>
        <option value="INTEL">INTEL</option>
      </select>
      {errors.cpuBrand && <span className="block text-red-400 text-sm">{errors.cpuBrand.message}</span>}

      <p className="text-lg mt-8">Brand Scheda Video</p>
      <select className="border border-gray-500 rounded px-2 py-1 focus:outline-none" name="gpuBrand" ref={register({ required: "Brand Scheda Video mancante" })}>
        <option value=""></option>
        <option value="AMD">AMD</option>
        <option value="NVIDIA">NVIDIA</option>
      </select>
      {errors.gpuBrand && <span className="block text-red-400 text-sm">{errors.gpuBrand.message}</span>}

      <p className="text-lg mt-8">Processore</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="CPU.asin"
            ref={register({ required: "Inserire ASIN processore", minLength: 10, maxLength: 10 })}
          />
          {errors.cpuAsin && <span className="block text-red-400 text-sm">{errors.cpuAsin.message}</span>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="Label"
            name="CPU.label"
            ref={register({ required: "Inserire label processore" })}
          />
          {errors.cpuLabel && <span className="block text-red-400 text-sm">{errors.cpuLabel.message}</span>}
        </div>
      </div>

      <p className="text-lg mt-8">Scheda Video</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="GPU.asin"
            ref={register({ required: "Inserire ASIN scheda video", minLength: 10, maxLength: 10 })}
          />
          {errors.gpuAsin && <span className="block text-red-400 text-sm">{errors.gpuAsin.message}</span>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="Label"
            name="GPU.label"
            ref={register({ required: "Inserire label scheda video" })}
          />
          {errors.gpuLabel && <span className="block text-red-400 text-sm">{errors.gpuLabel.message}</span>}
        </div>
      </div>

      <p className="text-lg mt-8">Alimentatore</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="Alimentatore.asin"
            ref={register({ required: "Inserire ASIN alimentatore", minLength: 10, maxLength: 10 })}
          />
          {errors.psuAsin && <span className="block text-red-400 text-sm">{errors.psuAsin.message}</span>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="Label"
            name="Alimentatore.label"
            ref={register({ required: "Inserire label alimentatore" })}
          />
          {errors.psuLabel && <span className="block text-red-400 text-sm">{errors.psuLabel.message}</span>}
        </div>
      </div>

      <p className="text-lg mt-8">Scheda Madre</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="Scheda Madre.asin"
            ref={register({ required: "Inserire ASIN scheda madre", minLength: 10, maxLength: 10 })}
          />
          {errors.moboAsin && <span className="block text-red-400 text-sm">{errors.moboAsin.message}</span>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="Label"
            name="Scheda Madre.label"
            ref={register({ required: "Inserire label scheda madre" })}
          />
          {errors.moboLabel && <span className="block text-red-400 text-sm">{errors.moboLabel.message}</span>}
        </div>
      </div>

      <p className="text-lg mt-8">Case</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="Case.asin"
            ref={register({ required: "Inserire ASIN case", minLength: 10, maxLength: 10 })}
          />
          {errors.caseAsin && <span className="block text-red-400 text-sm">{errors.caseAsin.message}</span>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="Label"
            name="Case.label"
            ref={register({ required: "Inserire label case" })}
          />
          {errors.caseLabel && <span className="block text-red-400 text-sm">{errors.caseLabel.message}</span>}
        </div>
      </div>

      <p className="text-lg mt-8">RAM</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="RAM.asin"
            ref={register({ required: "Inserire ASIN RAM", minLength: 10, maxLength: 10 })}
          />
          {errors.ramAsin && <span className="block text-red-400 text-sm">{errors.ramAsin.message}</span>}
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="Label"
            name="RAM.label"
            ref={register({ required: "Inserire label RAM" })}
          />
          {errors.ramLabel && <span className="block text-red-400 text-sm">{errors.ramLabel.message}</span>}
        </div>
      </div>

      <p className="text-lg mt-8">SSD</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="SSD.asin"
            ref={register({ required: false, minLength: 10, maxLength: 10 })}
          />
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="SSD.label" ref={register()} />
        </div>
      </div>

      <p className="text-lg mt-8">HDD</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="HDD.asin"
            ref={register({ required: false, minLength: 10, maxLength: 10 })}
          />
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="HDD.label" ref={register()} />
        </div>
      </div>

      <p className="text-lg mt-8">Dissipatore</p>
      <div className="w-full flex flex-col lg:flex-row my-3">
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input
            className="w-full p-4 border rounded border-gray-400"
            type="text"
            placeholder="ASIN"
            name="Dissipatore.asin"
            ref={register({ required: false, minLength: 10, maxLength: 10 })}
          />
        </div>
        <div className="flex-1 mt-4 lg:mt-0 lg:mx-2">
          <input className="w-full p-4 border rounded border-gray-400" type="text" placeholder="Label" name="Dissipatore.label" ref={register()} />
        </div>
      </div>

      <button className="gradient text-white px-5 py-3 uppercase text-2xl w-full rounded mt-8" type="submit">
        Invia
      </button>
    </form>
  );
}
