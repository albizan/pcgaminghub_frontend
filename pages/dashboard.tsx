import { NextPageContext } from "next";
import { checkAuthCookie, removeAuthCookie } from "../utils/cookie";
import { deleteAccessToken } from "../utils/auth";
import { baseInstance, http } from "../utils/http";
import Link from "next/link";
import { BaseBuild } from "../interfaces/BaseBuild.interface";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard(props) {
  const [deleteCandidate, setDeleteCandidate] = useState<BaseBuild>(null);
  const [builds, setBuilds] = useState<BaseBuild[]>(props.baseBuilds);
  const router = useRouter();

  function openDeleteModal(candidate: BaseBuild) {
    setDeleteCandidate(candidate);
  }

  function handleLogout() {
    removeAuthCookie();
    deleteAccessToken();
    router.push("/");
  }

  async function handleDelete() {
    try {
      const result = await http.delete(`/build/${deleteCandidate.id}`);
      if (result.status === 200) {
        setBuilds(builds.filter((build) => build.id !== deleteCandidate.id));
        setDeleteCandidate(null);
      }
    } catch (error) {}
  }
  return (
    <section className="mx-auto container mt-20">
      <div className="flex items-center">
        <h1 className="flex-1 text-3xl">Dashboard</h1>
        <button className="px-3 py-2 rounded bg-green-400 text-white uppercase text-sm mr-4" onClick={() => router.push("/build/new")}>
          Nuova Build
        </button>
        <button className="px-3 py-2 rounded gradient text-white uppercase text-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {builds.length > 0 ? (
        <div className="builds">
          {builds.map((baseBuild) => {
            return (
              <div key={baseBuild.id} className="bg-white rounded shadow-lg my-8 p-4 flex">
                <h3 className="text-xl font-semibold flex-1">
                  {baseBuild.name} - {baseBuild.price}€
                </h3>
                <div className="flex">
                  <Link href={`/build/${baseBuild.id}`}>
                    <button className="mr-2 bg-indigo-600 text-white rounded w-20 text-xs font-semibold">Visualizza</button>
                  </Link>
                  <button onClick={() => openDeleteModal(baseBuild)} className="mr-2 bg-red-600 text-white rounded w-20 text-xs font-semibold">
                    Elimina
                  </button>
                  <button onClick={() => router.push(`/build/edit/${baseBuild.id}`)} className="mr-2 bg-yellow-500 text-gray-800 rounded w-20 text-xs font-semibold">
                    Modifica
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-3xl text-gray-700 mt-24">Nessuna configurazione trovata</p>
      )}
      {deleteCandidate && (
        <div className={`${deleteCandidate ? "block" : "hidden"} modal-bg fixed w-full h-screen inset-0 flex justify-center items-center`}>
          <div className="bg-white rounded-lg px-32 py-16 text-gray-800">
            <h3 className="text-3xl">{deleteCandidate.name}</h3>
            <h4 className="text-xl">{deleteCandidate.price}€</h4>
            <h5 className="text-sm text-gray-500">{deleteCandidate.id}</h5>
            <p className="text-xl mt-12">Sei sicuro di voler eliminare la configurazione?</p>
            <div className="flex text-center mt-8">
              <div className="flex-1">
                <button className="bg-red-600 text-lg rounded text-white px-4 py-2 uppercase" onClick={() => handleDelete()}>
                  Elimina
                </button>
              </div>
              <div className="flex-1">
                <button className="bg-blue-600 text-lg rounded text-white px-4 py-2 uppercase" onClick={() => setDeleteCandidate(null)}>
                  Annulla
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const accessToken = checkAuthCookie(context) || "";
  if (!accessToken) {
    context.res.setHeader("location", "/login");
    context.res.statusCode = 302;
    context.res.end();
  }
  try {
    const { data } = await baseInstance.get<BaseBuild[]>("/build/base");
    return {
      props: {
        accessToken,
        baseBuilds: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}
