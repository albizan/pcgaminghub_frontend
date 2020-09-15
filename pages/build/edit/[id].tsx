import { useRouter } from "next/router";
import BuildForm from "../../../components/BuildForm";
import { useEffect, useState } from "react";
import { http } from "../../../utils/http";
import { CompleteBuild } from "../../../interfaces/CompleteBuild.interface";

function composeDefaultValues(completeBuild: CompleteBuild): DefaultValues {
  const defaultValues = new DefaultValues();
  completeBuild.items.forEach((item) => {
    if (item.type) {
      defaultValues[item.type] = {
        asin: item.asin,
        label: item.label,
      };
    }
  });
  // Ignore items key
  let keys = Object.keys(completeBuild).filter((key) => key !== "items");
  keys.forEach((key) => {
    defaultValues[key] = completeBuild[key];
  });

  return defaultValues;
}

export default function EditBuild() {
  // useRouter is a react hook, on compile time query is just an empty object and its content gets hydrated on the browser
  // I need to wait until query is defined, I can detect that with a useEffect
  const router = useRouter();
  const { id } = router.query;

  const [buildId, setBuildId] = useState<string>();
  const [defaultValues, setDefaultValues] = useState<DefaultValues>();

  useEffect(() => {
    async function getCompleteBuild() {
      try {
        const { data } = await http.get(`/build/${id}`);
        setBuildId(data.id);
        setDefaultValues(composeDefaultValues(data));
      } catch (error) {
        console.log(error);
      }
    }
    if (id) {
      console.log("Retreive build...");
      getCompleteBuild();
    }
  }, [id]);

  if (defaultValues?.name) {
    return (
      <section className="mx-auto container">
        <BuildForm buildId={buildId} defaultValues={defaultValues} />
      </section>
    );
  } else {
    return (
      <div className="flex items-center justify-center">
        <p className="text-3xl text-center">Loading...</p>
      </div>
    );
  }
}

class DefaultValues {
  name: string;
  price: string;
  description: string;
  cpuBrand: string;
  gpuBrand: string;
  CPU: {
    asin: string;
    label: string;
  };
  GPU: {
    asin: string;
    label: string;
  };
  SSD?: {
    asin: string;
    label: string;
  };
  HDD?: {
    asin: string;
    label: string;
  };
  Alimentatore: {
    asin: string;
    label: string;
  };
  Case: {
    asin: string;
    label: string;
  };
  RAM: {
    asin: string;
    label: string;
  };
  Dissipatore?: {
    asin: string;
    label: string;
  };
  "Scheda Madre": {
    asin: string;
    label: string;
  };

  constructor() {}
}
