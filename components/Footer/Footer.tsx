export default function Footer() {
  return (
    <section className="mt-32">
      <div className="gradient py-20 flex flex-col items-center justify-center">
        <p className="text-white text-lg md:text-xl">&copy; {new Date().getFullYear()} pcgaming.it - All right reserved </p>
      </div>
    </section>
  );
}
