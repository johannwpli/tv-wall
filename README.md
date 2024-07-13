Contents
---
1	[TLDR](#tldr)  
2	[Author](#author)  
3	[Origin](#origin)  
4	[Instructions](#instructions)  
5	[Breakpoints](#breakpoints)  
6	[References](#references)  


TLDR
---
WeWatch.cc http://wewatch.cc<sup>[1]</sup> - enjoy watching your favorite YouTube videos effortlessly


Author
---
Johann Li

`LINKEDIN` https://www.linkedin.com/in/johannwpli/

`GITHUB` https://github.com/johannwpli/

`WEBSITE` https://johann.li/


Origin
---
As the successor to the TV wall project, we will add more functions in the future while ensuring normal operation.


Instructions
---
`COMPATIBILITY` Supports multiple browsers and devices, including mobiles, tablets, laptops, desktops, and TVs.

`HIDDEN MENUS` Use 'm' as the menu param to show hidden menus, e.g., http://wewatch.cc/?m=IU, to show IU videos.

`CUSTOM IDS` Use 'i' as the id param to customize your video list, e.g., http://wewatch.cc/?i=kJQP7kiw5Fk,JGwWNGJdvx8, to build your video list with YouTube video IDs separated by a comma.

`CUSTOM NAME` Use 'n' as the name param to set your name of the video list, e.g., http://wewatch.cc/?i=kJQP7kiw5Fk,JGwWNGJdvx8&n=LetsParty, to have 'LetsParty' as your name.

`VIDEO NUMBERS` Use 'g' as the grid param to play a specific number of or all videos, e.g., http://wewatch.cc/?g=all, to play all the videos.

`DISPLAY LANGUAGE` Use 'l' as the language param to set the display language, e.g., http://wewatch.cc/?l=jp, to set Japanese as the display language.

`THEATER MODE` Use the drop-down menu to watch the video in theater mode., e.g., select 1 to watch the top left video<sup>[2]</sup>.

`HOTKEY` Press the keyboard to trigger the hotkey to the theater mode., e.g., press 0 to activate the '0' of theater mode.


Breakpoints
---  
<pre>
 Pixel       | Device                   | Class    |  NoVA<sup>[3]</sup> | Default
-------------+--------------------------+----------+---------+---------
  min -  576 | Mobile devices           | mobile   | 1, 2, 3 |       3
-------------+--------------------------+----------+---------+---------
  577 -  768 | iPads, tablets           | tablet   |    4, 6 |       6
-------------+--------------------------+----------+---------+---------
  769 -  992 | Small screens, laptops   | laptop   |    8, 9 |       9
-------------+--------------------------+----------+---------+---------
  993 - 1200 | Large screens, desktops  | desktop  |  12, 15 |      12
-------------+--------------------------+----------+---------+---------
 1201 -  max | Extra large screens, TVs | xlscreen |  16, 20 |      15
</pre>


References
---
1. Redirects to https://johannwpli.github.io/tv-wall/.  
2. The alphanumeric of the top left video is 1, then 2, and so on, from left to right, top to down.  
3. Number of Videos Available, derived from https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints.