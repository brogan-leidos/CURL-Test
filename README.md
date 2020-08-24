# Curl Test

https://brogan-leidos.github.io/CURL-Test/

Overview: Compare and contrast common mid picks in league to find who has the most damage/CC/mobility and whatever else might be helpful


Basic plan:
 - Pull in stats and abilities for all common mid champs using rito api
 - Have some global settings like ability duration (for guys like anivia, swaine, and the like)
   -- Global settings:
    -- AP
    -- Magic Pen
    -- Fight duration
      -- **Reuse** abilties on CD check
    -- Champ level (6,11,16,18)
 - Plot the results on a grid of X: AP, Y: enemy MR, Z: enemy HP (for guys like Malzahar and Lillia)
