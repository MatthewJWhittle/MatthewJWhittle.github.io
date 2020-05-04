import React from "react"
import SiteTitle from "./site-title"



export default () => (
    <div class="row">
        <div class="banner-container">
            <img src={require("../images/Bombus pascorum-9352.png")} alt="Banner" class="title-banner" />
            <div class="title-banner-overlay">
                <h1 class="title-banner-overlay"><SiteTitle /></h1>
            </div>
        </div>
    </div>
)