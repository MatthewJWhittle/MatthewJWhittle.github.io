import React from "react"
import headerStyles from "./header.css"

export default () => (
        <div class="topnav">
            <a class= {headerStyles.active} href="#home">Home</a>
            <a href="#news">Blog</a>
            <a href="#tutorials">Tutorials</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
            <a href="https://www.linkedin.com/in/matthewjwhittle/">Linked In</a>
        </div>
    )