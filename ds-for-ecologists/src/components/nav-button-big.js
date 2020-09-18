import React from "react"

export default ({ linkTo, displayText }) => (
    <div>
        <div class = "container-nav-button">

            <a class="clean no-highlight" href={linkTo}>
                <div class="nav-button-big">
                    {displayText}
                    {/* need to give the display text a class then alight that center. */}
                </div>
            </a>
        </div>
    </div>
)