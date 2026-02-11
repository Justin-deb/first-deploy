import { NavLink } from "react-router-dom";

export default function Header() {
  const selected = ({isActive}:{isActive:boolean}) =>{
    return "text-white text-2xl rounded-md px-2 py-1 hover:bg-[#0AC4E0] " + (isActive? 'bg-cyan-950' : 'bg-[#0AC4E0]')
  }

  return (
    <nav>
      <div className="">
        <div className="flex justify-start bg-[#0992C2] space-x-3 py-3 px-3">
          <NavLink to={"/"} className={selected}>
            <p>Home</p>

          </NavLink>
          <NavLink to={"/movies"} className={selected}>
            <p>Movies</p>
          </NavLink>
        </div>
      </div>

    </nav>
    // <NavLink to={""}>
    //   <div className="flex gap-4">
    //     <Link href="/">Header</Link>
    //     <a href="/movies">Movies</a>
    //   </div>

    // </NavLink>
  );
}
