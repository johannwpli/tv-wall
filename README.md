Contents
---
1	[TLDR](#tldr)  
2	[Author](#author)  
3	[Structurizr Diagram](#structurizr-diagram)  
4	[Origin](#origin)  
5	[Instructions](#instructions)  
6	[Breakpoints](#breakpoints)  
7	[References](#references)  


TLDR
---
TVWall.cc http://tvwall.cc<sup>[1]</sup> - discovering your favorite YouTube videos with ease


Author
---
Johann Li

`LINKEDIN` https://www.linkedin.com/in/johannwpli/

`GITHUB` https://github.com/johannwpli/

`WEBSITE` https://johann.li/


Structurizr Diagram
---
Structurizr builds upon "diagrams as code", allowing you to create multiple software architecture diagrams from a single model<sup>[2]</sup>.  
  
System Context  
![Structurizr System Context Image](image/structurizr-SystemContext-001.png "Structurizr System Context")  
  
System Context Key  
![Structurizr System Context Key Image](image/structurizr-SystemContext-001-key.png "Structurizr System Context Key")  
  
Container  
![Structurizr Container Image](image/structurizr-Container-001.png "Structurizr Container")  
  
Container Key  
![Structurizr Container Key Image](image/structurizr-Container-001-key.png "Structurizr Container Key")  


Origin
---
The TV Wall project was inspired by the [反送中直播台 No China Extradition Live](https://ncehk2019.github.io/) project<sup>[3]</sup>, which live-streamed Hong Kong in 2019. Wars never really end, and they are always happening somewhere or the other. In 2014, people in Taiwan fought against their government, while in 2020, it was the people of Thailand and Belarus. In 2021, the struggle for democracy continued in Myanmar and Iran, and in 2022, it was China's turn. Additionally, battles between countries such as Russia and Ukraine have continued for a long time. However, citizens of the earth who value democracy will always stand together and fight for freedom.


Instructions
---
`COMPATIBILITY` TV Wall supports multi browsers and devices, including mobiles, tablets, laptops, and desktops.

`HIDDEN MENUS` Use 'm' as the menu param to show hidden menus, e.g., http://tvwall.cc/?m=IU, to show IU videos.

`CUSTOM IDS` Use 'i' as the id param to customize your video list<sup>[4]</sup>, e.g., http://tvwall.cc/?i=kJQP7kiw5Fk,JGwWNGJdvx8, to build your video list with these 2 YouTube video IDs.

`VIDEO NUMBERS` Use 'g' as the grid param to play a specific number of or all videos, e.g., http://tvwall.cc/?g=all, to play all the videos.

`DISPLAY LANGUAGE` Use 'l' as the language param to set the display language, e.g., http://tvwall.cc/?l=jp, to set Japanese as the display language.

`THEATER MODE` Use the drop-down menu<sup>[5]</sup> to watch the video in theater mode., e.g., select 1 to watch the top left video.

`HOTKEY` Press the keyboard to trigger the hotkey to the theater mode., e.g., press 0 to activate the '0' of theater mode.


Breakpoints
---  
<pre>
 Pixel       | Device                  | Class   | NoVA<sup>[6]</sup>   | Default
-------------+-------------------------+---------+---------+---------
      -  576 | Mobile devices          | mobile  | 1, 2, 3 |       3
-------------+-------------------------+---------+---------+---------
  577 -  768 | iPads, tablets          | tablet  |    4, 6 |       6
-------------+-------------------------+---------+---------+---------
  769 -  992 | Small screens, laptops  | laptop  |    8, 9 |       9
-------------+-------------------------+---------+---------+---------
  993 - 1200 | Large screens, desktops | desktop |  12, 15 |      12
-------------+-------------------------+---------+---------+---------
 1201 -      | Extra large screens, TV | lscreen |  16, 20 |      15
</pre>


References
---
1. Redirects to https://johannwpli.github.io/tv-wall/.  
2. Read more at https://structurizr.org/ and https://c4model.com/.  
3. Hosted from https://github.com/ncehk2019/ncehk2019.github.io.  
4. Place YouTube video IDs separated by a comma.  
5. The number of the top left video is 1, then 2, and so on, from left to right, top to down.  
6. Number of Videos Available, derived from https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints.