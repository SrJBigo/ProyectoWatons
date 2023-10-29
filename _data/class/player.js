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

            { ll: 30, flip: [1, 0], offset: [-10, -2], buf: [[0, 0,  16, 32]]  },
            { ll: 30, flip: [0, 0], offset: [-16, -5], buf: [[0, 32, 32, 16]]  },
            { ll: 30, flip: [0, 0], offset: [0,   -2], buf: [[0, 0,  16, 32]]  },
            { ll: 30, flip: [0, 1], offset: [-16, 10], buf: [[0, 32, 32, 16]]  },

            

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
            { ll: 30, flip: [1, 0], buf: [[0, 0], [0, 1]] },
            { ll: 30, flip: [0, 0], buf: [[0, 0], [0, 1]] },

            //caminar
            { ll: 10, flip: [1, 0], buf: [[0, 4], [0, 5], [0, 6], [0, 7], [0, 6], [0, 5]] },
            { ll: 10, flip: [0, 0], buf: [[0, 4], [0, 5], [0, 6], [0, 7], [0, 6], [0, 5]] },

            //correr
            { ll: 10, flip: [1, 0], buf: [[9, 0], [1, 1], [1, 2], [1, 3], [1, 2], [1, 1]] },
            { ll: 10, flip: [0, 0], buf: [[0, 0], [1, 1], [1, 2], [1, 3], [1, 2], [1, 1]] },

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


  w: 10,
  h: 25,

  draw_color: "",

  xvelocity:0,
  yvelocity:0,
  xprev:0,
  yprev:0,
  
  orientacion: 1, //0,1 -> izquierda, derecha

  gravedad:0.3,
  suelo_y:0,//def enterframe

  //|armacon
  armacon:
  {
     _padre:'',
     estado:1,  //0 = inactivo[invisible]; | = activo [visible]
     orientacion:0, //0,1 = izquierda,derecha
     angulo:0, //0,1,2,3
     anim:'',
     act:'', //objeto modo actual
     set(f_modo)
     {
      this.act = this.modos[f_modo];
     },
     modos:
     {
      _padre:'',
       arco:
          {
           _padre:'',
           vel:5.5,
           
           xyni:[5,10],
           xy:  [[-1,0],[0,-1],[1,0],[0,1]], //empleado en XYvel de flecha
           xy2 :[[-1,1],[0,0], [1,1],[0,1]], //empleado en xy 'caprichoso' de flecha

           shoot(f_angulo)
           {

               $WIN.gameges.cargar_clase($root.level, 4, {
                  id: 'arrow',
                  estado: f_angulo,
                  x:         _clip.x + this.xyni[0]*this.xy2[f_angulo][0],
                  y:         _clip.y + this.xyni[1]*this.xy2[f_angulo][1],
                  xvelocity: this.vel*this.xy[f_angulo][0],
                  yvelocity: this.vel*this.xy[f_angulo][1]
                });

           },
           run()
           {
              
           },


          },//arco

     },//modos
     ini()
     {
       this.set('arco');
       this.anim = _clip.anim_arma;
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
       {
         this.act.shoot(this.angulo);
       }

      this.anim.visible=1;
      this.anim.animdata.set_anim(this.angulo);
      
      }
      else
        this.anim.visible=0;

     },
  
  },//armacon

  //|fondocon
  fondocon:
  {
    _padre:'',
    tt: [0, 25, 0],
    update_fondos()
    {
      this.tt[0]++;
      if (this.tt[0] > this.tt[1]) 
      {
        this.tt[0] = 0;
        this.tt[2] += 1;
      }
      $gameges.fondoges.fondos[0].x = ($root.level.x / 7);
      $gameges.fondoges.fondos[0].y = ($root.level.y) - 10;
      $gameges.fondoges.fondos[1].x = ($root.level.x / 3) - this.tt[2];
      $gameges.fondoges.fondos[1].y = ($root.level.y) - 25;
      $gameges.fondoges.fondos[2].x = ($root.level.x / 3);
      $gameges.fondoges.fondos[2].y = ($root.level.y) - 25;
    },

  },//fondocon

  update_nivel()
  {
    $root.level.x = fl((this.x * -1) - this.w / 2 + $root.w / 2);
    $root.level.y = fl((this.y * -1) - this.h / 2 + $root.h / 2);

    if ($root.level.x > 0) 
      $root.level.x = 0;
    
    if ((-$root.level.x) + $gameges.tileges.xt_max * 16 > $gameges.tileges.xt_allmax * 16) 
      $root.level.x = -($gameges.tileges.xt_allmax * 16 - $gameges.tileges.xt_max * 16);
    
    if ($root.level.y > 0) 
      $root.level.y = 0;
    
    if ((-$root.level.y) + $gameges.tileges.yt_max * 16 > $gameges.tileges.yt_allmax * 16) 
      $root.level.y = -($gameges.tileges.yt_allmax * 16 - $gameges.tileges.yt_max * 16);
    
    $gameges.tileges.x = $root.level.x * -1;
    $gameges.tileges.y = $root.level.y * -1;

  },

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
          _tilemap_1[u.yt - 1] != undefined && _udata[_tilemap_1[u.yt - 1][u.xt]] != '1,1,1,1' &&
          _p.yprev + _p.h <= u.y + 1 && _p.yvelocity > 0 && _p.y + _p.h > u.y) //colision arriba tile
        {
          _p.y = u.y - _p.h;
          _p.yvelocity = 0;
          _ret[1] = 1;
        }


        if (_udata[3] == 1 &&
          _tilemap_1[u.yt + 1] != undefined && _udata[_tilemap_1[u.yt + 1][u.xt]] != '1,1,1,1' &&
          _p.yprev >= u.y + u.h && _p.yvelocity < 0 && _p.y < u.y + u.h) //colision abajo tile
        {
          _p.y = u.y + u.h;

          _p.yvelocity = 0.5;
          _ret[3] = 1;
        }

      }


      //izquieda derecha
      if (_p.y < u.y + u.h && _p.y + _p.h > u.y) {
        if (_udata[0] == 1 &&
          _p.xprev + _p.w <= u.x && _p.xvelocity > 0 && _p.x + _p.w > u.x) // colision izquierda tile
        {
          _p.x = u.x - _p.w;
          _p.xvelocity = 0;
          _ret[0] = 1;
        }

        if (_udata[2] == 1 &&
          _p.xprev >= u.x + u.w && _p.xvelocity < 0 && _p.x < u.x + u.w) // colosion derecha tile
        {
          _p.x = u.x + u.w;

          _p.xvelocity = 0;
          _ret[2] = 1;
        }
      }
    }
    return (_ret);

  },//colcheck

  //|hitcon
  hitcon:
  {
    _padre: '',
    estado: 0,
    //          ll_act, ll_max   bin
    //          / /              /
    tt: [0, 5, 0, 10, 0],
    //blink_tt
    hit(_enem) {
     let _modo = _clip.modos.act;
      
      if(_modo.hitcon.detectar)
      {

          game.particon.data.stats.set(_enem.hitcon.damage, 'hp', '-');

          let _padre = this._padre;
          
          this.estado = 1;
          this.tt[0] = 0;
          this.tt[2] = 0;
          this.tt[4] = 0;

          if(_modo.hitcon.rebotar)
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
        _padre.anim_arma.visible = true;
        if (this.tt[4] == 1) {
          _padre.anim.visible = false;
          _padre.anim_arma.visible = false;
        }

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
            _padre.anim_arma.visible = true;

          }
        }

      }

      if (this.estado == 0) {
        for (var u of game.objs) {
          if (game.simple_hit_test(this._padre, u) &&
              u.hitcon.on_hit(this, { damage: 6 },'player')     ) {

            this.hit(u);
            
            break;

          }

        }
      }

    },

  },//hitcon

  loadframe() 
  {
    window['_clip'] = this;
    padrear(this);
    this.fondocon.update_fondos()

    this.anim = this.hijos_clip[1];
    this.anim_arma = this.hijos_clip[0];
    this.armacon.ini();

    this.suelo_y = $gameges.tileges.yt_allmax * 16;

    //this.armacon.ini();

    this.modos.set('normal',[]);

  },

  //|modos
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
         //|normal (modos jugador)
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

          permitir_arma:1,
          suelo_tt:0,
          salto_estado:0,
          estado:0,

          xvel_max: 2,
          xvel_impetu: 0.3,
          yvel_salto: 4,
  
          polvo:
          {
            _padre:'',
            tt: [0,10],
            reset() {
              this.tt[0] = 0;
            },

            run() {
              let _padre = this._padre;

              this.tt[0]++;
              if (this.tt[0] > this.tt[1]) {
                this.tt[0] = 0;
                  if (_padre.suelo_tt >= 3)
                  {
                    if(_padre.estado == 0 || _padre.estado == 2)  
                      $WIN.gameges.cargar_clase($root.level, 1, { x: _clip.x + 7, y: _clip.y + 16,anim_id:0 });
                  
                    if (_padre.estado == 1 || _padre.estado == 3) 
                      $WIN.gameges.cargar_clase($root.level, 1, { x: _clip.x - 5, y: _clip.y + 18, anim_id:0 });
                      
                 }
                }
              }
            
          },//polvo

           ini()
           {
           this.estado=1;
           },
           run()
           {
            let _padre        = this._padre;
            let _tileges      = $gameges.tileges;
            let _tilemaps_all = _tileges.tilemaps_all;

            let _xt = fl(_clip.x/16);
            let _yt = fl(_clip.y/16);

            this.suelo_tt--;
            _clip.yvelocity += _clip.gravedad;

            let _col = _clip.col_check();
            if(_col[1])
            {
              _clip.yvelocity=0;
              this.suelo_tt=3;
            }
            

            
           if($WIN.teclado.get('arr'))
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
                _clip.yvelocity = (-this.yvel_salto);
                game.soundcon.play(2);
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
                  this.estado = 2;
                if ($WIN.teclado.get("der"))
                  this.estado = 3;
              }

              //caminar izquierda
              if (this.estado == 2)
               {
                _clip.orientacion = 0;
                this.polvo.run();
                _clip.xvelocity -= this.xvel_impetu;
                if (_clip.xvelocity < (-this.xvel_max)) 
                    _clip.xvelocity = (-this.xvel_max);
                
                if ($WIN.teclado.get("izq") == 0) {
                    this.estado = 0;
                }
              }

              //caminar derecha
              if (this.estado == 3) 
              {
                _clip.orientacion = 1;
                this.polvo.run();
                _clip.xvelocity += this.xvel_impetu;
                if (_clip.xvelocity > this.xvel_max)
                    _clip.xvelocity = this.xvel_max;
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

              if (_clip.x < 0) 
                _clip.x = 0;


           },

         },  //normal
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
              {
              _clip.modos.set('escalera',[_xt, _yt]);
              return (true);
              }


          },

          ini(_xt, _yt)
          {
          this.estado=0;
          this.xt=_xt;
          this.yt=_yt;
          this.xdes=(_xt*16)+5;

           _clip.xvelocity=0;
           _clip.yvelocity=0;

           this.ytmax=['',''];

           //identificar extremos verticales escalera
           let _tilemap = $gameges.tileges.tilemaps_all[1];
           for(var i =0;i<100;i++)
           {
             if(this.ytmax[0]==='' && this.id_escalera.includes(_tilemap[_yt-i][_xt])==false )
              this.ytmax[0]=(_yt-(i-1));
             
             if(this.ytmax[1]==='' && this.id_escalera.includes(_tilemap[_yt+i][_xt])==false )
              this.ytmax[1]=(_yt+(i-1));
             
             if(this.ytmax[0]!==''&&this.ytmax[1]!=='')
              break;
           }


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
           _clip.estado_h=10;
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
           _clip.estado_h=10;
              _clip.yvelocity += (0-_clip.yvelocity)/10;
               if ($WIN.teclado.get("arr")) 
                this.estado=2;
               
               else if ($WIN.teclado.get("aba")) 
                this.estado=3;



           }
           //subiendo
           if(this.estado==2)
           {
            _clip.estado_h=11;
            _clip.yvelocity-=this.yvel[0];
            if(_clip.yvelocity<-this.yvel[1])
              _clip.yvelocity=-this.yvel[1];

              if ($WIN.teclado.get("arr")==0)
              this.estado=1; 

           }

           //bajando
           if(this.estado==3)
           {
            _clip.estado_h=12;
            _clip.yvelocity+=this.yvel[0];
            if(_clip.yvelocity>this.yvel[1])
              _clip.yvelocity=this.yvel[1];

              if ($WIN.teclado.get("aba")==0)
              this.estado=1; 

            //regresar a modo normal al tocar suelo
             if(_col[1])
             {
              _clip.modos.set('normal');
             }
           }

           //salto
           if($WIN.teclado.get('z',2)==1)
           {
            _clip.modos.set('normal',[]);
            _clip.yvelocity= -_clip.modos.modos.normal.yvel_salto;
                              _clip.modos.modos.normal.suelo_tt = 0;
                              _clip.modos.modos.normal.salto_estado = 1;
           }


           //limites de movimiento verticales
           if(_clip.y<this.ytmax[0]*16)
              _clip.y=this.ytmax[0]*16;

           if(_clip.y>this.ytmax[1]*16)
              _clip.y=this.ytmax[1]*16;


          }
         }//escalera
     }//modos

  },//modos

  enterframe() {

    let _tileges = $gameges.tileges;
    let _tilemaps_all = _tileges.tilemaps_all;
    window['_clip'] = this;

    this.x = this.x + this.xvelocity;
    this.y = this.y + this.yvelocity;
    let _xt = fl(this.x/16);
    let _yt = fl(this.y/16);


    if (game.editor.estado && this.y + this.h > this.suelo_y) 
    {
      this.y = this.suelo_y - this.h;
      this.yvelocity = 0;
      this.suelo_tt = 3;
    }

    if (game.editor.estado == 0 && this.y - 32 > this.suelo_y) 
    {
     game.reiniciar();
    }

    //workarround editor                      
    if ($WIN.teclado.get("lshift")) {
      if ($WIN.teclado.get("aba", 2) == 1)
        this.x -= 50;

      if ($WIN.teclado.get("arr", 2) == 1)
        this.x += 50;
    }

   this.hitcon.run();
   this.modos.run();


    this.anim.animdata.set_anim(this.estado_h);

    this.armacon.run();
    this.update_nivel();
    this.fondocon.update_fondos();

    //$gameges.fondoges.fondos[0].id = 0;

    this.anim.x = -13;
    this.anim.y = -5;

    this.xprev = this.x;
    this.yprev = this.y;


  },

}

