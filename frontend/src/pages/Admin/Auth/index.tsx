import { ReactComponent as AuthImage } from "assets/images/auth-image.svg";
import { Route, Routes } from "react-router-dom";

const Auth = () => {
    return (
        <div className="auth-container">
            <div className="auth-banner">
                <h1>Divulge seus produtos no HK Catalog</h1>
                <p>Faça parte do nosso catálogo de divulgação e aumente a venda dos seus produtos.</p>
                <AuthImage />
            </div>
            <div className="auth-form">
                <Routes>
                    <Route path="login" element={<h1>Login card</h1>} />
                </Routes>
                <Routes>
                    <Route path="signup" element={<h1>Signup card</h1>} />
                </Routes>
                <Routes>
                    <Route path="recover" element={<h1>Recover card</h1>} />
                </Routes>
            </div>
        </div>
    )
}

export default Auth;