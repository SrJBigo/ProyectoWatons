//document.currentScript.OBJ_DES[script.url_filename_limpio(document.currentScript.src)] = "jiji";
//============================
//CREADO VIA  cargar_script();
//=============================
document.currentScript.class =
{
  
  LOAD:
  {
    modo: 'vacio',
    canvas_id: 1,


    child: [

      {//arma
        LOAD:
        {
          id: 8,
          canvas_id: 1,
          modo: 'sprite',
          animdata: GAME.crear_animdata({ master: { wt: 32, ht: 32, ll: 30 } },

            { ll: 30, flip: [1, 0], offset: [-11, -6], buf: [[0, 0,  16, 32]]  },

          ),
        },

      },


      {//cuerpo
        LOAD:
        {
          id: 2,
          canvas_id: 1,
          modo: 'sprite',
          animdata: GAME.crear_animdata({ master: { wt: 32, ht: 32, ll: 30 } },

            //quieto
            { ll: 60, flip: [1, 0], buf: [[0, 0], [0, 1]] },
            { ll: 60, flip: [0, 0], buf: [[0, 0], [0, 1]] },

            //caminar
            { ll: 7, flip: [1, 0], buf: [[0, 4], [0, 5], [0, 6], [0, 7] ] },
            { ll: 7, flip: [0, 0], buf: [[0, 4], [0, 5], [0, 6], [0, 7] ] },

            //correr
            { ll: 9, flip: [1, 0], buf: [[0, 8], [1, 9] ] },
            { ll: 9, flip: [0, 0], buf: [[0, 8], [1, 9] ] },

            //salto up down
            { ll: 10, flip: [1, 0], buf: [[0, 12]]},
            { ll: 10, flip: [0, 0], buf: [[0, 12]]},
            { ll: 10, flip: [1, 0], buf: [[0, 13]]},
            { ll: 10, flip: [0, 0], buf: [[0, 13]]},

            //escalera
            { ll: 30, flip: [0, 0], buf: [[0, 18]]  },
            { ll: 5, flip: [0, 0], buf: [[0, 19],[0, 18],[0, 17],[0, 18]]  },
            { ll: 5, flip: [0, 0], buf: [[0, 17],[0, 18],[0, 19],[0, 18]]  },

          ),
        },

      },



    ]


  },

  
  _z:10,
  w: 10,
  h: 25,

  draw_color: "",


  camera_offset:{_padre:'', x:0,y:0,w:0,h:0, xp:0, yp:0, limit:1,

   update(f_x=this._padre.x, f_y=this._padre.y, f_w=this._padre.w, f_h=this._padre.h)
  {   
   this.x = f_x;
   this.y = f_y;
   this.w = f_w;
   this.h = f_h;
  },


  },
  xvelocity:0,
  yvelocity:0,
  xprev:0,
  yprev:0,
  
  orientacion: 1, //0,1 -> izquierda, derecha

  gravedad:0.3,
  suelo_y:0,//def enterframe

  //|jugcon
  set_player_sprite(f_id)
  {
  let _animations = this.anim.animdata.animations;
  
    for(var u of _animations)
    {
       for(var _u of u.buf)
       {
          _u[0] = f_id;
       }
        
    }
  

  },

    
    //|spawn_fall
    spawn_fall:
    {
      _padre:'',
     x:0,
     y:0,
       set(f_x, f_y) //obj de objcheck
       {
        this.x= f_x;//fl(_clip.x/16)*16+4;
        this.y= f_y;//_clip.y;
       },
       start()
       {
        _clip.hitcon.hit(  {hitcon:{rebotar:0, damage:4, noplayerkill:1}  });

         let _hp = game.particon.data.perfiles.act.hp[0];
         
        
         if(_hp>0)
        _clip.modos.set('muerto', [0]);

         else
         _clip.modos.set('muerto',[1])
        
       },
       end()
       {
       
       


            _clip.x=this.x;
            _clip.y=this.y;
            _clip.modos.set('normal');
            _clip.hitcon.hit( {hitcon:{rebotar:0, damage:0} });

       }

    },
          


  //|armacon
  armacon:
  {
     _padre:'',
     estado:1,  //0 = inactivo[invisible]; | = activo [visible]
     estado_h:0, //modificado en run() de armas
     orientacion:0, //0,1 = izquierda,derecha
     angulo:0, //0,1,2,3
     anim:'',
     act:'', //objeto modo actual
     set(f_modo)
     {

      this.act = this.modos[f_modo];

       
       this._padre.hijos_clip[0].animdata =  GAME.crear_animdata(...this.act.animdata);
       this.anim = this._padre.hijos_clip[0];
       this.anim.x = -11;
       this.anim.y = -6;

       //this.anim.remove();

     },

     //|modos armas
     modos:
     {
      _padre:'',

      //|arco 
       arco:
          {
           _padre:'',
           animdata:
           [
             { master: { wt: 32, ht: 32, ll: 30 } },
             { ll: 30, flip: [1, 0], offset: [0, 0], buf: [[0, 0]]  },
             { ll: 30, flip: [0, 0], offset: [0, 0], buf: [[0, 1]]  },
             { ll: 30, flip: [0, 0], offset: [0, 0], buf: [[0, 0]]  },
             { ll: 30, flip: [0, 1], offset: [0, 0], buf: [[0, 1]]  },
           ],

           vel:5.5,
           
           xyni:[5,10],
           xy:  [[-1,0],[0,-1],[1,0],[0,1]], //empleado en XYvel de flecha
           xy2 :[[-1,1],[0,0], [1,1],[0,1]], //empleado en xy 'caprichoso' de flecha
           
           shoot(f_angulo, f_orien)
           {
             

             game.shootcon.crear_flecha(f_angulo, 5, {x:$jugador.x,y:$jugador.y});
               if (f_angulo==3 && $jugador.yvelocity > 0)
                  $jugador.yvelocity = 0.1;
               

              /* $WIN.gameges.cargar_clase($root.level, 4, {
                  id: 'arrow',
                  estado: f_angulo,
                  x:         _clip.x + this.xyni[0]*this.xy2[f_angulo][0],
                  y:         _clip.y + this.xyni[1]*this.xy2[f_angulo][1],
                  xvelocity: this.vel*this.xy[f_angulo][0],
                  yvelocity: this.vel*this.xy[f_angulo][1]
                });
              */

           },
           run(f_angulo, f_orien)
           {
             this._padre._padre.estado_h=f_angulo;
           },

          },//arco

          //|espada
       espada:
          {
           _padre:'',

           offset_by_main:[  [0,0,  0,-2],
                             [0,0,  0,-2],

                             [ 0,-2, 0,-1,  1,0, 0,-1,],
                             [ 0,-2, 0,-1, -1,0, 0,-1,],

                             [0,0,  0,-2],
                             [0,0,  0,-2],

                             [0,0],
                             [0,0],
                             [0,0],
                             [0,0],

                             [0,0],
                             [0,0],
                             [0,0],

                             ],

           animdata:
           [
             { master: { wt: 32, ht: 32, ll: 30 } },
           
             { ll: 30, flip: [0, 0], offset: [0, 0], buf: [[1, 0]]  },

             //ataques
                //arriba abajo
             { ll: 3, flip: [0, 0], loop:1, offset: [0, 0], buf: [[1, 4],[1, 5],[1, 2]]  },
                //abajo arriba
             
             { ll: 3, flip: [0, 0], loop:1, offset: [0, 0], buf: [[1, 2],[1, 3],[1, 4]]  }, 

           ],

           att:0,
           dir_at:1,

           tt_hit:[0,10],

           shoot(f_angulo, f_orien)
           {
             this.att=1;
             this.tt_hit[0]=this.tt_hit[1];

             game.soundcon.play(8,1,'random');
                

           },
           run(f_angulo, f_orien)
           {

            //this._padre.anim.animdata
            let _anim_main = this._padre._padre._padre.anim;            
            let _anim_arma = this._padre._padre.anim;


             _anim_arma.animdata.animations[_anim_arma.animdata.act[0]].offset[0]=
             this.offset_by_main[ _anim_main.animdata.act[0] ][ _anim_main.animdata.act[1]*2 ];

            _anim_arma.animdata.animations[_anim_arma.animdata.act[0]].offset[1]=
             this.offset_by_main[ _anim_main.animdata.act[0] ][ _anim_main.animdata.act[1]*2+1 ];
           
            //console.log(this.offset_by_main[ _anim_main.animdata.act[0] ][ _anim_main.animdata.act[1]*2+1 ])


            //_anim_arma.animdata.force={offset:[0,-20]};

           
            if($WIN.teclado.get('x'))
            {
             this._padre._padre.estado_h=1+this.dir_at;

             let _11 = f_orien;  if(f_orien==0)_11=-1;
             let _pp = [

                       //MEDIO
                       {
                        x:$jugador.x-20,
                        yvelocity: 0,
                        xvelocity: 7,
                       },
                       {
                        x:$jugador.x+$jugador.w,
                        yvelocity:  0,
                        xvelocity: -7,
                       },

                       //ABAJO
                       {
                        x:$jugador.x-20,
                        yvelocity: 5,
                        xvelocity: 2,
                       },
                       {
                        x:$jugador.x+$jugador.w,
                        yvelocity: 5,
                        xvelocity:-2,
                       },

                        //ARRIBA
                       {
                        x:$jugador.x-20,
                        yvelocity:-5,
                        xvelocity: 2,
                       },
                       {
                        x:$jugador.x+$jugador.w,
                        yvelocity:-5,
                        xvelocity:-2,
                       },

                      ];

                let _pa = _pp[f_orien];
                if($WIN.teclado.get('aba'))
                  _pa = _pp[f_orien+2];
                if($WIN.teclado.get('arr'))
                  _pa = _pp[f_orien+4];
                   
                
             if(this.tt_hit[0]>4)
             {

                    let _p ={buf:[[6,0]], 
                             flip:[0,0], 

                             x:_pa.x,
                             xvelocity:  _pa.xvelocity,
                             yvelocity:  _pa.yvelocity,
                             _xvelocity: -_pa.xvelocity,
                             _yvelocity: _pa.yvelocity*4.5,
                             
                             _w:15,y:$jugador.y,
                             draw_color:'blue',
                             visible:false,
                        
                             tilecol:{w:20,h:16,x:0,y:0, 
                                       on_col(){}
                                      },
                             tt:[0,3],
                             _enterframe()
                             {
                              this.tt[0]++;
                              if(this.tt[0]>this.tt[1])
                                this.remove();

                             }
                              };

                   game.shootcon.crear_simple($root.level, {
                                        ..._p,
                                        ...{}

                                          })


              //game.shootcon.crear_flecha(f_angulo, 5, {x:$jugador.x,y:$jugador.y});


             

             }///tt_hit  




            }
            else
            {
              this.dir_at=1;
               if($WIN.teclado.get('arr'))
                this.dir_at=0;
              
              this._padre._padre.estado_h=0;
            }              
            this._padre._padre.anim.animdata.force.flip=[f_orien,0];

            if(this.tt_hit[0]>0)
            this.tt_hit[0]--;
            


           },


          },//espada

     },//modos armas
     ini()
     {
       this.set(game.particon.data.perfiles.act.arma_name);

       this.angulo=2;
     },
     run()
     {
      
      if(this.estado==1 && this.act!=='' && _clip.modos.act.permitir_arma==1)
      {
      //angulo arma
        if ($WIN.teclado.get('izq'))
          this.angulo = 0;
        if ($WIN.teclado.get('der'))
          this.angulo = 2;
        if ($WIN.teclado.get('arr'))
          this.angulo = 1;
        if ($WIN.teclado.get('aba'))
          this.angulo = 3;

        
        if ($WIN.teclado.get('arr') == 0 && $WIN.teclado.get('aba') == 0)
           {
            let _a = _clip.orientacion;
            if (_a == 1) _a++;
            this.angulo = _a;
           }

       //disparar
       if($WIN.teclado.get('x',2)==1)
         this.act.shoot(this.angulo, _clip.orientacion);
       
      this.anim.visible=_clip.anim.visible;

      this.act.run(this.angulo, _clip.orientacion);

   
      this.anim.animdata.set_anim(this.estado_h);
      
      }
      else
        this.anim.visible=0;

     },
  
  },//armacon

  
  
 //|colcheck
  col_check() {
    let _x16 = fl(this.x / 16);
    let _y16 = fl(this.y / 16);

    let _tiledata = $gameges.tileges.tiledata.col;
    let _p = this;
    let _ret = [0, 0, 0, 0];

    let _pos = [
      [this.x, this.y], [this.x + this.w / 2, this.y], [this.x + this.w, this.y],
      [this.x, this.y + this.h / 2], [this.x + this.w / 2, this.y + this.h / 2], [this.x + this.w, this.y + this.h / 2],
      [this.x, this.y + this.h], [this.x + this.w / 2, this.y + this.h], [this.x + this.w, this.y + this.h],
    ];

    let _tilemap_1 = $tileges.tilemaps[1];
    let _col = [];
    for (var u of _pos) {
      let _yt = fl((u[1]) / 16);
      let _xt = fl((u[0]) / 16);

      let _tile;
      if (_tilemap_1[_yt] !== undefined)
        _tile = _tilemap_1[_yt][_xt];

      if (_tile > 0) {
        _col.push({
          id: _tile,
          x: _xt * 16,
          y: _yt * 16,
          w: 16,
          h: 16,
          xt: _xt,
          yt: _yt,

        });
      } 
    }

    for (var u of _col) {

      let _udata = _tiledata[u.id];

      //arriba bajo
      if (_p.x + _p.w > u.x && _p.x < u.x + u.w) {

        if (_udata[1] == 1 &&
          (_tilemap_1[u.yt - 1] === undefined || _tilemap_1[u.yt - 1] != undefined &&  //_udata[_tilemap_1[u.yt - 1][u.xt]] != '1,1,1,1' &&
          _tiledata[ _tilemap_1[u.yt - 1][u.xt] ].toString() !== '1,1,1,1') && 

          _p.yprev + _p.h <= u.y + 1 && _p.yvelocity > 0 && _p.y + _p.h > u.y) //colision arriba tile
        {

          if(_p.yvelocity>1)
          {
            //game.soundcon.play(19,(_p.yvelocity)/10);
            let _v = (_p.yvelocity)/10;
             if(_v<0.5)_v=0.5;
            game.soundcon.tile_play(u.id,_v);
          }


          _p.y = u.y - _p.h;
          _p.yvelocity = 0;
          _ret[1] = u;
        }


        if (_udata[3] == 1 &&
          _tilemap_1[u.yt + 1] !== undefined && //_udata[_tilemap_1[u.yt + 1][u.xt]] != '1,1,1,1' && 
          _tiledata[ _tilemap_1[u.yt + 1][u.xt] ].toString() !== '1,1,1,1' && 
          //_tilemap_1[u.yt + 1][u.xt] ==0 &&

          _p.yprev >= u.y + u.h && _p.yvelocity < 0 && _p.y < u.y + u.h) //colision abajo tile
        {
         
           if(_p.yprev > _p.y)
           {
            game.soundcon.tile_play(u.id,-_p.yvelocity/10);
           //game.soundcon.play(19,-_p.yvelocity/10);            
           }


          _p.y = u.y + u.h;

          _p.yvelocity = 0.5;
          _ret[3] = u;
        }

      }


      //izquieda derecha
      if (_p.y < u.y + u.h && _p.y + _p.h > u.y) {
        if (_udata[0] == 1 &&
          _p.xprev + _p.w <= u.x && _p.xvelocity > 0 && _p.x + _p.w > u.x) // colision izquierda tile
        {
          _p.x = u.x - _p.w;
          _p.xvelocity = 0;
          _ret[0] = u;
        }

        if (_udata[2] == 1 &&
          _p.xprev >= u.x + u.w && _p.xvelocity < 0 && _p.x < u.x + u.w) // colosion derecha tile
        {
          _p.x = u.x + u.w;

          _p.xvelocity = 0;
          _ret[2] = u;
        }
      }
    }
    return (_ret);

  },//colcheck


  //|_hitcon
  _hitcon:
  {
    _padre:'',
    estado:1,
    detectar:[1,1], //enem, shoot
    blinkcon:
    {
     estado:0,
     tt:[0,5,   0,6*4],
     ini()
     {
      $jugador._hitcon.detectar=[0,0];
     this.estado=1;
     this.tt[0]=0;
     this.tt[2]=0;
     },
     end()
     {
       $jugador._hitcon.detectar=[1,1];
       this.estado=0;
       this.tt[0]=0;
       this.tt[2]=0;
     },
     run()
     {
      let _tt = this.tt;
       if(this.estado)
        {
          _tt[0]++;
          if(_tt[0]>=_tt[1])
          {
            _tt[0]=0;
            
            if($enterload.anim.visible==true)
            $enterload.anim.visible=false;
            else
            $enterload.anim.visible=true;
             
            _tt[2]++;
            if(_tt[2]>=_tt[3])
               this.end();
            
          }

        }
     }
    },
    on_hit(f_modo, f_data={})
    {
        this.blinkcon.ini();
        if (game.center_compare($jugador, f_data.clip).x) {
            $jugador.xvelocity = f_data.atk;
            $jugador.yvelocity = -f_data.atk;
            }
            else {
            $jugador.xvelocity = -f_data.atk;
            $jugador.yvelocity = -f_data.atk;
            }

       game.set_var(f_data.atk, 'hp', '-');
       let _hp = $perfil.hp[0];
       //if(_hp<=0 && _enem.hitcon.noplayerkill!==1)
        if(_hp<=0)
        {
        $jugador.modos.set('muerto',[2])
        }

    },

    run()
    {
      if(this.estado)
      {
        this.blinkcon.run();
      }
    }
  },

  //|hitcon
  hitcon:
  {
    _padre: '',
    estado: 0,
    //          ll_act, ll_max   bin
    //          / /              /
    tt: [0, 5, 0, 10, 0],
    
    hit(_enem) {
     let _modo = _clip.modos.act;
      
      if(_modo.hitcon.detectar)
      {

          game.set_var(_enem.hitcon.damage, 'hp', '-');
          let _hp = game.particon.data.perfiles.act.hp[0];
          this.estado = 1;
          if(_hp<=0 && _enem.hitcon.noplayerkill!==1)
          {

          _clip.modos.set('muerto',[2])

          return;  
          }
          
        
        

          let _padre = this._padre;
          
          this.estado = 1;
          this.tt[0] = 0;
          this.tt[2] = 0;
          this.tt[4] = 0;

          if(_modo.hitcon.rebotar && _enem.hitcon.rebotar)
          {
            if (game.center_compare(_padre, _enem).x) {
            _padre.xvelocity = 4;
            _padre.yvelocity = -4;
            }
            else {
            _padre.xvelocity = -4;
            _padre.yvelocity = -4;
            }
          }
          _modo.hitcon.on_hit(_enem);
      }  

    },
    run() {
      let _padre = this._padre;

      if (this.estado == 1)//golpeado transparencia
      {
        _padre.anim.visible = true;
        
        if (this.tt[4] == 1) 
          _padre.anim.visible = false;
        

        this.tt[0]++;
        if (this.tt[0] > this.tt[1]) {
          this.tt[0] = 0;
          this.tt[2]++;

          this.tt[4] = swap_bin(this.tt[4]);

          if (this.tt[2] > this.tt[3])//end
          {
            this.estado = 0;
            this.tt[0] = 0;
            this.tt[2] = 0;
            this.tt[4] = 0;

            _padre.anim.visible = true;
            

          }
        }

      }

      if (this.estado == 0) {
        for (var u of game.objs) 
        {
          if (game.simple_hit_test(this._padre, u) && 
              game.editor.estado==0 && u.hitcon.estado==1 ) 
          {

            u.hitcon.on_hit(this, { damage: 6 },'player');

            this.hit(u); 

            break;
          }

        }
      }

    }, //run

  },//hitcon

  
  loadframe() 
  {
   
    window['_clip'] = this;
    padrear(this);
    //this.fondocon.update_fondos()

    this.anim = this.hijos_clip[1];
    
    this.set_player_sprite(game.particon.data.perfiles.id_act);

    //this.itemcon.ini();

    this.armacon.ini();

    this.suelo_y = $gameges.tileges.yt_allmax * 16;
    this.camera_offset.update();
    //this.armacon.ini();

    //if(this.modos.act=='') 
    this.modos.set('normal',[]);

    this.yvelocity+=0.1;


  },

  //|modos   jugador
  modos:
  {
   _padre:'',
   act:'',    //obj
   estado:'', //string
   set(f_modo='normal', f_arguments=[])
   {
   this.estado = f_modo;
   this.act = this.modos[f_modo];
   this.act.ini(...f_arguments);
   },
   run()
   {
     this.act.run();
   },
   //|modos jugador
   modos:{
         _padre:'',


         //|normal modos jugador
         normal:
         {
          name:'normal',
          _padre:'',

          hitcon:
          {
            detectar:1,
            rebotar:1,
            on_hit(f_enem)
            {

            }
          },

          dialogocon:
          {
             check()
             {
              for (var u of game.objs) 
                {
                  if (game.simple_hit_test(_clip, u) && u.id=='npc' && u.dialogo!== '_') 
                  {  
                    
                    game.dialogo.on_end = ()=>
                                      {
                                      _clip.modos.set('normal');

                                      u.dialogo_con.on_chat_end();
                                      }
                    
                    u.dialogo_con.on_chat();
                    game.dialogo.set(u.dialogo);


                   /* game.dialogo.set(['Hola ' + $C_NAME + '!', 'Que te trae por aca?',
                              {
                                'Busco el final de este nivel':['Sigue el camino y llegaras'],
                                'que te importa': ['que malo!']
                              }
                          ]

                          );
                       */

                    _clip.modos.set('freeze');
                    return(1);
                    break;
                  }

               }

             },

          },


          running:0,
          run_tt:[0,13, 0],  //tt, max,  estado_prev

          permitir_arma:1,
          suelo_tt:0,
          salto_estado:0,
          estado:'',

          yvel_max:7,
          xvel_max: [1.8, 2.4],  //2.4
          xvel_impetu: [0.2,0.3],

          

  
          polvo:
          {
            _padre:'',
            tt: [0,8],
            reset() {
              this.tt[0] = 0;
            },

            crear()
            {
            let _padre = this._padre;
               if(_padre.estado == 0 || _padre.estado == 2)  
                      $WIN.gameges.cargar_clase($root.level, 1, { x: _clip.x + 7, y: _clip.y + 16,anim_id:0, enterframe(){this.y-=0.3} });
                  
                    if (_padre.estado == 1 || _padre.estado == 3) 
                      $WIN.gameges.cargar_clase($root.level, 1, { x: _clip.x - 5, y: _clip.y + 18, anim_id:0,enterframe(){this.y-=0.3} });
                

            },

            run() {
              let _padre = this._padre;

              this.tt[0]++;
              if (this.tt[0] > this.tt[1]) {
                this.tt[0] = 0;
                  if (_padre.suelo_tt >= 3)
                  {
                     this.crear();

                 }
                }
              }
            
          },//polvo

           ini()
           {

           if(this.estado==='') 
              this.estado=1;

           },
           run()
           {
            let _padre        = this._padre;
            let _tileges      = $gameges.tileges;
            let _tilemaps_all = _tileges.tilemaps_all;
            let _perfil = game.particon.data.perfiles.act;

            _clip.suelo_y = $gameges.tileges.yt_allmax * 16;

            let _xt = fl(_clip.x/16);
            let _yt = fl(_clip.y/16);

            
            this.suelo_tt--;
            _clip.yvelocity += _clip.gravedad;
            if(_clip.yvelocity>this.yvel_max)
              _clip.yvelocity=this.yvel_max;

            let _col = _clip.col_check();
            if(_col[1])
            {
              _clip.spawn_fall.set(_col[1].x+5, _clip.y);

              
              _clip.yvelocity=0;

              this.suelo_tt=8;

            }

            if(_col[0]||_col[2])
            {
              this.run_tt[0]=0;
              this.running=0;

            }
            

            
           if($WIN.teclado.get('arr',2)==1)
              {
               
                if(this.dialogocon.check())
                return;

                if(_clip.modos.modos.puerta.check()) 
                return;
             }
             if($WIN.teclado.get('arr')!==0)
              {
                if(_clip.modos.modos.escalera.check()) 
                return;

              }
              





              //salto
              if (this.suelo_tt > 0 && $WIN.teclado.get('z') == 1) 
              {
                $WIN.teclado.get('z', 2)
                this.suelo_tt = 0;
                this.salto_estado = 1;
                
                _clip.yvelocity = (-_perfil.yvel_salto)*( ($WIN.teclado.get('space')*2) +1) ;


                game.soundcon.play(2);
                
              }
              if ($WIN.teclado.get('z') == 1) 
              {
                //barba flotacion
                if(_perfil.name=='barba'&& _clip.yvelocity >= 0 && this.salto_estado==2)
                {
                  _clip.yvelocity=0;
                  game.particon.data.perfiles.set_var(0.03, 'pp', '-');

                }

              }
              if (this.salto_estado == 1 && $WIN.teclado.get('z') == 0) 
              {
                this.salto_estado = 2;
                if (_clip.yvelocity < 0) 
                  _clip.yvelocity = _clip.yvelocity / 2; 
              }

              
              if (this.estado == 0 || this.estado == 1) 
              {
                _clip.orientacion = this.estado;

                this.polvo.tt[0] = this.polvo.tt[1] - 1;

                _clip.xvelocity += (0 - _clip.xvelocity) / 5;
                if ($WIN.teclado.get("izq"))
                {
                 if(this.run_tt[0]>0 && this.run_tt[2]==0)
                 {
                    this.polvo.crear();
                    this.running=1;
                    _clip.xvelocity-=0.2;
                 }

                  this.estado = 2;
                  this.run_tt[0]=this.run_tt[1];
                  this.run_tt[2]=0;
                }
                if ($WIN.teclado.get("der"))
                {
                  if(this.run_tt[0]>0 && this.run_tt[2]==1)
                  {
                    this.polvo.crear();
                    this.running=1;
                    _clip.xvelocity+=0.2;
                  }

                  this.estado = 3;
                  this.run_tt[0]=this.run_tt[1];
                  this.run_tt[2]=1;
                }
              }


              if(this.run_tt[0]>0)
              {
                this.run_tt[0]--;  
              }
              if(this.run_tt[0]==0)
              {
                if(this.estado==0||this.estado==1)
                {
                  this.running=0;
                }
              }


              //caminar izquierda
              if (this.estado == 2)
               {
                _clip.orientacion = 0;
                if(this.running)
                this.polvo.run();

                _clip.xvelocity -= this.xvel_impetu[this.running];
                if (_clip.xvelocity < (-this.xvel_max[this.running])) 
                    _clip.xvelocity = (-this.xvel_max[this.running]);
                
                if ($WIN.teclado.get("izq") == 0) {
                    this.estado = 0;
                }
              }



              //caminar derecha
              if (this.estado == 3) 
              {
                _clip.orientacion = 1;
                if(this.running)
                this.polvo.run();
                _clip.xvelocity += this.xvel_impetu[this.running];
                if (_clip.xvelocity > this.xvel_max[this.running])
                    _clip.xvelocity = this.xvel_max[this.running];
                if ($WIN.teclado.get("der") == 0) 
                  this.estado = 1;
              }

              _clip.estado_h = this.estado;

              if (this.suelo_tt<=0) 
              {
                if (this.estado == 0 || this.estado == 2) 
                  _clip.estado_h = 6;
                if (this.estado == 1 || this.estado == 3) 
                  _clip.estado_h = 7;
                if(_clip.yvelocity>0)
                  _clip.estado_h+=2;
              }

              if(this.running)
              {
                if ( (this.estado == 0 || this.estado == 2) && _clip.xvelocity<=-this.xvel_max[this.running]) 
                    _clip.estado_h = 4;
                if ( (this.estado == 1 || this.estado == 3) && _clip.xvelocity>=this.xvel_max[this.running]) 
                    _clip.estado_h = 5;
              }

              if (_clip.x < 0) 
              {
                _clip.x = 0;
                _clip.xvelocity=0;
              }

              if (_clip.x+_clip.w > $gameges.tileges.xt_allmax * 16) 
              {
                _clip.x = $gameges.tileges.xt_allmax * 16 - _clip.w;
                _clip.xvelocity=0;
              }


              if (game.editor.estado && _clip.y + _clip.h > _clip.suelo_y && _clip.yvelocity>0)
                {
                  _clip.y = _clip.suelo_y - _clip.h;
                  _clip.yvelocity = 0;
                  this.suelo_tt = 8;
                }

                if (game.editor.estado == 0 && _clip.y - 32 > _clip.suelo_y) 
                {
                  _clip.spawn_fall.start();
                
                }




           },



              

         },  //normal

        //|freeze
         freeze:
         {
          name:'freeze',
          estado:0, //0:regresar pos,  1: perdida vida
          
          hitcon:
          {
            detectar:1,
            rebotar:0,
            on_hit(f_enem)
            {

            }
          },

          ini(f_estado)
          {
            this.estado=f_estado;
             _clip.yvelocity=0;
             _clip.xvelocity=0;
          },
          run()
          {
               

          }

         },//freeze



 

        //|muerto
         muerto:
         {
          name:'muerto',
          estado:0, //0:regresar pos,  1: perdida vida
          hitcon:
          {
            detectar:1,
            rebotar:0,
            on_hit(f_enem)
            {

            }
          },

          ini(f_estado)
          {
            this.estado=f_estado;
             _clip.yvelocity=0;
             _clip.xvelocity=0;

             if(this.estado==0) //precipicio regresar pos
             {

              game.efectocon.add('v_move');

              game.soundcon.play(9);

              
             }
             if(this.estado==1||this.estado==2)//muerte normal;precipicio
               {
               
               game.soundcon.temacon.play(7);
               }


          },
          run()
          {
               let _spawn = _clip.spawn_fall;

               if(this.estado==0) //regresar ultima plataforma
               {
                   _clip.x += (_spawn.x-_clip.x)/20;
                   _clip.y += (_spawn.y-_clip.y)/20;
                   if(get_distance(_clip.x, _clip.y,
                                   _spawn.x, _spawn.y)<3  )
                   {
                     _spawn.end();
                     
                   }
               }
               if(this.estado==1||this.estado==2)//muerte normal;precipicio
               {
               
               _clip.anim.visible=false;

               }
               

                //_clip.estado_h=10;
          }

         },


        //|puerta
         puerta:
         {
          name:'puerta',
          tt:[0,10],
          puerta:0, //otile
          hitcon:
          {
            detectar:1,
            rebotar:0,
            on_hit(f_enem)
            {

            }
          },

          check()
          {
             
               

             let _tilemaps = $gameges.tileges.tilemaps_all;
             let _tiledata = $gameges.tileges.tiledata.col;

             let _xt = fl((_clip.x+_clip.w/2)/16);
             let _yt = fl((_clip.y+_clip.h/2)/16);

              if(_tilemaps[3][_yt] && _tilemaps[3][_yt][_xt].id=='puerta' && _clip.modos.modos.normal.suelo_tt>0)
              {
                game.soundcon.play(13,0.5);
                
                this.puerta = _tilemaps[3][_yt][_xt];
                let _des = this.puerta.destino;
                
                _clip.modos.set('puerta',[_xt, _yt]);

                //detectar tiles especiales; cambiar id
                let _p = _tiledata[_tilemaps[1][_yt][_xt]][4];
                if(_p&&_p.door!==undefined)
                {
                  _tilemaps[1][_yt][_xt]=_p.door;
                  $gameges.tileges.refresh.force();
                }
                _p = _tiledata[_tilemaps[1][_yt-1][_xt]][4];
                if(_p&&_p.door!==undefined)
                {
                  _tilemaps[1][_yt-1][_xt]=_p.door;
                  $gameges.tileges.refresh.force();
                }

                
                return (true);
              }

          },

          ini()
          {
             this.tt[0]=0;

             _clip.yvelocity=0;
             _clip.xvelocity=0;

          },
          run()
          {

             _clip.estado_h=_clip.orientacion;

             let _tt = this.tt;
             _tt[0]++;
             if(_tt[0]==_tt[1])
             {
               game.fadecon.set('oscurecer',   ()=>{

                //detectar tiles especiales; cambiar id
                let _yt = this.puerta.y;
                let _xt = this.puerta.x;
                let _tiledata = $gameges.tileges.tiledata.col;
                let _tilemaps = $gameges.tileges.tilemaps_all;
                let _p = _tiledata[_tilemaps[1][_yt][_xt]][4];
                if(_p&&_p.door!==undefined)
                {
                  _tilemaps[1][_yt][_xt]=_p.door;
                  $gameges.tileges.refresh.force();
                }
                _p = _tiledata[_tilemaps[1][_yt-1][_xt]][4];
                if(_p&&_p.door!==undefined)
                {
                  _tilemaps[1][_yt-1][_xt]=_p.door;
                  $gameges.tileges.refresh.force();
                }



                        let _des = this.puerta.destino; //[submap_id, tag]
                        game.mapcon.set_submap(_des[0]);

                        let _tilemap_3 =game.mapcon.submap.tilemaps[3];
                        //buscar tag
                          for(var i in _tilemap_3)
                          {
                            for(var j in _tilemap_3[i])
                            {
                              let u = _tilemap_3[i][j];
                              if(u.tag==_des[1])
                              {
                                
                                $root.level.jugador.modos.modos.normal.estado=u.direccion;

                                $root.level.jugador.x = u.x*16;
                                $root.level.jugador.y = (u.y+1)*16-25;

                                $root.level.jugador.spawn_fall.set(u.x*16, u.y*16);

                                
                                break;
                              }
                            }
                          }
                         

                         
                         game.fadecon.set('aclarar',   ()=>{

                          //_clip.modos.set('normal');

                         // _clip.modos.modos.normal.estado = _clip.orientacion;

                         });

                          });


             }


          }

         },




         //|escalera
        escalera:
         {
          name:'escalera',
          hitcon:
          {
            detectar:1,
            rebotar:0,
            on_hit(f_enem)
            {

            }
          },
          permitir_arma:0,
          xt:0,
          yt:0,
          id_escalera:[39,49],

          ytmax:['',''],//arriba, abajo
          xdes:0,

          yvel:[0.3,1.5], //suma, maximo
          estado:0,

          check() //llamado en modo normal al presionar 'arr'
          {
              let _tilemap = $gameges.tileges.tilemaps_all[1];
              let _xt = fl((_clip.x+_clip.w/2)/16);
              let _yt = fl((_clip.y+_clip.h/2)/16);

              if(_tilemap[_yt] && this.id_escalera.includes(_tilemap[_yt][_xt]) )
              {console.log("------------------------------------------------")
              _clip.modos.modos.normal.run_tt[0] = 0;
              _clip.modos.modos.normal.running = 0;
              _clip.modos.set('escalera',[_xt, _yt]);
              return (true);
              }


          },

          ini(_xt, _yt)
          {

          this.estado=0;
          this.xt=_xt;
          this.yt=_yt;
          this.xdes=(_xt*16)+3;

           _clip.xvelocity=0;
           _clip.yvelocity=0;

           this.ytmax=['',''];

           //identificar extremos verticales escalera
           let _tilemap = $gameges.tileges.tilemaps_all[1];
           for(var i =0;i<100;i++)
           {

             if(this.ytmax[0]==='' && (_tilemap[_yt-i]==undefined || this.id_escalera.includes(_tilemap[_yt-i][_xt])==false) )
              this.ytmax[0]=(_yt-(i-1));
             
             if(this.ytmax[1]==='' && (_tilemap[_yt+i]==undefined || this.id_escalera.includes(_tilemap[_yt+i][_xt])==false) )
              this.ytmax[1]=(_yt+(i-1));
             
             if(this.ytmax[0]!==''&&this.ytmax[1]!=='')
              break;
           }

           console.log(this.ytmax);



          },
          
          run()
          {
            
           let _xt   = this.xt;
           let _yt   = this.yt;
           let _xdes = this.xdes;

           let _col = _clip.col_check();

           //centrar horizontalmente el jugador
           if(this.estado==0)
           {
           _clip.estado_h=11;
           _clip.anim.animdata.pause=1;
            _clip.x += (_xdes-_clip.x)/5;
             if(_clip.x>_xdes-1&&_clip.x<_xdes+1)
             {
              _clip.x=_xdes;
              this.estado=1;
             }

           }
           //al estar centrado
           if(this.estado==1)
           {
           _clip.estado_h=11;
           _clip.anim.animdata.pause=1;
              _clip.yvelocity += (0-_clip.yvelocity)/10;
               if ($WIN.teclado.get("arr")) 
                this.estado=2;
               
               else if ($WIN.teclado.get("aba")) 
                this.estado=3;



           }
           //subiendo
           if(this.estado==2)
           {
            //_clip.estado_h=11;
            _clip.anim.animdata.pause=0;

            _clip.yvelocity-=this.yvel[0];
            if(_clip.yvelocity<-this.yvel[1])
              _clip.yvelocity=-this.yvel[1];

              if ($WIN.teclado.get("arr")==0)
              this.estado=1; 

           }

           //bajando
           if(this.estado==3)
           {
            //_clip.estado_h=12;
            _clip.anim.animdata.pause=0;
            _clip.yvelocity+=this.yvel[0];
            if(_clip.yvelocity>this.yvel[1])
              _clip.yvelocity=this.yvel[1];

              if ($WIN.teclado.get("aba")==0)
              this.estado=1; 

            //regresar a modo normal al tocar suelo
             if(_col[1])
             {
              _clip.modos.set('normal');
              _clip.anim.animdata.pause=0;
             }
           }



           //limites de movimiento verticales
           if(_clip.y<this.ytmax[0]*16-14)
           {
              _clip.y=this.ytmax[0]*16-14;
              if(_clip.anim.animdata.act[1]==1||_clip.anim.animdata.act[1]==3)
              _clip.anim.animdata.pause=1;
           }

           if(_clip.y>this.ytmax[1]*16)
           {
              _clip.y=this.ytmax[1]*16;
              if(_clip.anim.animdata.act[1]==1||_clip.anim.animdata.act[1]==3)
              _clip.anim.animdata.pause=1;
           }

           //salto
           if($WIN.teclado.get('z',2)==1)
           {
            _clip.anim.animdata.pause=0;
            _clip.modos.set('normal',[]);
            _clip.yvelocity= -game.particon.data.perfiles.act.yvel_salto;
                              _clip.modos.modos.normal.suelo_tt = 0;
                              _clip.modos.modos.normal.salto_estado = 1;
           }



          }
         }//escalera
     }//modos

  },//modos

  enterframe() {

    let _tileges = $gameges.tileges;
    let _tilemaps_all = _tileges.tilemaps_all;
    window['_clip'] = this;

    this.xprev = this.x;
    this.yprev = this.y;

    this.x = this.x + this.xvelocity;
    this.y = this.y + this.yvelocity;
    let _xt = fl(this.x/16);
    let _yt = fl(this.y/16);
    let _xtm = fl((this.x+this.w/2)/16);
    let _ytm = fl((this.y+this.h/2)/16);


    

    //workarround editor                      
    if ($WIN.teclado.get("lshift")) {
      if ($WIN.teclado.get("aba", 2) == 1)
        this.x -= 50;

      if ($WIN.teclado.get("arr", 2) == 1)
        this.x += 50;
    }

   //this.hitcon.run();
   this._hitcon.run();


    this.modos.run();
    this.anim.animdata.set_anim(this.estado_h);
    this.armacon.run();



    this.anim.x = -11;
    this.anim.y = -6;

    

    this.camera_offset.update();


    //señal fuera de pantalla
    if(this.y+this.h+7<0 && this.off_screen_signo==='')
    {
      this.off_screen_signo = $WIN.gameges.cargar_clase($root.level, 1, {LOAD:{canvas_id:2},  x: _clip.x, y: 2, anim_id:3, 
             enterframe(){

              this.x = $root.level.jugador.x-$root.level.jugador.w/2;

              this.y = (($root.level.jugador.y+$root.level.jugador.h+7)/3) *-1;

            }
               });
    }
    if(this.y+this.h+7>0 && this.off_screen_signo!=='')
    {
      this.off_screen_signo.remove();
      this.off_screen_signo='';
    }

    //col tiles especiales

   let _p = [[this.x, this.y+7],[this.x+this.w,this.y+7],[this.x,this.y+this.h-3],[this.x+this.w,this.y+this.h-3] ];
   for(var i =0;i<4;i++)
   {
     let _xt = fl(_p[i][0]/16);
     let _yt = fl(_p[i][1]/16);
     if(game.editor.estado==0 && _tilemaps_all[1][_yt])
     {
      let _tc = _tilemaps_all[1][_yt][_xt];
      if(_tc==155||_tc==156||_tc==157)
      {
      _tilemaps_all[1][_yt][_xt]=0;
      _tileges.refresh.force();
      
      if(_tc==155) {game.particulas_con.flyer_exp(1,_xt*16+5, _yt*16+5);game.soundcon.play(17,1); }
      if(_tc==156) {game.particulas_con.flyer_hp (1,_xt*16+5, _yt*16+5);game.soundcon.play(17,1);};
      if(_tc==157) {game.particulas_con.flyer_pp (1,_xt*16+5, _yt*16+5);game.soundcon.play(17,1);};

      }
    }  
    
    
           
   }


  },

  off_screen_signo:'',

}

