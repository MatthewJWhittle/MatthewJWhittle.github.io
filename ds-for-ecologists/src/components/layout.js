import Gatsby from "gatsby"
import Navbar from "./navbar"
import React from "react"
import layoutStyles from "./styles.css"
import bootstrap from 'bootstrap/dist/css/bootstrap.css'


export default ({ children }) => (
    // Helmet for md files where there are leaflet maps
    <>
        <div class="container-fluid w-100">
            <Navbar />
            {children}
        </div>
    </>
)