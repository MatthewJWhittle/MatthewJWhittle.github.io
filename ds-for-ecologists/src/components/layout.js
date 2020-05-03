import Gatsby from "gatsby"
import Navbar from "./navbar"
import React from "react"
import layoutStyles from "./layout-styles.css"
import bootstrap from 'bootstrap/dist/css/bootstrap.css'
import codeHighlight from '../styles/code-highlighting.css'


export default ({ children }) => (
    // Helmet for md files where there are leaflet maps
    <>
    <div class="container-fluid w-100">
        <Navbar />
        <div class="row pt-3 w-80">
            <div class="col">
                <div class="page-body">
                    {children}
                </div>
            </div>
        </div>
    </div>
</>
)