import { createRoot } from "react-dom/client";
import "./custom.css"; // Import style [cite: 705]
import BiodataDiri from "./BiodataDiri";
import Custom from "./custom";

createRoot(document.getElementById("root")).render(
    <div>
        <BiodataDiri />
        
        <Custom />
    </div>
);