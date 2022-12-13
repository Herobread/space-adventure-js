// tm - transperency map, shows renderer where to draw symbols,
// helps to ignore spaces after and before object, but keep spaces inside it



export const art = {
  cursor: {
    img: `+`
  },
  textures: {
    logo: {
      img: `   _____                       ___       __                 __
  / ___/____  ____ _________  /   | ____/ /   _____  ____  / /___  __________
  \\__ \\/ __ \\/ __ \\/ ___/ _ \\/ /| |/ __  / | / / _ \\/ __ \\/ __/ / / / ___/ _ \\
 ___/ / /_/ / /_/ / /__/  __/ ___ / /_/ /| |/ /  __/ / / / /_/ /_/ / /  /  __/
/____/ .___/\\__,_/\\___/\\___/_/  |_\\__,_/ |___/\\___/_/ /_/\\__/\\__,_/_/   \\___/
    /_/                                                             
`,
      w: 79,
      h: 6
    },
    ship: {
      img: `<\\__   
 \\  \\  
<= O |-
 /__/  
</     
`,
      tm: `::::   
 ::::  
:::::::
 ::::  
::     
`,
      w: 6,
      h: 5
    },
    asteroids: [
      {
        m: 10,
        w: 5,
        h: 7,
        img: `_/\\   
\\. \\  
|  .\\ 
[    >
|  _/ 
 \\/`,
        tm: `:::   
::::  
::::: 
::::::
::::: 
 ::`
      },
      {
        m: 3,
        w: 4,
        h: 5,
        img: `  _  
 /.\\ 
|  .|
 \\_/ 
`,
        tm: `  :  
 ::: 
:::::
 ::: 
`
      },
      {
        m: 10,
        w: 6,
        h: 5,
        img: ` ___  
/ . \\ 
|   .\\
 \\_  |
   \\/ 
`,
        tm: ` :::  
::::: 
::::::
 :::::
   :: 
`
      },
      {
        m: 10,
        w: 6,
        h: 6,
        img: `  _   
 /.\\  
/  .\\ 
|    |
|   / 
 \\_/  
`,
        tm: `  :   
 :::  
::::: 
::::::
::::: 
 :::  
`
      },
      {
        m: 8,
        w: 5,
        h: 5,
        img: `  _  
 /.\\ 
|  .|
|  / 
 \\/  
`,
        tm: `  :  
 ::: 
:::::
:::: 
 ::  
`
      },
      {
        m: 8,
        w: 5,
        h: 5,
        img: ` /\\  
| .| 
|  .\\
|  _/
 \\/  
`,
        tm: ` ::  
:::: 
:::::
:::::
 ::  
`
      },
      {
        m: 7,
        w: 4,
        h: 5,
        img: `  _  
 /.\\ 
|  .\\
|   |
 \\_-'
`,
        tm: `  :  
 ::: 
:::::
:::::
 ::::
`
      }
    ],
    ufo: {
      w: 10,
      h: 5,
      img: `   .-.   
  _|_|_  
-=_   _=-
   \\_/   
`,
      tm: `   :::   
  :::::  
:::::::::
   :::   
`
    },
    planets: [
      {
        name: 'Mercury',
        img: `         _____         
     .-''     ''-.     
   .* '.  .'     '*.   
  /    .o'          \\  
 |   .' :   '    .   | 
.'       '      :    '.
|             ..o     |
|    '       '  '.    |
|   .   .'   '        |
'.   ''o..           .'
 |    .'  '   '  '   | 
  \\    '            /  
   *,     '     ' ,*   
     '-:._____:--'     
`,
        tm: `         :::::         
     :::::::::::::     
   :::::::::::::::::   
  :::::::::::::::::::  
 ::::::::::::::::::::: 
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
 ::::::::::::::::::::: 
  :::::::::::::::::::  
   :::::::::::::::::   
     :::::::::::::     
`,
        w: 22,
        h: 13
      },
      {
        name: 'Venus',
        img: `         _____         
     .-''     ''-.     
   .*        .   '*.   
  /    .   ':::.    \\  
 |       .  '::'     | 
.'..:::.     ' .  .. '.
|   ''::::..          |
|.:::...::::.::::.:.  |
| ''..:::''''''::::.. |
'.  .::':'  .   ':::..'
 |.''   ' ..  .     :| 
  \\    .  '::.   .  /  
   *,     . '     ,*   
     '-:._____:--'     
`,
        tm: `         :::::         
     :::::::::::::     
   :::::::::::::::::   
  :::::::::::::::::::  
 ::::::::::::::::::::: 
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
 ::::::::::::::::::::: 
  :::::::::::::::::::  
   :::::::::::::::::   
     :::::::::::::     
`,
        w: 22,
        h: 13
      },
      {
        name: 'Earth',
        img: `         _____         
     .-'':    ''-.     
   .*  .'  ': ...'*.   
  /.   :  ' .'      \\  
 | :   :    :   ..   | 
.' '..'      '''  \\  '.
|   .--.    .'''.  ''.|
|   |   :   (    :' = |
|   ':  )    '.  :    |
'.   | /      )  :'  .'
 |   ''       '-'    | 
  \\                 /  
   *,   ..'...    ,*   
     '-:._____:--'     
`,
        tm: `         :::::         
     :::::::::::::     
   :::::::::::::::::   
  :::::::::::::::::::  
 ::::::::::::::::::::: 
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
:::::::::::::::::::::::
 ::::::::::::::::::::: 
  :::::::::::::::::::  
   :::::::::::::::::   
     :::::::::::::     
`,
        w: 22,
        h: 13
      },
      {
        name: 'Mars',
        w: 24,
        h: 14,
        img: `         __.-----.__         
      .-'          :'-.      
    .'       ___.-'    '.    
   /--.___.-'            \\   
  /               ,.      \\  
 |     /''.      :  \\  .   | 
.'     '../     .:..'      '.
|      '      '  '          |
)--_           '.           |
|   '---..__        __     .|
'.          ''-----'  '---'.'
 | .'   .                  | 
  \\'   '.'         __     /  
   \\        _.---''  ''. /   
    '.   _.'    .'.    .'    
      '--._      '_.--'      
           '''''''`,
        tm: `         :::::::::::         
      :::::::::::::::::      
    :::::::::::::::::::::    
   :::::::::::::::::::::::   
  :::::::::::::::::::::::::  
 ::::::::::::::::::::::::::: 
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
 ::::::::::::::::::::::::::: 
  :::::::::::::::::::::::::  
   :::::::::::::::::::::::   
    :::::::::::::::::::::    
      :::::::::::::::::      
           :::::::           
`
      },
      {
        name: 'Jupiter',
        w: 24,
        h: 14,
        img: `          _..---.._          
      _--'         '--_      
    .'            -    '.    
   /      -*-  - .-      \\   
  /                       \\  
 | - - -   -  ---    --  - | 
.==--==-==-=----==--==-=---=.
|                           |
|  -- -  -  -  -    -    -  |
|--===--==--=--===--=-=-=-==|
|                           |
 |-=__              _--_   | 
 |    --=---===--==-_ 0_-==| 
  \\   -   -  -   - -o o- -/  
   \\                     /   
    '.                 .'    
      '-__         __-'      
          ''-----''`,
        tm: `          :::::::::          
      :::::::::::::::::      
    :::::::::::::::::::::    
   :::::::::::::::::::::::   
  :::::::::::::::::::::::::  
 ::::::::::::::::::::::::::: 
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
 ::::::::::::::::::::::::::: 
 ::::::::::::::::::::::::::: 
  :::::::::::::::::::::::::  
   :::::::::::::::::::::::   
    :::::::::::::::::::::    
      :::::::::::::::::      
          :::::::::          
`
      },

      {
        name: 'Saturn',
        img: `                               ..    
                            ..:''':, 
              __..----..__..:'     ::
           ..\`            \`:'      ::
         _-'                '-_   .:'
        /                      \\.::' 
       /                       .:'   
      |                       .:'|   
     .'                     .::' '.  
     |                     :::    |  
     |                   .::'     |  
     |                 .::'       |  
    .|.              .:::        .'  
  .::'|            ..::'         |   
 .::' |          .::''           |   
.::'   \\      ..::'             /    
'::     \\ .::::'\`              /     
'::....::::'.'               .'      
    ''''   ''.__        __.''        
                ''----''             
`,
        w: 36,
        h: 19,
        tm: `                               ::    
                            :::::::: 
              :::::::::::::::::::::::
           ::::::::::::::::::::::::::
         ::::::::::::::::::::::::::::
        :::::::::::::::::::::::::::: 
       :::::::::::::::::::::::::::   
      ::::::::::::::::::::::::::::   
     ::::::::::::::::::::::::::::::  
     ::::::::::::::::::::::::::::::  
     ::::::::::::::::::::::::::::::  
     ::::::::::::::::::::::::::::::  
    :::::::::::::::::::::::::::::::  
  ::::::::::::::::::::::::::::::::   
 :::::::::::::::::::::::::::::::::   
:::::::::::::::::::::::::::::::::    
::::::::::::::::::::::::::::::::     
:::::::::::::::::::::::::::::::      
    :::::::::::::::::::::::::        
                ::::::::             
`
      },
      {
        name: 'Neptune',
        w: 28,
        h: 17,
        img: `         __-------__
      __-           -__
    _-     _ _-        -_
   /   ---- -            \\
  /                       \\
 |                         |
 |          =-             |
|              __           |
|             _\\_\\__        |
|              -     --     |
|            .              |
 |  =                      |
 |                         |
  \\ o                     /
   \\     __---------___  /
    --_--     __      _--
       --__       __--
           -------`,
        tm: `         :::::::::::         
      :::::::::::::::::      
    :::::::::::::::::::::    
   :::::::::::::::::::::::   
  :::::::::::::::::::::::::  
 ::::::::::::::::::::::::::: 
 ::::::::::::::::::::::::::: 
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
:::::::::::::::::::::::::::::
 ::::::::::::::::::::::::::: 
 ::::::::::::::::::::::::::: 
  :::::::::::::::::::::::::  
   :::::::::::::::::::::::   
    :::::::::::::::::::::    
       :::::::::::::::       
           :::::::           
`
      },
      {
        name: 'Amagos star',
        w: 14,
        h: 7,
        img: `      ,
   \\  :  /
\`. __/ \\__ .'
_ _\\     /_ _
   /_   _\\
 .'  \\ /  \`.
   /  :  \\
      '`,
        tm: `      ,
   \\  :  /
\`. __/#\\__ .'
_ _\\#####/_ _
   /_###_\\
 .'  \\#/  \`.
   /  :  \\
      '`,
      },
      {
        img: `         ____         
     .-''   .''-.     
   .* .          *.   
  /      .   o     \\  
 :    o        .    : 
.'           .      '.
:  .    \\ /      o   :
:      . o    o      :
:  o    / \\          :
'.  .          \\ /  .'
 :    o   o     o   : 
  \\            / \\ /  
   *,   .   .    ,*   
     '-..____..-'     
`,
        w: 21,
        h: 13,
        tm: `         ::::         
     ::::::::::::     
   ::::::::::::::::   
  ::::::::::::::::::  
 :::::::::::::::::::: 
::::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::::
::::::::::::::::::::::
 :::::::::::::::::::: 
  ::::::::::::::::::  
   ::::::::::::::::   
     ::::::::::::     
`
      },
      {
        img: `.                     
   .     . .          
    .  *.     |       
      .    * -.-      
      * (.)   |       
          . *  ..  .  
                   .  
                     .
`,
        w: 21,
        h: 7,
        tm: `.                     
   .     . .          
    .  *.     |       
      .    * -.-      
      * (.)   |       
          . *  ..  .  
                   .  
                     .
`
      },
      {
        img: `            .              
       .          .        
 .                         
          .                
      .     . |   .   .    
    .   ... \\ * /   ..    .
           -(* *)-         
.         . / * \\    .     
        .   . |            
.    ..   .  .  ..         
                 .         
                           
  .        .        ..     
`,
        w: 26,
        h: 12,
        tm: `            .              
       .          .        
 .                         
          .                
      .     . |   .   .    
    .   ... \\ * /   ..    .
           -(* *)-         
.         . / * \\    .     
        .   . |            
.    ..   .  .  ..         
                 .         
                           
  .        .        ..     
`,
      },
      {
        img: `..                                                                                                               
 ...  '                                                                                                          
   ...              .  ^                                                                                         
      ...*''                                 ^                                                                   
          ..... ' ^  ^  ^  ,                                                                                     
             *  '....  ^       ,                                                                                 
                .  ''.......     ,   ,                                                                           
                  ,  ..  '*.... ,  ^..         |                 ,                                               
              ..       ...    .. ..  ......   -o- '  *    ''                                                     
               ....        ,  ''...o  (o) .  . |.       ,  ''                                                    
                               '. ..    .... ..  ... ''   ' ''                                                   
                     *       ,    * .  ...   *..|          * '        ..     ,                                   
                                        * .   --o--..  . .  ^ '  ,        .                                      
                         ..       '.    ...   . | ^   ,     .            ..       ,                              
                                       '           *  ....  ...*    ..   .. '   ,                                
                                              '''      ...   ' ..       *   '''                                  
                                          ,           ,    .''  .... ..    .' ''    ,,                           
                                                                   ....     '          ,                         
                                              '         ,,     ,     ,    .   *.'    '    ,   ,                  
                                           ,         ,                       ,   .... ,                          
                                             '''           ^                        *  .. '''                    
                                                                ^                   .   ..*....... '             
                                                                                       ^  '   '  .   .           
                                                                                                         ..      
                                                                                              '            ...   
                                                                                                                .
`,
        w: 112,
        h: 25,
        tm: `..                                                                                                               
 ...  '                                                                                                          
   ...              .  ^                                                                                         
      ...*''                                 ^                                                                   
          ..... ' ^  ^  ^  ,                                                                                     
             *  '....  ^       ,                                                                                 
                .  ''.......     ,   ,                                                                           
                  ,  ..  '*.... ,  ^..         |                 ,                                               
              ..       ...    .. ..  ......   -o- '  *    ''                                                     
               ....        ,  ''...o  (o) .  . |.       ,  ''                                                    
                               '. ..    .... ..  ... ''   ' ''                                                   
                     *       ,    * .  ...   *..|          * '        ..     ,                                   
                                        * .   --o--..  . .  ^ '  ,        .                                      
                         ..       '.    ...   . | ^   ,     .            ..       ,                              
                                       '           *  ....  ...*    ..   .. '   ,                                
                                              '''      ...   ' ..       *   '''                                  
                                          ,           ,    .''  .... ..    .' ''    ,,                           
                                                                   ....     '          ,                         
                                              '         ,,     ,     ,    .   *.'    '    ,   ,                  
                                           ,         ,                       ,   .... ,                          
                                             '''           ^                        *  .. '''                    
                                                                ^                   .   ..*....... '             
                                                                                       ^  '   '  .   .           
                                                                                                         ..      
                                                                                              '            ...   
                                                                                                                .
`,
      }
    ]
  },
  animations: {
    particle: {
      sprites: [
        '#', '%', '#', '+', '-', '+', '.', '`'
      ]
    },
    smallParticle: {
      sprites: [
        '=', '-', '+', '-', '·'
      ]
    },
    fire: {
      sprites: [
        '#', '%', ')', '(', '|', '(', ':', `'`, '`'
      ]
    },
    letters: {
      sprites: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    }
  }
}

/*
         _____         
     .-''     ''-.     
   .*            '*.   
  /                 \  
 |                   | 
.'                   '.
|                     |
|                     |
|                     |
'.                   .'
 |                   | 
  \                 /  
   *,             ,*   
     '-:._____:--'     
*/