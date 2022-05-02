import Navbar from "./Navbar";
import { Routes, Route } from 'react-router-dom';
import './styles.css';

const Admin = () => {
    return (
        <div className="admin-container">
            <Navbar />
            <div className="admin-content">
                <Routes>
                    <Route path="products" element={<h1>TEste!!</h1>}/>
                    <Route path="categories" element={<h1>ste!!</h1>}/>
                    <Route path="users" element={<h1>Te!!</h1>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Admin;