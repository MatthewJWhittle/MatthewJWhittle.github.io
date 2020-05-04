---
path: "/tutorials/importing-multiple-spreadsheets"
title: "Importing multiple spreadsheets in R"
category: "tutorial"
author: "Matthew Whittle"
date: "2020-05-02"
---
<!--html_preserve-->
<script>
  addClassKlippyTo("pre.r, pre.markdown");
  addKlippy('right', 'top', '#BEBEBE', '1', 'Copy code', 'Copied!');
</script>
<!--/html_preserve-->
![](images/great-crested-newt.jpg)

<br/>

Introduction
============

------------------------------------------------------------------------

You’ve finished a tough season of great crested newt surveys and you’ve
been asked to pick up the analysis of the survey data.

No problem! Find the results spreadsheet and knock together a few
formulas in Excel, easy!

Think again… Unfortunately, your colleague informs you that all the
survey data is stored in individual proformas, spanning three seasons of
survey work. When you have a look at the data you also realise that the
site ID, year and month data is encoded in the file name, not the
proforma! This is either a day of your life you will not get back
copying and pasting data between spreadsheets, or a job for R!

Importing data into R is really easy and with a few tricks, it is
possible to build some really powerful analysis pipelines. In this
tutorial, we’ll focus on how you can import multiple files into R and
extract structured data from the file names.

In this tutorial, we’re going to learn how to:

-   List the file names for all files within a given folder;
-   Read them into R and combine them into one data frame; and,
-   Extract structured data from the file names.

<br/>

Data
====

------------------------------------------------------------------------

The data for this tutorial was originally sourced from Natural England’s
dataset: [Great Crested Newts eDNA Pond Surveys for District Level
Licensing
(England)](https://naturalengland-defra.opendata.arcgis.com/datasets/great-crested-newts-edna-pond-surveys-for-district-level-licensing-england?geometry=-7.951%2C52.123%2C6.111%2C54.422).
It is available under an Open Government Licence so is free for anyone
to use. To simulate the above scenario, I’ve stripped out a few
variables and split the data up into individual csvs by site ID and
survey month. **Note**: the site ID is a meaningless dummy variable that
I have randomly attributed and it shouldn’t be used for any analysis.

In reality, you would probably encounter a more complex challenge than
this scenario. There are a whole host of data quality issues which you
might need to account for. Column names could be spelt inconsistently
and some spreadsheets might be duplicated or corrupt. Maybe your data is
stored in a remote database or you have different types of survey
proforma all in the same folder.

These problems are solvable but beyond the scope of this tutorial!

<br/>

Packages
========

------------------------------------------------------------------------

We’ll be using the following packages from the `tidyverse` in this
tutorial:

-   `readr` for reading in csv files;
-   `dplyr` for manipulating data frames;
-   `magrittr` for the pipe `%>%`; and,
-   `stringr` to extract information from the file names.

All of the above can be loaded using the libray function:

``` r
library(tidyverse)
```

``` code-warning
## Warning: package 'tibble' was built under R version 3.6.2
```

<br/>

First Steps: checking the data
==============================

------------------------------------------------------------------------

It is a good idea to perform a few quick checks on the dataset and file
system before we get started. We want to understand what the file naming
convention, where it is stored and how the csvs are structured. If you
navigate to the folder path you should see the following file structure:

``` code-output
##                              levelName
## 1  data                               
## 2   °--raw                            
## 3       °--gcn survey results         
## 4           ¦--Site A - April 2018.csv
## 5           ¦--Site A - April 2019.csv
## 6           ¦--Site A - July 2018.csv 
## 7           ¦--Site A - June 2017.csv 
## 8           ¦--Site A - June 2018.csv 
## 9           ¦--Site A - June 2019.csv 
## 10          ¦--Site A - May 2017.csv  
## 11          ¦--Site A - May 2018.csv  
## 12          ¦--Site A - May 2019.csv  
## 13          ¦--Site B - April 2018.csv
## 14          ¦--Site B - April 2019.csv
## 15          ¦--Site B - July 2018.csv 
## 16          ¦--Site B - June 2017.csv 
## 17          ¦--Site B - June 2018.csv 
## 18          ¦--Site B - June 2019.csv 
## 19          ¦--Site B - May 2017.csv  
## 20          ¦--Site B - May 2018.csv  
## 21          ¦--Site B - May 2019.csv  
## 22          ¦--Site C - April 2018.csv
## 23          ¦--Site C - April 2019.csv
## 24          ¦--Site C - July 2018.csv 
## 25          ¦--Site C - June 2017.csv 
## 26          ¦--Site C - June 2018.csv 
## 27          ¦--Site C - June 2019.csv 
## 28          ¦--Site C - May 2017.csv  
## 29          ¦--Site C - May 2018.csv  
## 30          ¦--Site C - May 2019.csv  
## 31          ¦--Site D - April 2018.csv
## 32          ¦--Site D - April 2019.csv
## 33          ¦--Site D - July 2018.csv 
## 34          ¦--Site D - June 2017.csv 
## 35          ¦--Site D - June 2018.csv 
## 36          ¦--Site D - June 2019.csv 
## 37          ¦--Site D - May 2017.csv  
## 38          ¦--Site D - May 2018.csv  
## 39          ¦--Site D - May 2019.csv  
## 40          ¦--Site E - April 2018.csv
## 41          ¦--Site E - April 2019.csv
## 42          ¦--Site E - July 2018.csv 
## 43          ¦--Site E - June 2017.csv 
## 44          ¦--Site E - June 2018.csv 
## 45          ¦--Site E - June 2019.csv 
## 46          ¦--Site E - May 2017.csv  
## 47          ¦--Site E - May 2018.csv  
## 48          °--Site E - May 2019.csv
```

We can see that all files are stored in one folder (“gcn survey
results”) and they are named according to their site and the month in
which the site was surveyed. This information is encoded consistently,
so it will be easy enough to extract structured data from it.

Let’s perform another check. Read in two of the files using read\_csv,
and compare them by using the glimpse function.

``` r
file1 <- read_csv("data/raw/gcn survey results/Site D - May 2018.csv")
file2 <- read_csv("data/raw/gcn survey results/Site E - June 2019.csv")
```

Do they have the same number of columns? Are they in the same order and
spelt consistently? Can you spot any data quality issues that we might
need to fix?

``` r
glimpse(file1)
```

``` code-output
## Rows: 247
## Columns: 14
## $ easting      <dbl> 375777, 383548, 385563, 392251, 395151, 395729, 396732, …
## $ northing     <dbl> 229600, 220811, 222886, 231324, 232956, 217171, 207580, …
## $ si1_loc_si   <dbl> 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,…
## $ si2_ar_si    <dbl> 0.42, 0.26, 0.05, 0.21, 0.10, 0.21, 0.97, 0.10, 0.21, 0.…
## $ si3_dry_si   <dbl> 0.1, 0.5, 0.1, 0.5, 0.1, 1.0, 0.9, 0.9, 0.5, 0.9, 0.9, 0…
## $ si4_w_q_si   <dbl> 0.67, 0.67, 0.33, 0.67, 0.33, 0.33, 1.00, 0.67, 0.33, 0.…
## $ si5_sh_si    <dbl> 1.0, 0.6, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.2, 1.0, 1.0, 1…
## $ si6_fl_si    <dbl> 0.67, 0.67, 0.67, 0.67, 1.00, 1.00, 0.67, 1.00, 1.00, 0.…
## $ si7_fh_si    <dbl> 0.67, 0.67, 1.00, 0.67, 1.00, 0.67, 1.00, 0.01, 0.67, 0.…
## $ si8_pds_si   <dbl> 1.00, 0.58, 0.90, 1.00, 0.75, 0.58, 0.10, 0.96, 0.75, 0.…
## $ si9_ter_si   <dbl> 0.67, 0.67, 1.00, 1.00, 1.00, 1.00, 1.00, 0.33, 0.67, 1.…
## $ si10_mac_1   <dbl> 0.72, 1.00, 0.30, 0.30, 0.30, 0.30, 0.40, 0.45, 0.30, 0.…
## $ gcn_present  <dbl> 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0,…
## $ day_of_month <dbl> 24, 23, 23, 30, 30, 29, 18, 29, 29, 31, 31, 24, 1, 2, 1,…
```

``` r
glimpse(file2)
```

``` code-output
## Rows: 182
## Columns: 14
## $ easting      <dbl> 377825, 378072, 555490, 560534, 567890, 568676, 561820, …
## $ northing     <dbl> 256427, 248842, 114440, 114662, 113840, 112658, 112490, …
## $ si1_loc_si   <dbl> 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,…
## $ si2_ar_si    <dbl> 0.63, 0.36, 0.94, 0.81, 0.31, 0.17, 0.31, 0.13, 0.31, 0.…
## $ si3_dry_si   <dbl> 0.10, 0.10, 0.50, 0.90, 0.90, 0.50, 0.50, 0.50, 0.90, 0.…
## $ si4_w_q_si   <dbl> 0.33, 0.33, 0.67, 0.33, 1.00, 0.33, 0.67, 0.67, 0.67, 0.…
## $ si5_sh_si    <dbl> 0.7, 0.2, 0.3, 1.0, 1.0, 0.6, 0.4, 0.2, 0.9, 0.6, 0.4, 0…
## $ si6_fl_si    <dbl> 1.00, 1.00, 1.00, 0.67, 1.00, 1.00, 1.00, 1.00, 0.67, 0.…
## $ si7_fh_si    <dbl> 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 0.67, 1.…
## $ si8_pds_si   <dbl> 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.…
## $ si9_ter_si   <dbl> 1.00, 1.00, 0.67, 1.00, 1.00, 0.67, 1.00, 1.00, 1.00, 0.…
## $ si10_mac_1   <dbl> 0.65, 0.30, 0.35, 0.35, 0.90, 0.35, 0.45, 0.30, 0.61, 0.…
## $ gcn_present  <dbl> 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,…
## $ day_of_month <dbl> 11, 19, 18, 17, 25, 25, 18, 18, 26, 18, 25, 25, 11, 26, …
```

On this occasion, there aren’t any of the above issues because I’ve
simulated these data from a tidy dataset. This won’t always be the case.

There is one challenge posed by our dataset. Information about the date
and location of surveys is stored within the file name - not the
spreadsheet. These are key pieces of information that will be used in
analysis and reporting. Without them our data are useless so we’ll need
to extract somehow extract this information.

<br/>

List the files
==============

------------------------------------------------------------------------

The first step in importing the data is to build a list of files. This
can be achieved using `list.files()`. This function takes a path to a
folder and will return a vector of the names of the files it contains.
We can also specify arguments to list files in all sub-folders using
`recursive = TRUE` and return the full path to each file using
`full.names = TRUE`.

-   Assign the folder path to a variable: `folder_path`
-   Pass it as the first argument to `list.files()`
    -   Specify `full.names = TRUE`
-   Save the result to `files_to_import`
-   Check the result by printing the first 6 elements of
    `files_to_import` using the `head()` function.

There aren’t any spreadsheets within sub-folders so we do not need to
specify the `recursive = TRUE`.

``` r
# Specify folder path
folder_path <- "data/raw/gcn survey results"

# List the files
files_to_import <- list.files(path = folder_path, full.names = T)

# Print the first 6 files
head(files_to_import)
```

``` code-output
## [1] "data/raw/gcn survey results/Site A - April 2018.csv"
## [2] "data/raw/gcn survey results/Site A - April 2019.csv"
## [3] "data/raw/gcn survey results/Site A - July 2018.csv" 
## [4] "data/raw/gcn survey results/Site A - June 2017.csv" 
## [5] "data/raw/gcn survey results/Site A - June 2018.csv" 
## [6] "data/raw/gcn survey results/Site A - June 2019.csv"
```

Because we specified `full.names = TRUE`, the function has concatenated
the folder path and file name into a file path. This is useful because
we can now refer directly to each file using `files_to_import`. If we
had a complex file structure with many sub-folders, this would save us a
lot of hard work.

In some cases, you might have a variety of files within a folder and
only require certain ones (only csvs, files matching a specific word or
number, etc.). To achieve this you could use the `pattern` argument with
a [regular
expression](https://stringr.tidyverse.org/articles/regular-expressions.html)
(more on them later).

<br/>

Import the data
===============

------------------------------------------------------------------------

Now we have a path to each file in `files_to_import` we can write some
code to import them.

We can use `read_csv()` to read CSV files into R. However, this function
only takes a single file path as an argument. To import every file in
`files_to_import` we need to modify our use of `read_csv` to *iterate*
over each path in the vector.

Iteration is the repeated execution of a process. There are many methods
of iteration in R and I would recommend reading [R for Data Science (\#
21
Iteration)](%5Bhttps://r4ds.had.co.nz/iteration.html%5D(https://r4ds.had.co.nz/iteration.html))
for a great introduction to the subject.

We’ll use the `map` function from the `purrr` package. I think this is
the clearest and most efficient method for this particular problem. This
could also be done using a `for` loop or the `lapply` function.

`map` takes up to three arguments:

-   `.x` - a list or vector
-   `.f` - a function to perform on each element of `.x`
-   `...` - additional argument(s) for `.f` (in the format:
    `argument_name = "value"`)

<br/> `map` always returns a list containing the output from each
execution of `.f`. So to read in our survey data, we can pass in the
vector of file paths a `.x`, the `read_csv` function as `.f` and any
additional arguments for `read_csv` in `...`. `map` will read in each
file by passing the file paths to read\_csv individually and it will
return a list of data frames.

Use the map function to read in the survey data and store the result in
`survey_data`.

-   Pass `files_to_import` to `.x`
-   Pass `read_csv` to `.f` *without* the parenthesesis

``` r
survey_data <- map(.x = files_to_import, .f = read_csv)
```

Print the first six elements of `survey_data` using the `head` and
`length` functions.

``` r
# How many files did it read in?
length(survey_data)
```

``` code-output
## [1] 45
```

``` r
# Check the first six
head(survey_data)
```

``` code-output
## [[1]]
## # A tibble: 88 x 14
##    easting northing si1_loc_si si2_ar_si si3_dry_si si4_w_q_si si5_sh_si
##      <dbl>    <dbl>      <dbl>     <dbl>      <dbl>      <dbl>     <dbl>
##  1  375454   206955          1      0.63        0.9      1           0.4
##  2  411682   200040          1      1           0.9      1           1  
##  3  412901   201483          1      0.05        0.5      0.330       0.2
##  4  427081   211923          1      0.1         0.9      0.67        1  
##  5  427745   204935          1      0.05        0.1      0.67        1  
##  6  428595   200897          1      0.8         0.9      0.67        1  
##  7  437012   213410          1      0.1         0.1      0.330       0.4
##  8  440715   228762          1      0.1         1        0.67        1  
##  9  445151   217179          1      0.3         1        1           1  
## 10  445620   213501          1      0.05        0.5      0.67        0.3
## # … with 78 more rows, and 7 more variables: si6_fl_si <dbl>, si7_fh_si <dbl>,
## #   si8_pds_si <dbl>, si9_ter_si <dbl>, si10_mac_1 <dbl>, gcn_present <dbl>,
## #   day_of_month <dbl>
## 
## [[2]]
## # A tibble: 177 x 14
##    easting northing si1_loc_si si2_ar_si si3_dry_si si4_w_q_si si5_sh_si
##      <dbl>    <dbl>      <dbl>     <dbl>      <dbl>      <dbl>     <dbl>
##  1  353650   250059          1      0.97        0.9      0.330       0.6
##  2  324386   245133          1      0.21        0.5      0.01        1  
##  3  364709   241904          1      0.05        0.1      0.330       0.6
##  4  361940   253003          1      1           0.9      0.330       0.6
##  5  331272   233217          1      0.31        1        0.67        1  
##  6  330867   234516          1      0.05        0.5      0.67        0.6
##  7  332218   235237          1      0.63        1        0.67        1  
##  8  361601   249343          1      0.94        1        0.330       1  
##  9  328722   251850          1      0.63        0.9      0.67        1  
## 10  370759   244807          1      0.63        0.9      1           1  
## # … with 167 more rows, and 7 more variables: si6_fl_si <dbl>, si7_fh_si <dbl>,
## #   si8_pds_si <dbl>, si9_ter_si <dbl>, si10_mac_1 <dbl>, gcn_present <dbl>,
## #   day_of_month <dbl>
## 
## [[3]]
## # A tibble: 2 x 14
##   easting northing si1_loc_si si2_ar_si si3_dry_si si4_w_q_si si5_sh_si
##     <dbl>    <dbl>      <dbl>     <dbl>      <dbl>      <dbl>     <dbl>
## 1  497260   419233          1      0.91        0.9       1            1
## 2  379198   347793          1      0.8         1         0.67         1
## # … with 7 more variables: si6_fl_si <dbl>, si7_fh_si <dbl>, si8_pds_si <dbl>,
## #   si9_ter_si <dbl>, si10_mac_1 <dbl>, gcn_present <dbl>, day_of_month <dbl>
## 
## [[4]]
## # A tibble: 20 x 14
##    easting northing si1_loc_si si2_ar_si si3_dry_si si4_w_q_si si5_sh_si
##      <dbl>    <dbl>      <dbl>     <dbl>      <dbl>      <dbl>     <dbl>
##  1  338000   371000          1      1           0.9      0.67        1  
##  2  344171   347186          1      0.94        0.9      0.330       1  
##  3  347460   371000          1      0.2        NA        0.330       0.2
##  4  350000   375000          1      0.05        1        1           1  
##  5  358000   387000          1      0.94        0.1      0.67        1  
##  6  361000   384000          1      1           0.9      0.67        1  
##  7  361160   375700          1      0.5         1        0.67        1  
##  8  361530   348730          1      0.3         0.9      0.67        0.7
##  9  362000   385000          1      0.05        1        0.330       1  
## 10  365000   359000          1      1           0.9      0.67        1  
## 11  366000   392000          1      0.88        0.9      1           1  
## 12  368000   345000          1      0.52        0.9      0.330       1  
## 13  369000   387000          1      0.05        1        0.330       1  
## 14  372162   364776          1      0.42        0.5      0.67        1  
## 15  373000   385000          1      0.83        1        0.330       0.4
## 16  373207   346859          1      1           0.9      0.5         0.9
## 17  378000   356000          1      0.29        1        0.330       0.5
## 18  380000   367000          1      0.05        0.9      1           1  
## 19  384000   384000          1      0.89        0.9      0.67        0.8
## 20  387000   366000          1      1           0.9      0.330       1  
## # … with 7 more variables: si6_fl_si <dbl>, si7_fh_si <dbl>, si8_pds_si <dbl>,
## #   si9_ter_si <dbl>, si10_mac_1 <dbl>, gcn_present <dbl>, day_of_month <dbl>
## 
## [[5]]
## # A tibble: 152 x 14
##    easting northing si1_loc_si si2_ar_si si3_dry_si si4_w_q_si si5_sh_si
##      <dbl>    <dbl>      <dbl>     <dbl>      <dbl>      <dbl>     <dbl>
##  1  376158   213990          1      0.21        0.9      0.330       1  
##  2  378656   291120          1      0.05        0.9      0.67        0.2
##  3  381219   216956          1      0.1         0.5      0.67        1  
##  4  387662   214615          1      0.1         0.5      0.330       1  
##  5  397989   216171          1      0.1         1        0.330       0.7
##  6  403023   226210          1      0.63        0.9      0.67        1  
##  7  404678   225712          1      0.97        0.9      0.330       1  
##  8  408139   223257          1      0.42        1        0.67        1  
##  9  413699   227992          1      0.31        0.9      0.67        1  
## 10  413994   228021          1      0.1         0.1      0.67        1  
## # … with 142 more rows, and 7 more variables: si6_fl_si <dbl>, si7_fh_si <dbl>,
## #   si8_pds_si <dbl>, si9_ter_si <dbl>, si10_mac_1 <dbl>, gcn_present <dbl>,
## #   day_of_month <dbl>
## 
## [[6]]
## # A tibble: 178 x 14
##    easting northing si1_loc_si si2_ar_si si3_dry_si si4_w_q_si si5_sh_si
##      <dbl>    <dbl>      <dbl>     <dbl>      <dbl>      <dbl>     <dbl>
##  1  326000   252000          1      0.21       0.5       0.330       1  
##  2  364430   233056          1      0.52       1         0.01        1  
##  3  365008   236754          1      0.26       1         1           1  
##  4  370317   248243          1      0.52       0.9       0.01        1  
##  5  378259   255912          1      1          0.9       0.330       1  
##  6  378260   249362          1      1          0.9       0.67        1  
##  7  330947   254767          1      0.96       0.9       0.67        1  
##  8  509100   129300          1      1          0.5       1           1  
##  9  510290   128790          1      0.84       0.9       0.67        1  
## 10  564830   130930          1      0.05       0.01      0.330       0.6
## # … with 168 more rows, and 7 more variables: si6_fl_si <dbl>, si7_fh_si <dbl>,
## #   si8_pds_si <dbl>, si9_ter_si <dbl>, si10_mac_1 <dbl>, gcn_present <dbl>,
## #   day_of_month <dbl>
```

Looks like it worked. Great!

<br/>

From a list to a data frame
===========================

------------------------------------------------------------------------

We’ve read in the data, but we can’t actually do any analysis yet. There
are still a couple of problems to solve. `map` has given us a list
containing one data frame per file. What we need is a single data frame
containing all of our data. The data are also missing the location and
date of surveys which is stored in the file names. We need to extract
this and add it into our data frames.

We’ll solve the above problems in the following order:

1.  Add each file path as a variable into its respective data frame
    within `survey_data`.
2.  Bind the data together into one data frame using `bind_rows()`.
3.  Extract the survey date and location from the file path and
    construct two variables: `site_id` and `date`.

<br/>

Add the file path variable
--------------------------

------------------------------------------------------------------------

``` r
survey_data <-
  map2(.x = survey_data,
       .y = files_to_import,
       ~ mutate(.x,
                file_path = .y))
```

<br/>

Bind the data
-------------

------------------------------------------------------------------------

<br/>

Extract date and location
=========================

------------------------------------------------------------------------

<br/>