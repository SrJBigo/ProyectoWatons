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
  },
  mapdata: {}, //x,y

  xprev: 0,
  yprev: 0,
  w: 10,
  h: 25,
  xvelocity: 0,
  yvelocity: 0,
  offset: [0, 0],

  draw_color: "",

  estado_h:0,
  estado: 0,
  anim: '',

  offscreen_dis: 32,

  //|hitcon
  hitcon:
  {
    _padre: '',
    rebotar:1,
    hp: [10, 10],
    damage:2,
    sound_id:0,
    
    estado:0,
    blink_tt:[0,2],
                            //player, bullet
    on_hit(f_quien, f_data, f_modo) {

      if (game.editor.estado == 1) return;

      this.estado=1;

      game.soundcon.play(this.sound_id);

      let _htext = game.textoges.crear($root.level, {x:this._padre.x,y:this._padre.y-5, texto: '-'+f_data.damage})
          _htext.tt=[0,30];
          _htext.enterframe=()=>
               {
                _htext.tt[0]++;
                if(_htext.tt[0]>_htext.tt[1])
                  _htext.remove();
                _htext.y-=0.5;
               }

      this.hp[0] -= f_data.damage;
      if (this.hp[0] <= 0) {
      
      $WIN.gameges.cargar_clase($root.level, 1, {anim_id:2, x: this._padre.x, y: this._padre.y});

        this._padre.remove();
      }

       return(1);

    },
    run()
    {
       if(this.estado==1)
       {
        this._padre.anim.visible=false;
        this.blink_tt[0]++;
        if(this.blink_tt[0]>this.blink_tt[1])
        {
          this._padre.anim.visible=true;
          this.blink_tt[0]=0;
          this.estado=0;
        }
       }


    },

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

  },

  check_tile(f_x, f_y) {
    let _x = fl(f_x / 16);
    let _y = fl(f_y / 16);
    if ($tileges.tilemaps[1][_y][_x] !== 0) {
      return (1);
    }

  },

  //|modos
  modos:
  {
    'perro': {
      animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { wt:32,  ht:32, ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },
          { wt:32,  ht:32, ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { wt:32,  ht:32, ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },
          { wt:32,  ht:32, ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { wt:32,  ht:32, ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },

            ],


      w: 16,
      h: 16,
      offset: [-7, -16],
      hitcon: {
        
        hp: [10, 10],
        sound_id:0,
      },
      loadframe() {
        //console.log(this.anim.animdata.animations);
      
        this.estado=this.direccion;
        this.estado_h = this.estado;

      },
      enterframe() {
        let _col = this.col_check(); //[n,n,n,n] relativo a tile

        if (this.estado == 0) {
          this.xvelocity = -0.5;
          if (_col[2])
            this.estado = 1;
        }
        if (this.estado == 1) {
          this.xvelocity = 0.5;
          if (_col[0])
            this.estado = 0;
        }

        this.yvelocity += 0.5;
        if (this.yvelocity > 3.5)
          this.yvelocity = 3.5;

        this.estado_h = this.estado;

      },

    },//perro

   'perro_2': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { wt:16,  ht:32, ll: 5, flip: [0, 0], buf: [[2, 0] ] },
          { wt:16,  ht:32, ll: 2, flip: [0, 0], buf: [[2, 1],[2, 2],[2, 1] ] },
          { wt:16,  ht:32, ll: 5, flip: [0, 0], buf: [[2, 0], [2, 1]] },
          { wt:16,  ht:32, ll: 5, flip: [0, 0], buf: [[2, 0], [2, 1]] },
          { wt:16,  ht:32, ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1]] },
          { wt:16,  ht:32, ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1]] },
          { wt:16,  ht:32, ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1]] },
          { wt:16,  ht:32, ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1]] },
          { wt:16,  ht:32, ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1]] },
          { wt:16,  ht:32, ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1]] },

            ],
      autoflip:1, //horientacion x a jugador
      w: 16,
      h: 16,
      petro:0,
      offset: [0, -16],
      hitcon: {
        
        hp: [12, 12],
        sound_id:0,
      },
      j_yvel:-7,
      tt:[0,10],
      loadframe() {

        this.estado=this.direccion;
        this.estado_h = this.estado;

      },
      enterframe() {
        let _col = this.col_check(); //[n,n,n,n] relativo a tile


       

        if(this.estado==0)
        {
        this.yvelocity += 0.4;
        if (this.yvelocity > 3.5)
          this.yvelocity = 3.5;
        
          if(_col[1])
          {
          this.yvelocity=0;
          this.estado=1;
          }
        }  

        if(this.estado==1)
        {
          this.tt[0]++;
          if(this.tt[0]>this.tt[1])
          {
            this.tt[0]=0;
            this.estado=0;
            this.yvelocity=this.j_yvel;
          }
        }  

         


        this.estado_h = this.estado;

      },

    },//perro_2

   'completo': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [1, 0], buf: [[0, 10] ] },
          
            ],

      w: 16,
      h: 16,
      offset: [0, 0],
      hitcon: {
        
        on_hit(f_quien, f_data, f_modo)
        {
          if (game.editor.estado == 1) return;

          if(f_modo=='player')
          {
          this._padre.remove();
          }

          return(0);
        },
        hp: [12, 12],
        sound_id:0,
      },
      
      loadframe() {
        console.log('load completo')
       this.estado_h=0;

      },
      enterframe() {
        let _col = this.col_check(); //[n,n,n,n] relativo a tile
         this.yvelocity+=0.01;

        this.estado_h = 0;

      },

    },//completo

   'w_mapoint': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [0, 0], buf: [[0, 11] ] },
          
            ],

      w: 16,
      h: 16,
      offset: [0, 0],
      hitcon: {
        
        on_hit(f_quien, f_data, f_modo)
        {
          if(f_modo=='player')
          {
          this._padre.remove();
          }

          return(0);
        },
        hp: [12, 12],
        sound_id:0,
      },
      
      loadframe() {

       this.estado_h=0;

      },
      enterframe() {
        let _col = this.col_check(); //[n,n,n,n] relativo a tile
         

        this.estado_h = 0;

      },

    },//w_mapoint


    'npc': {
    animdata:[
          { master: { offset:[-8,-16],wt: 32, ht: 32, ll: 30 } },

          //quieto
          { ll: 5, flip: [0, 0], buf: [[0, 0] ] },
          { ll: 5, flip: [1, 0], buf: [[0, 0] ] },

          //caminando
          { ll: 10, flip: [0, 0], buf: [[0, 1],[0, 2] ] },
          { ll: 10, flip: [1, 0], buf: [[0, 1],[0, 2] ] },
          
            ],
      w: 16,
      h: 16,
      offscreen_dis: 100,
      //id_npc
      hitcon: {
        on_hit(f_quien, f_data, f_modo)
        {
          return(0);
        },
        hp: [12, 12],
        sound_id:0,
      },
      
      loadframe() {

        
        

        //cambiar buf de animacion de acuerdo a id_npc
        let _animations = this.anim.animdata.animations;
        for(var u of _animations )
        {
             for(var _u of u.buf)
             {
              _u[0]+=this.id_npc;
             }
        }
        
        this.anim.image=$LIB.IMAGES[22]; //22 = imagen de npcs
        this.draw_color='';
        this.estado_h=0;
        this.estado=2;


        this.x_ini = this.x;
        this.y_ini = this.y;

        if(this.overdialogos.length>0)
        {
        this.overdialogo_con.textos = this.overdialogos;
        this.overdialogo_con.ini();  
        }
        

      },

      overdialogo_con:
      {
       tt:[0,100,100],
       estado:0,
       texto:'',
       textos:[],
       ini()
       {
        this.texto = game.textoges.crear($enterload.anim, {x:0,y:0-25, texto: 'Insuficiente!'})
        this.texto.visible=false;
        this.texto.image.onload= ()=>
        {
         this.estado=1;
         this.texto.x-=this.texto.image.width/2-5;  
         //this.texto.visible=false;
        }


       },
       run()
       {
        if(this.estado==1)
        {
          
          this.tt[0]++;
          if(this.tt[0]>this.tt[1])
          {
            this.tt[0]=0;
            if(this.texto.visible==false)
            {
              this.texto._onload = ()=>{
              this.texto.visible=true;
              this.texto.x=-(this.texto.image.width/2)+4;  
              }
              this.texto.set_text( random_from_array(this.textos) );

              
            }
            else
              this.texto.visible=false;

          }
        }


       },

      },

      enterframe() {
        let _col = this.col_check(); //[n,n,n,n] relativo a tile
         
         this.overdialogo_con.run();

         this.yvelocity+=0.5;

          if(this.id_move=='deambular')
          {
         if(this.x<this.x_ini-50||_col[2])
            this.estado=3;
         
         if(this.x>this.x_ini+50||_col[0])
            this.estado=2;
         
         if(this.estado==0||this.estado==1)
            this.xvelocity=0;
          
         if(this.estado==2)
            this.xvelocity=-0.7;
          
         if(this.estado==3)
            this.xvelocity=0.7;
          }

          if(this.id_move=='quieto')
          {
             if($root.level.jugador.x+$root.level.jugador.w/2<this.x-7)
              this.estado=0;
            if($root.level.jugador.x+$root.level.jugador.w/2>this.x+this.w+7)
              this.estado=1;

          }


          
          this.estado_h = this.estado;

        

      },

    },//npc

    'start_point': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [0, 0], buf: [[1, 11] ] },
          
            ],
      w: 16,
      h: 16,
      offset: [0, 0],
      hitcon: {
        on_hit(f_quien, f_data, f_modo)
        {
          return(0);
        },
        hp: [12, 12],
        sound_id:0,
      },
      
      loadframe() {
       this.estado_h=0;
      },
      enterframe() {
        //let _col = this.col_check(); //[n,n,n,n] relativo a tile
         
        this.estado_h = 0;

      },

    },//start_point


   'puerta': {
    animdata:[
          { master: { wt: 16, ht: 32, ll: 30 } },

          { ll: 5, flip: [0, 0], buf: [ [0, 4] ] },
          
            ],

      w: 16,
      h: 16,
      offset: [0, -16],
      hitcon: {
        
        on_hit(f_quien, f_data, f_modo)
        {
          

          return(0);
        },
        hp: [12, 12],
        sound_id:0,
      },
      
      loadframe() {

       this.estado_h=0;

      },
      enterframe() {
        let _col = this.col_check(); //[n,n,n,n] relativo a tile
         

        this.estado_h = 0;

      },

    },//puerta




  },


  on_remove() {
    game.remove_obj(this);



  },

  loadframe() {

     //_class.animdata = _class.LOAD.animdata;
 
    this.hitcon._padre = this;
    this.xprev = this.x;
    this.yprev = this.y;
    this.anim = this.hijos_clip[0];

    let _modo = this.modos[this.id];

    this.anim = WIN.gameges.crear_sprite(this, 7, 1, {animdata: GAME.crear_animdata(..._modo.animdata)  });

    for(var i in _modo)
    {
      if(i=='loadframe'||i=='enterframe')
        continue;

      if(get_type(_modo[i])=='object' && this[i]!==undefined )
       setloop_prop(this[i], _modo[i]);        

      else
      this[i] = _modo[i];
    }

    bindear_(_modo.loadframe, this)();

    

  },

  enterframe() {
    

   this.hitcon.run();

   let _modo = this.modos[this.id];

    let _level = $root.level;
    if (game.editor.estado == 0) {
      this.x = this.x + this.xvelocity;
      this.y = this.y + this.yvelocity;

      bindear_(_modo.enterframe, this)();

    }

    this.anim.x = this.offset[0];
    this.anim.y = this.offset[1];
    this.anim.animdata.set_anim(this.estado_h);

    if(this.autoflip)
    {
      if(this.x<_level.jugador.x)
        this.anim.animdata.force.flip=[1,0];
      if(this.x>_level.jugador.x)
        this.anim.animdata.force.flip=[0,0];  
    }
    

    this.xprev = this.x;
    this.yprev = this.y;

    let _off = this.offscreen_dis;
    if (this.x < _level.x * -1 - _off || this.x > (_level.x * -1) + _level.w + _off ||
      this.y < _level.y * -1 - _off || this.y > (_level.y * -1) + _level.h + _off)
    {
    this.remove();
    this.mapdata.in = 0;
      


    }
    

  },
}

