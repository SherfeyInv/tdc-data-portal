import { CommandItem } from "@components/ui/command";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import FacetBadge from "./FacetBadge";
import Link from "next/link";

export default function SearchFacetItem({
  badge,
  text,
  icon,
  context,
  showIcon = true,
  showBadge = true,
  onSelect,
}: {
  badge?: string;
  text?: string;
  icon?: React.ReactNode;
  context?: string;
  showIcon?: boolean;
  showBadge?: boolean;
  onSelect?: Function;
}) {
  //const Element = onSelect ?

  const ItemContent = () => (
    <>
      {showIcon &&
        (icon || <MagnifyingGlassIcon width={20} className="text-gray-500" />)}
      {showBadge && badge && <FacetBadge name={badge} />}
      <span>{text}</span>
      {context && <span className="text-gray-400">- {context}</span>}
    </>
  );

  return onSelect ? (
    <CommandItem
      className="flex items-center gap-2 text-gray-700"
      onSelect={() => onSelect()}
    >
      <ItemContent />
    </CommandItem>
  ) : (
    <CommandItem className="flex items-center gap-2 text-gray-700" asChild>
      <Link href={"/search"}>
        <ItemContent />
      </Link>
    </CommandItem>
  );
}