import { Item } from "../../interfaces/Item.interface";

export default function BuildRow(props) {
  const showPrice = (component) => {
    if(component.price) return `${component.price} €`;
    if(component.suggestedPrice) return `${component.suggestedPrice} €`;
    return "N/A";
  }
  let component: Item = props.component;
  return (
    <div className="text-gray-700 text-xs sm:text-sm md:text-lg bg-white rounded border border-gray-400 shadow-lg flex my-6 py-6 items-center pl-6 sm:pl-2 pr-6 h-24 lg:h-32">
      <div className="hidden sm:block mr-6 photo w-24 overflow-hidden">
        <img
          className="object-cover w-full p-2"
          src={component.image ? component.image : "https://placeimg.com/150/150/tech"}
          alt="figure of the component from amazon website"
        />
      </div>
      <div className="hidden md:block w-32">
        <p className="text-sm font-semibold">{component.type}</p>
      </div>
      <div className="mr-2 flex-1 truncate">
        <p className="text-sm md:text-xl font-semibold truncate">
          <a href={component.url}>{component.label}</a>
        </p>
        <span className="text-indigo-400 tracking-tight leading-none">
          <a target="_blank" rel="noopener" href={component.url}>
            Guarda su amazon.it
          </a>
        </span>
      </div>
      <div className="text-right">
        <p className="text-sm md:text-lg font-semibold">{showPrice(component)}</p>
        <p className="text-sm text-gray-500 tracking-tight leading-none hidden md:block">ultimo controllo: {component.time}</p>
      </div>
    </div>
  );
}
