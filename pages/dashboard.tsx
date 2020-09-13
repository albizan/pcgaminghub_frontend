import { NextPageContext } from "next";
import { checkAuthCookie, removeAuthCookie } from "../utils/cookie";
import { deleteAccessToken } from "../utils/auth";
import { baseInstance, http } from "../utils/http";
import Link from "next/link";
import { BaseBuild } from "../interfaces/BaseBuild.interface";
import { useState } from "react";
import { useRouter } from "next/router";
import Container from "../layouts/Container";

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
    <Container>
      <section className="mt-8 md:mt-12 lg:mt-14">
        <div className="flex items-center">
          <h1 className="flex-1 text-xl md:text-2xl lg:text-3xl font-semibold">Dashboard</h1>
          <button className="text-xs md:text-lg px-2 py-2 rounded bg-green-400 text-white md:uppercase mr-2" onClick={() => router.push("/build/new")}>
            Nuova Build
          </button>
          <button className="text-xs md:text-lg px-2 py-2 rounded gradient text-white md:uppercase" onClick={handleLogout}>
            Logout
          </button>
        </div>
        {builds.length > 0 ? (
          <div className="builds">
            {builds.map((baseBuild) => {
              return (
                <div key={baseBuild.id} className="bg-white rounded shadow-lg my-8 p-4 flex flex-col md:flex-row">
                  <h3 className="text-2xl text-center md:text-left font-semibold flex-1">
                    {baseBuild.name} - {baseBuild.price}€
                  </h3>
                  <div className="flex justify-center md:justify-end mt-6 md:mt-0 text-xs font-semibold">
                    <Link href={`/build/${baseBuild.id}`}>
                      <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded mx-1 w-20">Visualizza</button>
                    </Link>
                    <button onClick={() => openDeleteModal(baseBuild)} className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded mx-1 w-20">
                      Elimina
                    </button>
                    <button
                      onClick={() => router.push(`/build/edit/${baseBuild.id}`)}
                      className="border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white rounded mx-1 w-20"
                    >
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
    </Container>
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
