import { Link } from 'react-router-dom';

function Header () {
    return (
        <header>
            <Link to="/">
                <button>Page 1</button>
            </Link>
            <Link to="/page2">
                <button>Page 2</button>
            </Link>
        </header>
    )
}

export default Header