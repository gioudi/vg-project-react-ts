import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { CatalogPage } from "../features/gameCatalog/components/CatalogPage";
import { InventoryPage } from "../features/gameInventory/components/InventoryPage";

export const AppRoutes: FC = () => {
    return (
        <BrowserRouter>
            <Navbar></Navbar>


            <Routes>
                <Route path='/' element={<CatalogPage/>}/>
                <Route path='/' element={<InventoryPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}