import { getPages } from "@/repository/db/page.repository";
import Link from "next/link";
import { NestedPageTitle } from "./NestedPageTitle";

export const Sidebar = () => {
  getPages();

  return (
    <aside className="w-[240px] flex flex-col justify-between py-1 px-2 bg-slate-800 shadow-xl">
      <div>
        <div className="mb-4">
          <h1 className="text-lg text-center font-bold">俺のNotion</h1>
        </div>

        <span className="text-xs bold">Pages</span>
        {[
          { emoji: "💡", title: "生活", url: "#" },
          { emoji: "💡", title: "生活", url: "#" },
          { emoji: "💡", title: "生活", url: "#" },
        ].map((page) => (
          <NestedPageTitle page={page} />
        ))}
      </div>

      <Link
        href="/signin"
        className="block bg-slate-700 text-xs text-center -my-1 -mx-2"
      >
        Admin Settings
      </Link>
    </aside>
  );
};
