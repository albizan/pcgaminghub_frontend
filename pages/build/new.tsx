import { useForm } from "react-hook-form";
import { http } from "../../utils/http";
import { useRouter } from "next/router";

export default function NewBuild() {
  const router = useRouter();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    try {
      const result = await http.post("/build/new", {
        price: data.price,
        name: data.name,
        cpuBrand: data.cpuBrand,
        gpuBrand: data.gpuBrand,
        description: data.description,
        CPU: {
          asin: data.cpuAsin,
          label: data.cpuLabel,
        },
        "Scheda Madre": {
          asin: data.moboAsin,
          label: data.moboLabel,
        },
        Alimentatore: {
          asin: data.psuAsin,
          label: data.psuLabel,
        },
        Case: {
          asin: data.caseAsin,
          label: data.caseLabel,
        },
        RAM: {
          asin: data.ramAsin,
          label: data.ramLabel,
        },
        GPU: {
          asin: data.gpuAsin,
          label: data.gpuLabel,
        },
        SSD: {
          asin: data.ssdAsin,
          label: data.ssdLabel,
        },
        HDD: {
          asin: data.hddAsin,
          label: data.hddLabel,
        },
        Dissipatore: {
          asin: data.coolerAsin,
          label: data.coolerLabel,
        },
      });
      console.log(result);
      if (result.status) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
      <p>Prezzo</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="Prezzo" name="price" ref={register({ required: true })} />
      </div>

      <p>Nome</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="Nome" name="name" ref={register({ required: true })} />
      </div>

      <p>Descrizione</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="Descrizione" name="description" ref={register({ required: false })} />
      </div>

      <p>Brand Processore</p>
      <select name="cpuBrand" ref={register({ required: true })}>
        <option value="AMD">AMD</option>
        <option value="INTEL">INTEL</option>
      </select>

      <p>Brand Scheda Video</p>
      <select name="gpuBrand" ref={register({ required: true })}>
        <option value="AMD">AMD</option>
        <option value="NVIDIA">NVIDIA</option>
      </select>

      <p>Processore</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="CPU ASIN" name="cpuAsin" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL CPU" name="cpuLabel" ref={register({ required: true })} />
      </div>

      <p>Scheda Video</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="GPU ASIN" name="gpuAsin" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL GPU" name="gpuLabel" ref={register({ required: true })} />
      </div>

      <p>Alimentatore</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="PSU ASIN" name="psuAsin" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL PSU" name="psuLabel" ref={register({ required: true })} />
      </div>

      <p>Scheda Madre</p>
      <div className="w-full flex my-3">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="MOBO ASIN"
          name="moboAsin"
          ref={register({ required: true, minLength: 10, maxLength: 10 })}
        />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL MOBO" name="moboLabel" ref={register({ required: true })} />
      </div>

      <p>Case</p>
      <div className="w-full flex my-3">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="Case ASIN"
          name="caseAsin"
          ref={register({ required: true, minLength: 10, maxLength: 10 })}
        />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL Case" name="caseLabel" ref={register({ required: true })} />
      </div>

      <p>RAM</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="RAM ASIN" name="ramAsin" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL RAM" name="ramLabel" ref={register({ required: true })} />
      </div>

      <p>SSD</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="ssd ASIN" name="ssdAsin" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL ssd" name="ssdLabel" ref={register({ required: true })} />
      </div>

      <p>HDD</p>
      <div className="w-full flex my-3">
        <input className="flex-1 p-2 border rounded" type="text" placeholder="hdd ASIN" name="hddAsin" ref={register({ required: true, minLength: 10, maxLength: 10 })} />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL hdd" name="hddLabel" ref={register({ required: true })} />
      </div>

      <p>Dissipatore</p>
      <div className="w-full flex my-3">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          placeholder="cooler ASIN"
          name="coolerAsin"
          ref={register({ required: true, minLength: 10, maxLength: 10 })}
        />
        <input className="flex-1 p-2 border rounded" type="text" placeholder="LABEL cooler" name="coolerLabel" ref={register({ required: true })} />
      </div>

      <button className="gradient text-white px-4 py-1 uppercase text-lg rounded" type="submit">
        Invia
      </button>
    </form>
  );
}
