import Head from "next/head";

// Import Layouts
import Container from "../layouts/Container";

// Import components
import FullpageLanding from "../components/FullpageLanding";
import BuildsWrapper from "../components/BuildsWrapper";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FullpageLanding />
      <Container>
        <section>
          <h3 className="text-center text-4xl mt-12">Che metto qua?</h3>
          <p className="text-xl mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim recusandae laborum possimus distinctio provident? Vero, accusamus praesentium odio consequatur
            accusantium eveniet debitis nobis, asperiores porro modi labore totam dignissimos quia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            praesentium a facilis voluptatum reprehenderit inventore veniam suscipit ipsa repellendus ex quasi omnis aliquam dolorem provident? Aperiam nihil voluptatem
            accusantium. Id. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit totam voluptates illum aut nesciunt eos eum cupiditate porro dolor possimus
            facilis, vel eveniet a reiciendis aperiam rerum, nam hic quidem?
          </p>
        </section>
        <BuildsWrapper />
      </Container>
    </>
  );
}
