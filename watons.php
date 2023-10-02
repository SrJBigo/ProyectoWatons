<script type="text/javascript" src="/scripts/_basico.js"> </script>
<script type="text/javascript" src="/scripts/_especializado.js"> </script>
<script type="text/javascript" src="watons_especializado.js"> </script>


<script>



ini_root();

set_viewport({width:400, height:"",user_scalable:0});

var _NEOCITIES_LOCK = 0;

          
//|game
var game =
    {
    objs:[],
    first_draw:0,

    map_original:'',
    map:'',

    //|dialogo
    dialogo:
    {
      dialogo:'',
      ini()
      {

       this.dialogo = RPG.crear_dialogo(WIN._bloque, { 
                                                       fuente: {
                                                               img:$LIB.IMAGES[16],
                                                               },
                                                      teclado:WIN.teclado
                                                     } )

      },
      set()
      {
        this.dialogo.write.set(...arguments);

      },
      run()
      {
       if(this.dialogo!==''&&this.dialogo.write.estado!==0)
        this.dialogo.run();

      },
      end()
      {
        if(this.dialogo!=='' && this.dialogo.write.estado!==0)
        {
           this.dialogo.write.on_end();
        }

      },

    },

    //|escenario
    escenario:
    {
      act:'',
      set(_name)
      {

  //  game.first_draw =1;

      $root.hijos_clip=[];
      game.objs=[];

      game.dialogo.end();

      GES.clear_all();
      GES._enterframe = ()=>{};
      GES.fondoges.fondos=[];
      GES.tileges.estado=0;
      GES.fondoges.estado=0;
      GES.tileges.remade_tilemaps(10,10,0);
      game.map ={maps:GES.tileges.tilemaps_all};
      GES.tileges.x=0;
      GES.tileges.y=0;

      


      for(var u of GES.canvasses)
        u.no_clear=0;
      
      GES.tileges.refresh.force();
            

      delete $root.level;
      $root.x=0;
      $root.y=0;
    

       this.act = this.escenas[_name];
       
       if(this.act.editor?.img_id!=undefined)
       {
       game.editor.set( {image_url: $LIB.IMAGES[ this.act.editor.img_id ] } ); 
       }
       else
       {
        game.editor.cerrar();
       }

       if(this.act.editor?.tiledata_id!=undefined)
       {
        console.log(this.act.editor.tiledata_id)
        GES.tileges.tiledatas.set(this.act.editor.tiledata_id);
       }

       this.act.load();

       if(this.act.editor && $root.level)
       game.editor.tile_editor.offset_obj=$root.level;



      },
      enterframe()
      {

       if(this.act!=='')
       {
        this.act.enterframe();
        game.dialogo.run();
        
       }

      },

      //|escenas
      escenas:
      {
         //|intro
       intro_0:{
               name:'intro_0',
               logo:'',
               tt:0,
               _tt:[0,15],
               load()
               {
               this.tt=0;               
               //var _level = WIN.gameges.crear_vacio($root,{w: fl(WIN._bloque.wr/2) ,h: fl(WIN._bloque.hr/2) });
               //$root.level = _level;    

               let _logo = this.logo = WIN.gameges.crear_imagen($root,12,{x:55,y:55, w:5*16,h:1*16, cut_cords:{x:0*16,y:1*16,w:5*16,h:1*16}}  );
               _logo.filter={opacity:100}
              _logo.visible=false;
      
               },
               enterframe()
               {
                this.tt++;
                if(this.tt>30)
                {
                this.logo.visible=true;
                  if(this.tt>60)
                  {
                     this._tt[0]++;
                    if(this._tt[0]>this._tt[1])
                    {
                    this._tt[0]=0;
                    this.logo.filter.opacity-=20;
                    if(this.logo.filter.opacity<0)
                       this.logo.filter.opacity=0;
                    }
                  }
                }

               }
               },

       //|intro1
       intro_1:{
               name:'intro_1',
               cinema:'',//clip
               c_id:0,
               tt:[0,10],
               estado:0, 
               set_cine(f_n)
               {
               
               let _cinema = this.cinema;
                  _cinema.cut_cords={x: 0,
                                     y: f_n*(5*16),
                                     w:10*16,
                                     h:5*16};
               },
               load()
               {
                this.c_id=0;
                this.tt[0]=0;
                this.estado=0;

                let _cinema = this.cinema = WIN.gameges.crear_imagen($root,15,{x:16,y:16,
                                                                               w:10*16,h:5*16,
                                                                               cut_cords:{x:0*16,y:0*16,w:10*16,h:5*16}}  );
                   _cinema.filter={opacity:0};
                this.set_cine(this.c_id);

                GES.canvasses[2].no_clear=1;


              game.dialogo.set(['{"id":"main"}Hace miles de años, en la Constelacion 73...',
                      'Existio lo que era llamado el bar de los amiguitos. ',
                      'Un magico lugar que acogia a las solitarias almas del multiverso.',
                      'Tiempos felices. Mas nadia hacia presagiar lo que el futuro les deparaba...',

                        {
                        asas:['daasd']
                        }
                       ]

                      );
                

               //draw_letra({canvas:GES.canvasses[2], char:'E', x:0,y:0, w:[8,8],h:[8,8], img:$LIB.IMAGES[16]})


                


               },
               enterframe(){
                let _cinema=this.cinema;
                if(this.estado==0)
                {
                  this.tt[0]++;
                  if(this.tt[0]>this.tt[1])
                  {
                    this.tt[0]=0;
                    _cinema.filter.opacity+=15;
                    if(_cinema.filter.opacity>=100)
                      this.estado=1;
                  }
                }
                if(this.estado==1)
                {
                  this.tt[0]++;
                  if(this.tt[0]>this.tt[1])
                  {
                    this.tt[0]=0;
                    _cinema.filter.opacity-=15;
                    if(_cinema.filter.opacity<=0)
                    {
                      _cinema.filter.opacity=0;
                      this.estado=0;
                      this.c_id++;
                      this.tt[0]=-30; //forma poco 'limpia' de retrasar aparicion
                      this.set_cine(this.c_id);
                    }
                  }
                }

                
               }
               },

            wmap:
               {
                name:'wmap',
                editor:{img_id:13, tiledata_id:0},
                savepos:{x:1,y:3},//en tile
                 load()
                 {
                 
                GES.tileges.images[0]=$LIB.IMAGES[13];
                GES.tileges.estado=1;

                GES.fondoges.fondos=[];
                GES.fondoges.ini(0,{image: 9 , x:0, y:0});  //canvasses gameges pintado
                GES.fondoges.ini(1,{image: 10 , x:0, y:0}); //canvasses gameges pintado
                GES.fondoges.ini(1,{image: 11 , x:0, y:0}); //canvasses gameges pintado
                GES.fondoges.estado=1;
                
                let _map = $LIB.CLASES[9];
                GES.tileges.update_tilemaps(_map.maps[0],_map.maps[1],_map.maps[2], _map.maps[3]);

                var _level = WIN.gameges.crear_vacio($root,{w: fl(WIN._bloque.wr/2) ,h: fl(WIN._bloque.hr/2) });
                $root.level = _level;    

                let _savepos = this.savepos;
          
               // game.editor.tile_editor.offset_obj=_level;
                                             //x:2
               WIN.gameges.cargar_clase(_level,8,  {x:_savepos.x*16,y:_savepos.y*16, nombre:'jugador'}); //jugador


              
                   


                 //GES.fondoges.fondos=[];
                  //game.set_map($LIB.CLASES[7]);





                 },
                 enterframe()
                 {

                  this.savepos.x=fl($root.level.jugador.x/16);//provisorio
                  this.savepos.y=fl($root.level.jugador.y/16);//provisorio
                  //GES.canvasses[2].no_clear=1;
                  //GES._enterframe=()=>{GES.canvasses[2].draw.line(0,0,100,100);}
                  
                 }
   

               },//map



         //|play
         play_0:
               {
                name:'play_0',
                editor:{img_id:5, tiledata_id:1},
                hud:
                {
                  _padre:'',
                  hud:'',
                  salud:'',
                  ini()
                  {
                    let _hud = this.hud = WIN.gameges.crear_vacio($root, 2,
                                                                {w: fl(WIN._bloque.wr/2),
                                                                 h: 16,
                                                                 y: 9*16,
                                                                 draw_color:'black' 
                                                                 });

                   let _salud = this.salud = WIN.gameges.crear_vacio(_hud, 2,
                                                                {w: 50,
                                                                 h: 8,
                                                                 y:0,
                                                                 x:1,
                                                                 draw_color:'white' 
                                                                 });

                  },

                },
                 load()
                 {
                 
                 this.hud._padre=this;

                 GES.tileges.estado=1;
                 GES.tileges.images[0]=$LIB.IMAGES[5];

                 GES.fondoges.fondos=[];
                 GES.fondoges.ini(0,{image: 9 , x:0, y:0});  //canvasses gameges pintado
                 GES.fondoges.ini(1,{image: 10 , x:0, y:0}); //canvasses gameges pintado
                 GES.fondoges.ini(1,{image: 11 , x:0, y:0}); //canvasses gameges pintado
                 GES.fondoges.estado=1;

                 //GES.fondoges.fondos=[];
                 
                  
                  game.set_map($LIB.CLASES[7]);

                 this.hud.ini();
                 },
                 enterframe()
                 {
                  //GES.canvasses[2].no_clear=1;
                  //GES._enterframe=()=>{GES.canvasses[2].draw.line(0,0,100,100);}
                  
                     if(game.editor.estado==0)
                        game.editor.tile_editor.estado=game.editor.estado;

                 }
   

               },//play_0

      },//escenas

    },//escenario

    //|ini
    ini()
    {

         WIN.teclado.add_keydown(bindear_(game.on_keydown, game) ); 
         WIN.cursor.add_mousedown(bindear_(game.on_mousedown,game) );
         WIN.cursor.add_mouseup(bindear_(game.on_mouseup,game) );
         WIN.cursor.add_mousemove(bindear_(game.on_mousemove,game) );

         var ARR_CAN = [ crear_canvas( this._bloque,2,   0,0,  this._bloque.wr,  this._bloque.hr ),
                         crear_canvas( this._bloque,2,   0,0,  this._bloque.wr,  this._bloque.hr ),
                         crear_canvas( this._bloque,2,   0,0,  this._bloque.wr,  this._bloque.hr ),
                       ];

              window['GES'] = GAME.crear_gestor(WIN,  ARR_CAN,
                     {
                     donde:WIN._bloque, 
                     w:ARR_CAN[0].wr/2, 
                     h:ARR_CAN[0].hr/2
                     });
              
              GES.fondoges.ini(0,{image: 9 , x:0, y:0});  //canvasses gameges pintado
              GES.fondoges.estado=0;

              GES.tileges.ini_with_buffers([2,2,2],
                                              //ini data
                                              {id:5,
                                              wt:16,ht:16,
                                              yt_max:10,xt_max:12
                                              }
                                        );         
              GES.tileges.estado=0;    
              GES.tileges.tiledatas.add($LIB.CLASES[6],1);//main game
              GES.tileges.tiledatas.add($LIB.CLASES[10],0);//worldmap


            GES.tileges.on_draw_stroke=function(_modo)
            {
              if(_modo=='all')
                game.first_draw=0;
            }

         GES.tileges.on_draw_tile = function(_y,_x, _modo)
                                    {            
                                      if(_modo=='x'||_modo=='y' || (_modo=='all' && game.first_draw==1) )
                                      {
                                        
                                        if(game.map.maps[3][_y]&&
                                           game.map.maps[3][_y][_x]!==0 && game.map.maps[3][_y][_x]!==undefined && game.map.maps[3][_y][_x].in == 0)
                                        {
                                        let u = game.map.maps[3][_y][_x];
                                            u.x = _x;
                                            u.y = _y;
                                            console.log(u);
                                        
                                       console.log('objeto ' + u.id + ' creado')                       
                                       
                                        game.cargar_enemigo(
                                                             {
                                                              x:_x,
                                                              y:_y,
                                                              mapdata:u,
                                                             }
                                                           );
                                        
                                        }
                                      } 
                                    }            


        $root.w = fl(WIN._bloque.wr/2);
        $root.h = fl(WIN._bloque.hr/2);

        game.dialogo.ini();
        

            

           crear_enterframe(WIN,WIN,function(){  game.escenario.enterframe();   });

           
           game.escenario.set('wmap');

           


    },//ini

    //|editor
    editor:
    {
     estado:0, //0 = modo juego; 1 = modo editor; -1 = desactivado
     tile_editor:'',
     on_keydown(_k)
     {
      if(_k.key=='1')
      {
        let _cursor = WIN.cursor_bloque;
        
        let _x = fl( ((_cursor.x/2)-$root.level.x)/16 );
        let _y = fl( ((_cursor.y/2)-$root.level.y)/16 );
       
        let _mapdata =
            {
              x:_x,
              y:_y,
              id:'perro',
              in:0,
            }
        game.map.maps[3][_y][_x]=_mapdata;
        game.cargar_enemigo(
                                           {
                                            x:_x,
                                            y:_y,
                                            mapdata:_mapdata
                                           }
                                         );                                 
      }

      if(_k.key=='Escape' && _NEOCITIES_LOCK==0)
      {
          this.estado = swap_bin(this.estado);
          game.editor.tile_editor.set_capa_act(); //forzar actualizacion titulo ventanaeditor
          if(this.estado==1)
          {
          this.grab.clear();
          WIN.macrobloque.header.titulo.obj.style.background='gray';
          let _jugador = $root.level.jugador;
          let _psave = {x:_jugador.x, y:_jugador.y};
          
          game.set_map($LIB.CLASES[7]); 
          $root.level.jugador.x = _psave.x;
          $root.level.jugador.y = _psave.y;

          }
          else
          {
            this.grab.clear();
            WIN.macrobloque.header.titulo.obj.style.background='lightgray';
          } 
      }

     },
     on_mousemove(e)
     {
      if(this.grab.obj!=='')
      {
        let _obj = this.grab.obj;
        let _xt = fl(((e.offsetX/2)-$root.level.x + this.grab.plus[0]+_obj.w/2)/16);
        let _yt = fl(((e.offsetY/2)-$root.level.y + this.grab.plus[1]+_obj.h/2)/16);
        _obj.x = _xt*16;
        _obj.y = _yt*16;

        //actualizar capa obj
        let _mapdata = _obj.mapdata;

        game.map.maps[3][_mapdata.y][_mapdata.x]=0;
        _mapdata.x=_xt;
        _mapdata.y=_yt;
        game.map.maps[3][_yt][_xt]= _mapdata;
        
      }

     },
     on_mouseup(e)
     {
     game.editor.tile_editor.estado=1;
     this.grab.clear();
     },

     grab:{
     obj:'',
     plus:[0,0],
     clear()
     {
      this.obj='';
      this.plus=[0,0];
     }

     },
     on_mousedown(e)
     {
      let _xm = (e.offsetX/2)-$root.level.x;
      let _ym = (e.offsetY/2)-$root.level.y;
      
      if(game.editor.estado)
      {
        for(var u of game.objs)
        {
         if(game.simple_hit_test(u, {x:_xm, y:_ym, w:1, h:1}))
         {
          game.editor.tile_editor.estado=0;
          this.grab.obj=u;
          this.grab.plus[0]=u.x-_xm;
          this.grab.plus[1]=u.y-_ym;
          
         }
        }
      }

     },
     cerrar()
     {
      if(game.editor.tile_editor!=='')
      {
       game.editor.tile_editor.win.cerrar();
       game.editor.tile_editor='';        
      }

     },          //{image_url:'' }
     set(f_data={})//empleado al crear o actualizar editor
     {
      if(this.tile_editor!=='')
      {
       this.tile_editor.set_image(f_data.image_url)
      }
      else
      {
      this.tile_editor = DEBUG.crear_tile_editor(
                                                   _root,
                                                  { ...{
                                                     x:WIN.x+WIN.wr, y:WIN.y, 
                                                     odiv_des:WIN._bloque,
                                                     cursor_des: WIN.cursor_bloque,
                                                    
                                                     tileges:$tileges,
                                                     image_url: "_data/images/lau_tileset16_0.png",
                                                     offset_obj: {x:0,y:0},

                                                     tw:4,
                                                     th:4,
                                                     minimap_scale:4,
                                                     key:
                                                     {
                                                       erase:['lshift', 0], //tecla, indice tile vacio
                                                       drop: 'ctrl',
                                                     },
                                                     on_set_title(f_text)
                                                     {
                                                      return(f_text+ '[' + game.editor.estado + ']');
                                                     },
                                                     on_save_objtile(f_obj)
                                                     {

                                                        if(f_obj!==0&&f_obj!==undefined)
                                                        {
                                                        let _end = clone_object(f_obj);
                                                            _end.in=0;
                                                            return(_end);
                                                        }
                                                        return(f_obj);

                                                     }

                                                    }, 
                                                    ...f_data} )
        }

     },

    },//editor
    on_keydown(_key)
    {
     if(this.editor.tile_editor!=='')
     this.editor.on_keydown(_key);
    },
    on_mousedown(e)
    {
     if(this.editor.tile_editor!=='')
     this.editor.on_mousedown(e);
    },
    on_mouseup(e)
    {
     if(this.editor.tile_editor!=='')
     this.editor.on_mouseup(e);
    },
    on_mousemove(e)
    {
     if(this.editor.tile_editor!=='')
     this.editor.on_mousemove(e);
    },


      center_compare(_a, _b)
      {
       let _end ={x:'',y:''};
       
       if(_a.x+_a.w/2<_b.x+_b.w/2)
          _end.x=0;
         else
          _end.x=1;

        if(_a.y+_a.h/2<_b.y+_b.h/2)
         _end.y=0;
         else
          _end.y=1;

       return(_end);

      },
      simple_hit_test(_a, _b)
      {
      
       if(_a.x+_a.w >_b.x && _a.x<_b.x+_b.w &&
          _a.y+_a.h >_b.y && _a.y<_b.y+_b.h  )
       {
        return(1);
       }

      },
      reiniciar()
      {
       // console.log($LIB.CLASES[7])
       game.set_map($LIB.CLASES[7]);
      },

      set_map(f_map)
      {
      console.log('set_map');
      game.first_draw =1;

      $root.hijos_clip=[];
      this.objs=[];
      
      let _map =  clone_object(f_map);
      this.map = _map;



      GES.tileges.update_tilemaps(_map.maps[0],_map.maps[1],_map.maps[2], _map.maps[3]);
      

      var _level = WIN.gameges.crear_vacio($root,{w: fl(WIN._bloque.wr/2) ,h: fl(WIN._bloque.hr/2) });
          $root.level = _level;    
          
         game.editor.tile_editor.offset_obj=_level;
                                             //x:2
         WIN.gameges.cargar_clase(_level,0, {x:2*16,y:4*16, nombre:'jugador'}); //jugador
               

      },
      remove_all_obj()
      {
      this.objs=[];

      },
      remove_obj(obj)
      {
        for(var i=0;i< this.objs.length;i++)
        {
          let u = this.objs[i];
          if(u==obj)
          {
            this.objs.splice(i,1);
            break;
          }
            
        }
      },
      cargar_enemigo(f_data)
      {
        let _x = f_data.x;
        let _y = f_data.y;
        let _clip = WIN.gameges.cargar_clase($root.level,5, 
                                         {
                                          y:_y*16,
                                          x:_x*16,
                                          id:f_data.mapdata.id,
                                          }
                                 );
                 
         _clip.mapdata = f_data.mapdata;
         this.objs.push(_clip);
         _clip.mapdata.in = 1;
         
           
           console.log('in: ' + _clip.mapdata.in)

                                                
      }

    }//game








var WIN = ventana.crear_ventana(_root,
                                                //400   400
	                                  {x:0,y:0, w:390,h:390, teclado:1,titulo:"Watons: Legends of Pipi [proto 2]", grab:1, resize:0,
	                                  menu:{Juego:{Reiniciar(){
                                     game.reiniciar();

                                    }, },
                                          Opciones:{Controles:'Proximamente'},
                                          Escenas:{
                                                    'intro_0'(){ game.escenario.set('intro_0')  },
                                                    'intro_1'(){ game.escenario.set('intro_1')  },
                                                    'wmap'(){ game.escenario.set('wmap')  },
                                                    'play_0'(){ game.escenario.set('play_0')  },
                                                    
                                                      },
                                          $Ayuda:{'Acerca de...'(){alert('23/09/2023'  )
                                          



                                          }}

                                      }},
	                                    {
	                                  	borde:[5,5,5,5],})


WIN._bloque.obj.style.background="black";



if(IS_MOBILE)
{
  WIN.set_h(WIN.hr+100);
TECLADO.crear_teclado_visual(WIN, WIN.teclado, 'basico');
}





  WIN.load_isc(["_data/images/fondo_0.png",
                "_data/images/image_03.png",
                "_data/images/lau_spritesheet.png",
                "_data/images/efecto16.png",
                "_data/images/tileset16_0.png",
                "_data/images/lau_tileset16_0.png",//5

                "_data/images/shoot.png",
                "_data/images/enemigos_sprites.png",
                "_data/images/armas_sprites.png",
                "_data/images/fondo_A0.png", //9
                "_data/images/fondo_A1.png", //10
                "_data/images/fondo_A2.png",
                "_data/images/misc.png",
                "_data/images/lau_tileset16_wm.png",

                "_data/images/watons_sprites_wm.png",//14
                "_data/images/cinema.png",//15
                "_data/images/fuente(8).png",

                ],
                
                [
                 //'/samples/02_piano2.wav',
                 //'/samples/BGM_003.WAV'
                 ],

                ["_data/class/player.js",
                 "_data/class/obj_e16.js",
                 "_data/class/obj_testvacio.js",
                 "_data/class/obj_test_entesprite.js",
                 "_data/class/shoot.js",
                 "_data/class/enemigos.js",

                "_data/class/config.json",//6
                "_data/maps/00.json",
                "_data/class/player_wm.js",

                "_data/maps/wm00.json",
                "_data/class/tiledata_wm.json",//10

                ],


                game.ini);



</script>