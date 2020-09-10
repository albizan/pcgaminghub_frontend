import BuildForm from "../../components/BuildForm";

export default function NewBuildPage() {
  return (
    <section className="container mx-auto my-16">
      <BuildForm defaultValues={null} buildId={null} />
    </section>
  );
}
