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

      {
        LOAD:
        {
          id: 14,
          canvas_id: 1,
          modo: 'sprite',
          animdata: GAME.crear_animdata({ master: { wt: 16, ht: 16, ll: 30 } },

            { ll: 20, flip: [1, 0], buf: [[0, 0], [0, 1], [0, 2], [0, 1]] },

            { ll: 10, flip: [1, 0], buf: [[2, 0], [2, 1], [2, 2], [2, 1]] },
            { ll: 10, flip: [0, 0], buf: [[1, 0], [1, 1], [1, 2], [1, 1]] },
            { ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1], [2, 2], [2, 1]] },
            { ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1], [0, 2], [0, 1]] },

            { ll: 30, flip: [1, 0], buf: [[0, 0], [0, 1], [0, 2], [0, 1]] },

            
            { ll: 30, flip: [1, 0], buf: [[0, 3]  ] },



          ),
        },

      },



    ]


  },

current_mapoint:0,
mapstart_tt:[0,60],
  w: 16,
  h: 16,
  _z:10,
  tile_des: { x: 0, y: 0 },

  draw_color: '',



                //0=quieto, 1 = izquierda, 2=arriba...
  check_tile_ini(f_estado) {

    let _estado_xyplus = [[-1,0],[0,-1],[1,0],[0,1]];
    

    let _tilemaps = $gameges.tileges.tilemaps_all;
    let _xy      = this.get_c16();//x,y,id
    let _xyd     = {
                   x:  _xy.x + _estado_xyplus[f_estado-1][0], 
                   y:  _xy.y + _estado_xyplus[f_estado-1][1]
                   }

    if(this.propagar.check_join(_xy.x, _xy.y, _xyd.x, _xyd.y))
    {
      this.estado = f_estado;

      this.tile_des.x += _estado_xyplus[f_estado-1][0];
      this.tile_des.y += _estado_xyplus[f_estado-1][1];

    }

  },

  //|propagar
  propagar:
  {
    _padre: '',
    puntos: [], //[{x, y en tiles}      ]
    estado: 0,
    tt: [0, 10],
    run() {
      let _tilemaps = $gameges.tileges.tilemaps_all;

      if (this.estado) {
        this.tt[0]++;
        if (this.tt[0] > this.tt[1]) {

          this.tt[0] = 0;
          let _copy = this.puntos.slice();
          this.puntos = [];
          for (var u of _copy) {
            this.check_4(u.x, u.y, u.pos);
          }
          $gameges.tileges.refresh.force();
          if (this.puntos.length == 0) {
            this.end();
          }

        }
      }

    },//run
    ini(_xt, _yt, _pos = [1,1,1,1]) {

      this.estado = 1;
      this.tt[0] = 0;
      this.puntos = [];
      this.puntos.push({ x: _xt, y: _yt, pos:_pos})
    },//ini
    end() {
      this.estado = 0;
      this.tt[0] = 0;
      this.puntos = [];
    },
    //        centro, circundante
    //         / /      / /
    check_join(_x, _y, _xx, _yy, _des_id=1) {
      let _tilemaps = $gameges.tileges.tilemaps_all;
      let _id = _tilemaps[1][_y][_x];
      let _id2 = _tilemaps[1][_yy][_xx];

      let _tiledata = $gameges.tileges.tiledata.col;
      

      let _a = _tiledata[_id];
      let _b = _tiledata[_id2];


      if (_a == undefined || _b == undefined)
        return (0)

      if (_a[0] && _b[2]==_des_id && _y == _yy && _x > _xx ||
          _a[1] && _b[3]==_des_id && _x == _xx && _y > _yy ||
          _a[2] && _b[0]==_des_id && _y == _yy && _x < _xx ||
          _a[3] && _b[1]==_des_id && _x == _xx && _y < _yy) {
        return (1)
      }



      return (0);
    },
    /*tiles_infolado: //definicion de 'salidas' de tiles camino
    {
      0: [0, 0, 0, 0],

      //bloques nivel
      30: [1, 1, 1, 1],    34: [2, 2, 2, 2],
      40: [1, 1, 1, 1],

      61: [1, 1, 1, 1],63: [1, 1, 1, 1],64: [1, 1, 1, 1],

      1: [0, 0, 1, 1], 5: [0, 0, 2, 2],
      2: [1, 0, 1, 0], 6: [2, 0, 2, 0],
      3: [1, 0, 0, 1], 7: [2, 0, 0, 2],

      11: [0, 1, 0, 1], 15: [0, 2, 0, 2],
      21: [0, 1, 1, 0], 25: [0, 2, 2, 0],
      23: [1, 1, 0, 0], 27: [2, 2, 0, 0],

      32: [1, 0, 1, 1], 36: [2, 0, 9, 2],
      41: [0, 1, 1, 1], 45: [0, 2, 2, 2],
      42: [1, 1, 1, 1], 46: [2, 2, 2, 2],
      43: [1, 1, 0, 1], 47: [2, 2, 0, 2],
      52: [1, 1, 1, 0], 56: [2, 2, 1, 0]

    },
    */

    check_4(_xt, _yt, _pos) {
      let _tilemaps = $gameges.tileges.tilemaps_all;
      let _tiledata = $gameges.tileges.tiledata.col;
      let _id_ini = _tilemaps[1][_yt][_xt];

      let _xy = [[-1, 0],
                 [0, -1],
                 [1, 0],
                 [0, 1]
                ];

      for (var i =0;i<4;i++) {
        let  u = _xy[i];
        let _x = _xt + u[0];
        let _y = _yt + u[1];
        if (_tilemaps[1][_y] == undefined || _tilemaps[1][_y][_x] == undefined)
          continue;

        let _id = _tilemaps[1][_y][_x];


        if (this.check_join(_xt, _yt, _x, _y,  2) && _pos[i]==1)
           {
           
           //swap tile

           _tilemaps[1][_y][_x] = _tiledata[_id][5];

           if(_id==34)
           {
            //break
           continue
           }
            
           this.puntos.push({ x: _x, y: _y, pos:[1,1,1,1]})

        }

      }



    },


  },//propagar

  check_tile_nextmove() { //empleado movimiento automatico
    let _tilemaps = $gameges.tileges.tilemaps_all;
    

    let _id = this.get_c16().id;
    let _tiledata = $gameges.tileges.tiledata.col[_id];


    if (_tiledata[4]===1) {

      for(var i =0;i<4;i++)
      {
        
        if(_tiledata[i]==1 && i!== this.flip_4(this.estado-1))
        {
        let _xyp = this.xyp_from_4(i);
        this.tile_des.x += _xyp[0];
        this.tile_des.y += _xyp[1];

        this.estado = i+1;
        break;
        }

      }



      



      return (1);
    }


    return (0);

  },

  flip_4(_pos)
  {
    if(_pos==0)return (2);
    if(_pos==1)return (3);
    if(_pos==2)return (0);
    if(_pos==3)return (1);

  },

  xyp_from_4(_n)
  {
     let _a = [[-1,0],
               [0,-1],
               [1,0],
               [0,1],
              ]

    return(_a[_n]);

  },

  get_c16(_tilemap_id=1) {
    let _x = fl((this.x + 8) / 16);
    let _y = fl((this.y + 8) / 16);
    let _id = $gameges.tileges.tilemaps_all[_tilemap_id][_y][_x];

    return ({
      x: _x,
      y: _y,
      id: _id
    })
  },


  camera_offset:{_padre:'', x:0,y:0,w:0,h:0, xp:0, yp:0, limit:1,

   update(f_x=this._padre.x, f_y=this._padre.y, f_w=this._padre.w, f_h=this._padre.h)
  {   
   this.x = f_x;
   this.y = f_y;
   this.w = f_w;
   this.h = f_h;
  },


  },


  loadframe() {
    
    this.propagar._padre = this;
    padrear(this);
    //this.update_fondos()


    this.anim = this.hijos_clip[0];

    this.estado = 0;
    this.xvelocity = 0;
    this.yvelocity = 0;
    this.tile_des = { x: fl(this.x / 16), y: fl(this.y / 16) };

    this.camera_offset.update();
  },


  enterframe() {

    this.x = this.x + this.xvelocity;
    this.y = this.y + this.yvelocity;
    let _tilemaps = $gameges.tileges.tilemaps_all;
    let _y16 = fl(this.y / 16);
    let _x16 = fl(this.x / 16);
    let _yc16 = fl((this.y + 8) / 16);
    let _xc16 = fl((this.x + 8) / 16);


    let _estado_h = this.estado;

    


    this.propagar.run();
    //let _vel = 1.6;
        let _vel = 1.7;

    let _to = _tilemaps[3][_y16][_x16];
      
        
    if(this.estado==6)//load tt
    {
      this.mapstart_tt[0]++;
      if(this.mapstart_tt[0]==this.mapstart_tt[1])
      {
      game.escenario.act.on_mapoint_start(_to);
      }

    }
    

    if (this.estado == 0 &&   this.propagar.estado==0)//quieto
    {

        if(this.current_mapoint !== _to && get_type(_to)=='object' && _to.id=='w_mapoint')
        {
          this.current_mapoint = _to;
          game.escenario.act.on_mapoint_stand(_to);
        }

      if ($WIN.teclado.get('z',2) == 1) {

        if(get_type(_to)=='object' && _to.id=='w_mapoint')
        {
           game.escenario.act.on_mapoint_openselect(_to);  
           this.estado=5; //esperando en seleccion de personaje
           return;
        }
      }
        

      if ($WIN.teclado.get('izq') == 1) {
        this.check_tile_ini(1);
      }
      else if ($WIN.teclado.get('arr') == 1) {
        this.check_tile_ini(2);
      }
      else if ($WIN.teclado.get('der') == 1) {
        this.check_tile_ini(3);
      }
      else if ($WIN.teclado.get('aba') == 1) {
        this.check_tile_ini(4);
      }


      else if ($WIN.teclado.get('space', 2) == 1) {
        let _c16 = this.get_c16();
        this.propagar.ini(_c16.x, _c16.y);
      }
    }

    else
    {
      if(this.current_mapoint!==0)
      {
        game.escenario.act.on_mapoint_leave(this.current_mapoint); 
        this.current_mapoint = 0;
      }
    
    }


    //hacia izquierda
    if (this.x > this.tile_des.x * 16) {
      this.x -= _vel;
      if (this.x <= this.tile_des.x * 16) {
        this.x = this.tile_des.x * 16;

        if (this.check_tile_nextmove() == 0)
        {
          this.estado = 0;
        }

      }
    }
    //hacia arriba
    if (this.y > this.tile_des.y * 16) {
      this.y -= _vel;
      if (this.y <= this.tile_des.y * 16) {
        this.y = this.tile_des.y * 16;
        if (this.check_tile_nextmove() == 0)
        {
          this.estado = 0;
        }
      }
    }

    //hacia derecha
    if (this.x < this.tile_des.x * 16) {
      this.x += _vel;
      if (this.x >= this.tile_des.x * 16) {
        this.x = this.tile_des.x * 16;
        if (this.check_tile_nextmove() == 0)
        {
          this.estado = 0;
        }
      }
    }

    //hacia abajo
    if (this.y < this.tile_des.y * 16) {
      this.y += _vel;
      if (this.y >= this.tile_des.y * 16) {
        this.y = this.tile_des.y * 16;
        if (this.check_tile_nextmove() == 0)
        {
          this.estado = 0;
        }
      }
    }

    this.anim.animdata.set_anim(_estado_h);
    let _perfil_id = game.particon.data.perfiles.id_act;
    
 

    if(this.animations_ini == undefined )
      this.animations_ini = clone_array(this.anim.animdata.animations,1);
   

    let _animations = this.anim.animdata.animations
    let _animation =  _animations[this.anim.animdata.act[0]];

    for(var i =0;i< _animation.buf.length;i++)
    {
      _animation.buf[i][0]= this.animations_ini[this.anim.animdata.act[0]].buf[i][0] + (4*_perfil_id);
    }
    

    this.anim.x = 0;
    this.anim.y = -5;


    this.camera_offset.update();


    //game.center_nivel($root.level.jugador.camera_offset);

//    game.center_nivel(this.x+this.w/2,this.y+this.h/2  );



    //this.update_fondos();

  },

}

