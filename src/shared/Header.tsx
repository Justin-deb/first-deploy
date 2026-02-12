import { NavLink } from "react-router-dom";

export default function Header() {
  const selected = ({isActive}:{isActive:boolean}) =>{
    return "text-black text-2xl rounded-md px-2 py-1 hover:bg-neutral-300 " + (isActive? 'bg-neutral-200 border-2' : '')
  }

  return (
    <nav>
      <div className="flex items-center justify-between border-b-neutral-300 border-b-2">
        <div className="flex flex-1 items-center justify-between">
          <NavLink to='/' className="flex shrink-0 items-center pl-3 text-2xl">
            <p>Movie Catalog</p>
          </NavLink>
          <div>
            <div className="flex space-x-3 py-3 px-3">
              <NavLink to="/" className={selected}>
                <p>Home</p>

              </NavLink>
              <NavLink to="/movies" className={selected}>
                <p>Movies</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
