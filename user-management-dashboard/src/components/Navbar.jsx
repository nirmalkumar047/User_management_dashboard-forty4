import { Link } from 'react-router-dom';

const Navbar = () => {
return (
    <nav className="navbar" style={{
        background: 'linear-gradient(90deg, #4e54c8 0%, #8f94fb 100%)',
        padding: '1rem 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
    }}>
        <div className="nav-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 2rem'
        }}>
            <Link to="/" className="nav-brand" style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1.6rem',
                letterSpacing: '1px',
                textDecoration: 'none',
                textShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}>
                User Management
            </Link>
            <div className="nav-links" style={{
                display: 'flex',
                gap: '1.5rem'
            }}>
                <Link to="dashboard" className="nav-link" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '24px',
                    transition: 'background 0.2s, color 0.2s',
                    background: 'rgba(255,255,255,0.08)'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#fff'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onFocus={e => e.currentTarget.style.background = '#fff'}
                >
                    <span style={{color: '#4e54c8'}}>Dashboard</span>
                </Link>
                <Link to="userform" className="nav-link" style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '1rem',
                    padding: '0.5rem 1.2rem',
                    borderRadius: '24px',
                    transition: 'background 0.2s, color 0.2s',
                    background: 'rgba(255,255,255,0.08)'
                }}
                onMouseOver={e => e.currentTarget.style.background = '#fff'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                onFocus={e => e.currentTarget.style.background = '#fff'}
                >
                    <span style={{color: '#4e54c8'}}>Add User</span>
                </Link>
            </div>
        </div>
    </nav>
);
};

export default Navbar;
