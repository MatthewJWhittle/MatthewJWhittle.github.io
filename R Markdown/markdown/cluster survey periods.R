data <- read_csv("data/timesseries example.csv")


cluster_dates <- 
  function(x, h = 20){
  
    
    x_unique <- x %>% unique()  
  
  x_num_unique <-   x_unique %>% as.numeric()

tree <- x_num_unique %>% dist() %>% hclust() 

groups <- tree %>% cutree(h = h) 


output <- left_join(tibble(x = x), tibble(x = x_unique, groups), by = "x")



output$groups %>% return()

}


RColorBrewer::display.brewer.all()

data <- 
  data %>%
  group_by(position) %>%
  mutate(survey_period = date %>% cluster_dates(h = 20) %>% factor())



data %>%
  group_by(position, date, survey_period) %>%
  summarise(number_of_files = n()) %>%
  ggplot(aes(x = date, y = position)) +
  geom_point(aes(size = number_of_files, colour = survey_period), alpha = 0.5, fill = "grey") + 
  theme_light() + scale_color_brewer(palette = "Set1")



