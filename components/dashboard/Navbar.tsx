import { HomeIcon } from "@heroicons/react/24/solid";
import ThemeDropdown from "./ThemeDropdown";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import LogoutBtn from "./LogoutBtn";

function Navbar() {
  return (
    <nav className="navbar w-auto bg-base-100 text-base-content">
      <div className="flex-none lg:hidden">
        <label
          htmlFor="sidebar"
          aria-label="open sidebar"
          className="btn btn-square btn-sm btn-ghost"
        >
          <Bars3BottomLeftIcon className="w-6 h-6" />
        </label>
      </div>
      <div className="flex-1 px-2 font-bold">
        <a href="/" className="btn max-sm:btn-square max-sm:btn-sm btn-ghost">
          <HomeIcon className="sm:hidden w-6 h-6" />
          <span className="hidden sm:block text-lg">
            Atendimento Vulneráveis
          </span>
        </a>
      </div>
      <ul className="flex items-stretch">
        <li>
          <ThemeDropdown />
        </li>
        <li>
          <LogoutBtn />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
