# Introduction
This document includes working notes of how to include leaflet maps in files rendered by knitr and gatsby.

# Leaflet
[](https://leafletjs.com/examples/quick-start/)
As above it's necessary to include style and script headers for leaflet files

It may be neccessary to either include the following in the layout component or use a plugin. 
```html
    <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin="" />
        <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>
    </Helmet>
```

# Gatsby plugins
https://www.gatsbyjs.org/packages/gatsby-plugin-react-leaflet/

# knitr
Create a [custom hook function](https://yihui.org/knitr/hooks/#jekyll-render-jekyll) to modify the output of code chunks in a [window function](https://www.gatsbyjs.org/packages/gatsby-plugin-react-leaflet/):

