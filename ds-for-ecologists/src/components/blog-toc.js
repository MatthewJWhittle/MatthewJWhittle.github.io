import React from 'react'
import Slugger from 'github-slugger'
import { Link } from 'gatsby'

const slugger = new Slugger()

export default ({ headings, path }) => (
    <div class="toc">
        <ul class = "toc">
            {headings
                .filter(heading => heading.depth <= 2)
                .map(heading => (
                    <li class = "toc" key={heading.value}>
                        <Link to={path + '#' + slugger.slug(heading.value)}>{heading.value}</Link>
                    </li>
                ))}
        </ul>
    </div>
)