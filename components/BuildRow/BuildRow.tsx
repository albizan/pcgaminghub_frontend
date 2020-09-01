import { Item } from "../../interfaces/Item.interface";

export default function BuildRow(props) {
  let component: Item = props.component;
  return (
    <div className="text-gray-700 text-xs sm:text-sm md:text-lg bg-white rounded border border-gray-300 flex my-4 py-4 items-center px-4 h-24 lg:h-32">
      <div className="hidden sm:block mr-2 photo w-24 overflow-hidden">
        <img
          className="object-cover w-full"
          src={component.image ? component.image : "https://placeimg.com/150/150/tech"}
          alt="figure of the component from amazon website"
        />
      </div>
      <div className="mr-2 flex-1 truncate">
        <p className="text-sm md:text-xl font-semibold truncate">
          <a href={component.url}>{component.label}</a>
        </p>
        <span className="text-indigo-400 tracking-tight leading-none">
          <a href={component.url}>Guarda su amazon.it</a>
        </span>
      </div>
      <div>
        <p className="text-sm md:text-xl font-semibold">{component.price ? `${component.price} €` : "N/A"}</p>
      </div>
    </div>
  );
}
