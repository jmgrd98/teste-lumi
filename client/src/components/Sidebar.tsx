import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <aside className="h-screen p-10 w-1/5 bg-black ">
        <nav>
          <ul className="flex flex-col gap-5">
            <li>
              <Link className='text-white font-bold' to="/">Dashboard</Link>
            </li>
            <li>
              <Link className='text-white font-bold' to="/library">Biblioteca de faturas</Link>
            </li>
          </ul>
        </nav>
    </aside>
  )
}

export default Sidebar