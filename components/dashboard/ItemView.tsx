import { enumEntries } from "@/lib/enums/common";
import type { ObjectLiteral } from "typeorm";
import MenuHeader from "./ItemView/MenuHeader";

interface Props<
  T extends Record<string, string>,
  U extends Record<string, string>,
> {
  title: string;
  fields: T;
  object: ObjectLiteral;
  editUrl?: string;
  deleteHandler?: Function;
  updateStatusEnum?: U;
  updateStatusHandler?: Function;
}

function ItemView<
  T extends Record<string, string>,
  U extends Record<string, string>,
>({
  title,
  fields,
  object,
  editUrl,
  deleteHandler,
  updateStatusEnum,
  updateStatusHandler,
}: Props<T, U>) {
  const entries = enumEntries(fields);

  return (
    <div>
      {(editUrl || deleteHandler || updateStatusEnum) && (
        <MenuHeader
          editUrl={editUrl}
          deleteHandler={deleteHandler}
          updateStatusHandler={updateStatusHandler}
          updateStatusEnum={updateStatusEnum}
          target={object.id}
        />
      )}
      <div className="w-full h-full bg-base-200 rounded-box form-control py-16 px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="border-l-2 border-l-primary py-4 pl-4 md:pl-8">
          <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold pb-6">
            {title}
          </h3>
          <ul className="form-control text-sm sm:text-base">
            {entries.map((entry, i) => {
              const content = object[entry.key] as string | undefined;

              if (!content) return null;

              const shouldExpand = content.length > 20;

              if (shouldExpand) {
                return (
                  <li
                    key={i}
                    className="flex flex-col gap-y-2 border-b-neutral border-b py-2 px-2 md:px-6"
                  >
                    <span className="font-semibold">{entry.value}</span>
                    <span className="text-accent">{content}</span>
                  </li>
                );
              }
              return (
                <li
                  key={i}
                  className="flex justify-between border-b-neutral border-b py-2 px-2 md:px-6"
                >
                  <span className="font-semibold">{entry.value}</span>
                  <span className="text-accent uppercase font-bold">
                    {content}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ItemView;
