import { Route, Routes } from "react-router-dom";
import Form from "./Form";
import List from "./List";

const Products = () => {
    return (
        <Routes>
            <Route path=":productId" element={<Form />} />
            <Route path="" element={<List />} />
        </Routes>
    );
}

export default Products;