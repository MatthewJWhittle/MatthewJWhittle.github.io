A class can be attached to the `<pre>` tag using a knitr hook:

```r
knitr::knit_hooks$set(source = function(x, options) {
  return(paste0(
    "```{.r",
    ifelse(is.null(options$class),
      "", 
      paste0(" .", gsub(" ", " .", options$class))
    ),
    "}\n",
    x,
    "\n```"
  ))
})
```

source: [https://stackoverflow.com/questions/37944197/add-a-css-class-to-single-code-chunks-in-rmarkdown](https://stackoverflow.com/questions/37944197/add-a-css-class-to-single-code-chunks-in-rmarkdown)