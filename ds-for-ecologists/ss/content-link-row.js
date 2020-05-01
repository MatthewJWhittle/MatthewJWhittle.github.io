import Gatsby from "gatsby"
import React from "react"
import Fillerp from "../src/components/filler-text"

export default () => (
    <div class="row linkrow">
        <div class="container">
            <div class="row pt-4">
                <div class="col-4 link-image-container">
                    <img src={require("../images/IMG_3031.jpg")} class="linkrow" ></img>
                </div>
                <div class="col-8">
                    <div class="link-description-container">
                        <div class="row">
                            <p class="link-category">Tutorial</p>
                        </div>
                        <div class="row">
                            <h1 class="link-title">Really Long Article Title About Something Interesting</h1>
                        </div>
                        <div class="row">
                            <div>
                                <p class="link-description">
                                    <Fillerp />
                                </p>
                            </div>
                        </div>
                        <div class="row">
                            <p class="link-details">
                                By Matthew Whittle on 3rd April, 2020
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div >
)