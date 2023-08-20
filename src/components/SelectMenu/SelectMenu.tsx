import { ChangeEventHandler } from "react";

type SelectMenuProps = {
  options: string[];
  defaultValue: string;
  disabled?: boolean;
  name: string;
  id: string;
  label: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};
export function SelectMenu(props: SelectMenuProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <select
        id={props.id}
        name={props.name}
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
