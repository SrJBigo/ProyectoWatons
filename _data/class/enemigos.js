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

    child:
    {
      LOAD:
      {
        id: 7,
        canvas_id: 2,
        modo: 'sprite',
        animdata: GAME.crear_animdata({ master: { wt: 32, ht: 32, ll: 30 } },

          //0->9=oerro
          { ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },
          { ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },


        ),
      },

    },
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

  estado: 0,
  anim: '',

  //|hitcon
  hitcon:
  {
    _padre: '',
    hp: [10, 10],
    sound_id:0,

    on_hit(f_quien, f_data) {

      if (game.editor.estado == 1) return;

      AUDIO.play_sample($WIN.LIB.SOUNDS[this.sound_id],0);
      this.hp[0] -= f_data.damage;
      if (this.hp[0] <= 0) {
        this._padre.remove();
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
      w: 16,
      h: 16,
      offset: [-7, -16],
      hitcon: {
        hp: [12, 12],
        sound_id:0,
      },
      loadframe() {

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


      },


    }

  },


  on_remove() {
    console.log('perro ELIMINADO')
    game.remove_obj(this);
    let _mapdata = this.mapdata;

    if (this.hitcon.hp[0] > 0) {
      this.mapdata.in = 0;
      //$tileges.tilemaps_all[3][_mapdata.y][_mapdata.x]=_mapdata;  
    }



  },

  loadframe() {
    this.hitcon._padre = this;
    this.xprev = this.x;
    this.yprev = this.y;
    this.anim = this.hijos_clip[0];
    this.offset = this.modos[this.id].offset;
    this.w = this.modos[this.id].w;
    this.h = this.modos[this.id].h;

    this.hitcon = setloop_prop(this.hitcon, this.modos[this.id].hitcon);

    bindear_(this.modos[this.id].loadframe, this)();

  },

  enterframe() {

    let _level = $root.level;
    if (game.editor.estado == 0) {
      this.x = this.x + this.xvelocity;
      this.y = this.y + this.yvelocity;

      bindear_(this.modos[this.id].enterframe, this)();

    }

    let _estado_h = this.estado;
    this.anim.x = this.offset[0];
    this.anim.y = this.offset[1];
    this.anim.animdata.set_anim(_estado_h);

    this.xprev = this.x;
    this.yprev = this.y;


    if (this.x < _level.x * -1 - 32 || this.x > (_level.x * -1) + _level.w + 32 ||
      this.y < _level.y * -1 - 32 || this.y > (_level.y * -1) + _level.h + 32)
      this.remove();

  },
}

