//document.currentScript.OBJ_DES[script.url_filename_limpio(document.currentScript.src)] = "jiji";
//============================
//CREADO VIA  cargar_script();
//=============================
document.currentScript.class =

{


  LOAD:
  {
    modo: 'vacio',
    canvas_id: 2,


    child: [

      {
        LOAD:
        {
          id: 14,
          canvas_id: 2,
          modo: 'sprite',
          animdata: GAME.crear_animdata({ master: { wt: 16, ht: 16, ll: 30 } },

            { ll: 30, flip: [1, 0], buf: [[0, 0], [0, 1], [0, 2], [0, 1]] },

            { ll: 10, flip: [1, 0], buf: [[2, 0], [2, 1], [2, 2], [2, 1]] },
            { ll: 10, flip: [0, 0], buf: [[1, 0], [1, 1], [1, 2], [1, 1]] },
            { ll: 10, flip: [0, 0], buf: [[2, 0], [2, 1], [2, 2], [2, 1]] },
            { ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1], [0, 2], [0, 1]] },



          ),
        },

      },



    ]


  },


  w: 16,
  h: 16,
  tile_des: { x: 0, y: 0 },

  draw_color: '',

  update_fondos() { },


  movecon:
  {
    _padre: '',
    run() {

    }

  },

  check_tile_ini(f_estado) {
    let _tilemaps = $gameges.tileges.tilemaps_all;
    let _xyc = this.get_c16();

    let _movedata =
    {
      1: {
        2: 1,
        1: 1,
        21: 1,
        xy: [-1, 0],
      },
      2: {
        11: 1,
        1: 1,
        3: 1,
        xy: [0, -1],
      },
      3: {
        2: 1,
        3: 1,
        23: 1,
        xy: [1, 0],
      },
      4: {
        11: 1,
        21: 1,
        23: 1,
        xy: [0, 1],
      }
    }
    let _m = _movedata[f_estado];

    if (_m[_tilemaps[1][_xyc.y + _m.xy[1]][_xyc.x + _m.xy[0]]] === 1) {
      this.estado = f_estado;
      this.tile_des.x += _m.xy[0];
      this.tile_des.y += _m.xy[1];

    }

  },

  //propagar
  propagar:
  {
    _padre: '',
    puntos: [], //[{x, y en tiles}      ]
    estado: 0,
    tt: [0, 20],
    run() {
      let _tilemaps = $gameges.tileges.tilemaps_all;

      if (this.estado) {
        this.tt[0]++;
        if (this.tt[0] > this.tt[1]) {

          this.tt[0] = 0;
          let _copy = this.puntos.slice();
          this.puntos = [];
          for (var u of _copy) {
            this.check_4(u.x, u.y);
          }
          $gameges.tileges.refresh.force();
          if (this.puntos.length == 0) {
            this.end();
          }

        }
      }

    },//run
    ini(_xt, _yt) {

      this.estado = 1;
      this.tt[0] = 0;
      this.puntos = [];
      this.puntos.push({ x: _xt, y: _yt })
    },//ini
    end() {
      this.estado = 0;
      this.tt[0] = 0;
      this.puntos = [];
    },
    //        centro, circundante
    //         / /      / /
    check_join(_x, _y, _xx, _yy) {
      let _tilemaps = $gameges.tileges.tilemaps_all;
      let _id = _tilemaps[1][_y][_x];
      let _id2 = _tilemaps[1][_yy][_xx];

      let _a = this.tiles_infolado[_id];
      let _b = this.tiles_infolado[_id2];
      if (_a == undefined || _b == undefined)
        return (0)

      if (_a[0] && _b[2] && _y == _yy && _x > _xx ||
        _a[1] && _b[3] && _x == _xx && _y > _yy ||
        _a[2] && _b[0] && _y == _yy && _x < _xx ||
        _a[3] && _b[1] && _x == _xx && _y < _yy) {
        return (1)
      }



      return (0);
    },
    tiles_infolado: //definicion de 'salidas' de tiles camino
    {
      0: [1, 1, 1, 1], 61: [1, 1, 1, 1],
      1: [0, 0, 1, 1], 5: [0, 0, 1, 1],
      2: [1, 0, 1, 0], 6: [1, 0, 1, 0],
      3: [1, 0, 0, 1], 7: [1, 0, 0, 1],

      11: [0, 1, 0, 1], 15: [0, 1, 0, 1],
      21: [0, 1, 1, 0], 25: [0, 1, 1, 0],
      23: [1, 1, 0, 0], 27: [1, 1, 0, 0],

      32: [1, 0, 1, 1], 36: [1, 0, 9, 1],
      41: [0, 1, 1, 1], 45: [0, 1, 1, 1],
      42: [1, 1, 1, 1], 46: [1, 1, 1, 1],
      43: [1, 1, 0, 1], 47: [1, 1, 0, 1],
      52: [1, 1, 1, 0], 56: [1, 1, 1, 0]

    },

    check_4(_xt, _yt) {
      let _tilemaps = $gameges.tileges.tilemaps_all;
      let _id_ini = _tilemaps[1][_yt][_xt];

      let _xy = [[-1, 0],
      [0, -1],
      [1, 0],
      [0, 1]
      ];

      for (var u of _xy) {
        let _x = _xt + u[0];
        let _y = _yt + u[1];
        if (_tilemaps[1][_y] == undefined || _tilemaps[1][_y][_x] == undefined)
          continue;

        let _id = _tilemaps[1][_y][_x];
        let _id_dig = number_to_arr_digitos(_id);
        if (_id_dig.length == 1)
          _id_dig.unshift(0);


        if (_id_dig[1] >= 5 && _id_dig[1] <= 7 &&
          _id_dig[0] >= 0 && _id_dig[0] <= 5 &&
          this.check_join(_xt, _yt, _x, _y)
        ) {

          _tilemaps[1][_y][_x] -= 4;
          this.puntos.push({ x: _x, y: _y })

        }

      }



    },


  },//propagar

  check_tile_nextmove() {
    let _tilemaps = $gameges.tileges.tilemaps_all;

    let _id = this.get_c16().id;

    let _movedata =
    {
      1: {
        2: [-1, 0, 1],
        21: [0, -1, 2],
        1: [0, 1, 4],
      },

      2: {
        11: [0, -1, 2],
        1: [1, 0, 3],
        3: [-1, 0, 1]
      },

      3:
      {
        2: [1, 0, 3], //x,y,estado
        23: [0, -1, 2],
        3: [0, 1, 4]
      },

      4:
      {
        11: [0, 1, 4], //x,y,estado
        21: [1, 0, 3],
        23: [-1, 0, 1],
      },



    }

    if (_movedata[this.estado][_id]) {
      this.tile_des.x += _movedata[this.estado][_id][0];
      this.tile_des.y += _movedata[this.estado][_id][1];

      this.estado = _movedata[this.estado][_id][2];

      return (1);
    }


    return (0);

  },

  get_c16() {
    let _x = fl((this.x + 8) / 16);
    let _y = fl((this.y + 8) / 16);
    let _id = $gameges.tileges.tilemaps_all[1][_y][_x];

    return ({
      x: _x,
      y: _y,
      id: _id
    })
  },


  loadframe() {
    this.movecon._padre = this;
    this.propagar._padre = this;

    this.update_fondos()


    this.anim = this.hijos_clip[0];

    this.estado = 0;
    this.xvelocity = 0;
    this.yvelocity = 0;
    this.tile_des = { x: fl(this.x / 16), y: fl(this.y / 16) };


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


    this.movecon.run();
    this.propagar.run();
    let _vel = 1.6;
    if (this.estado == 0)//quieto
    {
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


    //hacia izquierda
    if (this.x > this.tile_des.x * 16) {
      this.x -= _vel;
      if (this.x <= this.tile_des.x * 16) {
        this.x = this.tile_des.x * 16;
        if (this.check_tile_nextmove() == 0)
          this.estado = 0;
      }
    }
    //hacia arriba
    if (this.y > this.tile_des.y * 16) {
      this.y -= _vel;
      if (this.y <= this.tile_des.y * 16) {
        this.y = this.tile_des.y * 16;
        if (this.check_tile_nextmove() == 0)
          this.estado = 0;
      }
    }

    //hacia derecha
    if (this.x < this.tile_des.x * 16) {
      this.x += _vel;
      if (this.x >= this.tile_des.x * 16) {
        this.x = this.tile_des.x * 16;
        if (this.check_tile_nextmove() == 0)
          this.estado = 0;
      }
    }

    //hacia abajo
    if (this.y < this.tile_des.y * 16) {
      this.y += _vel;
      if (this.y >= this.tile_des.y * 16) {
        this.y = this.tile_des.y * 16;
        if (this.check_tile_nextmove() == 0)
          this.estado = 0;
      }
    }



    this.anim.animdata.set_anim(_estado_h);


    this.anim.x = 0;
    this.anim.y = 0;





    this.update_fondos();

  },

}

