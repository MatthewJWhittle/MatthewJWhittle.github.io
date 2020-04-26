import Gatsby from "gatsby"
import React from "react"
import Fillerp from "../components/filler-text"

export default () => (
    <div class="row linkrow">
        <div class="container">
            <div class="row pt-4">
                <div class="col-2">
                    <div class="img-wrapper">

                        <img src={require("../images/r.png")} class="linkrow" ></img>
                    </div>
                </div>
                <div class="col-4">
                    <div class="row pt-4">
                        <h1>The title of the linked page/article</h1>
                    </div>
                    <div class="row pt-4">
                        <h2>2020-04-01</h2>
                    </div>
                </div>
                <div class="col-6">
                    <Fillerp />
                </div>
            </div>
        </div>
    </div >
)