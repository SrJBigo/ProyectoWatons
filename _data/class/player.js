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

      {//arma
        LOAD:
        {
          id: 8,
          canvas_id: 2,
          modo: 'sprite',
          animdata: GAME.crear_animdata({ master: { wt: 32, ht: 32, ll: 30 } },

            { ll: 30, flip: [1, 0], offset: [-10, -2], buf: [[0, 0, 16, 32]] },
            { ll: 30, flip: [0, 0], offset: [-16, -5], buf: [[0, 32, 32, 16]] },

            { ll: 30, flip: [0, 0], offset: [0, -2], buf: [[0, 0, 16, 32]] },
            { ll: 30, flip: [0, 1], offset: [-16, 10], buf: [[0, 32, 32, 16]] },

          ),
        },

      },


      {//cuerpo
        LOAD:
        {
          id: 2,
          canvas_id: 2,
          modo: 'sprite',
          animdata: GAME.crear_animdata({ master: { wt: 32, ht: 32, ll: 30 } },

            { ll: 30, flip: [1, 0], buf: [[0, 0], [0, 1]] },
            { ll: 30, flip: [0, 0], buf: [[0, 0], [0, 1]] },

            { ll: 10, flip: [1, 0], buf: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 2], [1, 1]] },
            { ll: 10, flip: [0, 0], buf: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 2], [1, 1]] },

            { ll: 10, flip: [1, 0], buf: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 2], [1, 1]] },
            { ll: 10, flip: [0, 0], buf: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 2], [1, 1]] },

            { ll: 20, flip: [1, 0], buf: [[0, 0], [0, 1]] },
            { ll: 20, flip: [0, 0], buf: [[0, 0], [0, 1]] },

          ),
        },

      },



    ]


  },


  w: 10,
  h: 25,

  draw_color: "",

  fondo_tt: [0, 25, 0],
  estado_arma: 0,
  orientacion: 1, //0,1 -> izquierda, derecha
  update_fondos() {
    this.fondo_tt[0]++;
    if (this.fondo_tt[0] > this.fondo_tt[1]) {
      this.fondo_tt[0] = 0;
      this.fondo_tt[2] += 1;
    }
    $gameges.fondoges.fondos[0].x = ($root.level.x / 7);
    $gameges.fondoges.fondos[0].y = ($root.level.y) - 10;
    $gameges.fondoges.fondos[1].x = ($root.level.x / 3) - this.fondo_tt[2];
    $gameges.fondoges.fondos[1].y = ($root.level.y) - 25;
    $gameges.fondoges.fondos[2].x = ($root.level.x / 3);
    $gameges.fondoges.fondos[2].y = ($root.level.y) - 25;


  },

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

      let _padre = this._padre;
      _enem.hitcon.on_hit(_padre, { damage: 6 })
      this.estado = 1;
      this.tt[0] = 0;
      this.tt[2] = 0;
      this.tt[4] = 0;

      if (game.center_compare(_padre, _enem).x) {
        _padre.xvelocity = 4;
        _padre.yvelocity = -4;
      }
      else {
        _padre.xvelocity = -4;
        _padre.yvelocity = -4;
      }

    },
    run() {
      let _padre = this._padre;

      if (this.estado == 1)//golpeado transparencia
      {
        //alpha
        //if(!_padre.anim.filter) _padre.anim.filter={};
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
          if (game.simple_hit_test(this._padre, u)) {
            this.hit(u);
            break;

          }

        }
      }

    },

  },//hitcon



  loadframe() {
    this.update_fondos()

    this.hitcon._padre = this;
    this.anim = this.hijos_clip[1];
    this.anim_arma = this.hijos_clip[0];

    if (this.estado == 0)
      this.estado_arma = 0;
    else
      this.estado_arma = 2;
    //|col
    this.col = {

      padre: this,
      apply() //efectos ante colision (detencion, etc)
      {
        let _u;
        let _p = this.padre;

        let _tiledata = $gameges.tileges.tiledata.col;
        let _tilemap_1 = $gameges.tileges.tilemap_1;

        for (var i in this.entes) {
          _u = this.entes[i];
          let _tiledata_u = _tiledata[_u.id];
          //arriba bajo


          if (_p.x + _p.w > _u.x && _p.x < _u.x + _u.w) {

            if (_tiledata_u[1] == 1 &&
              _tilemap_1[_u.y_simple - 1] != undefined && _tiledata[_tilemap_1[_u.y_simple - 1][_u.x_simple]] != '1,1,1,1' &&
              _p.yprevious + _p.h <= _u.y && _p.yvelocity > 0 && _p.y + _p.h > _u.y) //colision arriba tile
            {
              _p.y = _u.y - _p.h;
              _p.en_suelo_tt = 3;
              _p.yvelocity = 0;
            }

            if (_tiledata_u[3] == 1 &&
              _tilemap_1[_u.y_simple + 1] != undefined && _tiledata[_tilemap_1[_u.y_simple + 1][_u.x_simple]] != '1,1,1,1' &&
              _p.yprevious >= _u.y + _u.h && _p.yvelocity < 0 && _p.y < _u.y + _u.h) //colision abajo tile
            {
              _p.y = _u.y + _u.h;

              _p.yvelocity = 0.5;
            }
          }


          //izquieda derecha
          if (_p.y < _u.y + _u.h && _p.y + _p.h > _u.y) {
            if (_tiledata_u[0] == 1 &&
              _p.xprevious + _p.w <= _u.x && _p.xvelocity > 0 && _p.x + _p.w > _u.x) // colision izquierda tile
            {
              _p.x = _u.x - _p.w;
              _p.xvelocity = 0;
            }

            if (_tiledata_u[2] == 1 &&
              _p.xprevious >= _u.x + _u.w && _p.xvelocity < 0 && _p.x < _u.x + _u.w) // colosion derecha tile
            {
              _p.x = _u.x + _u.w;

              _p.xvelocity = 0;
            }


          }



        }



      },
      get() {
        this.entes = [];

        let _u;


        for (var i in this.pos) {
          _u = this.pos[i];


          let _y16 = Math.floor((this.padre.y + _u.y) / 16);
          let _x16 = Math.floor((this.padre.x + _u.x) / 16);

          if ($gameges.tileges.tilemap_1[_y16] != undefined && $gameges.tileges.tilemap_1[_y16][_x16] > 0) {

            let _ut = $gameges.tileges.tilemap_1[_y16][_x16];
            this.entes.push({
              id: _ut, x: _x16 * 16, y: _y16 * 16,
              x_simple: _x16, y_simple: _y16,
              w: 16, h: 16
            });

          }
        }
      },


      entes: [],

      pos: [
        { x: 0, y: 0 },
        { x: this.w / 2, y: 0 },
        { x: this.w, y: 0 },

        { x: 0, y: this.h / 2 },
        { x: this.w / 2, y: this.h / 2 },
        { x: this.w, y: this.h / 2 },

        { x: 0, y: this.h },
        { x: this.w / 2, y: this.h },
        { x: this.w, y: this.h },


      ],



    };

    this.estado = 1;
    this.salto_estado = 0;
    this.xvelocity = 0;
    this.yvelocity = 0;

    this.xprevious = 0;
    this.yprevious = 0;
    this.en_suelo_tt = 3;
    this.gravedad = 0.3;
    this.suelo_y = 0;//def enterframe

    this.movedata =
    {
      xvel_max: 2,
      xvel_impetu: 0.3,

      yvel_salto: 4,

    }

    this.polvo =
    {
      tt: 0,
      tt_max: 10,
      padre: this,
      reset() {
        this.tt = 0;
      },
      run() {

        this.tt++;

        if (this.tt > this.tt_max) {
          this.tt = 0;
          if (this.padre.en_suelo_tt >= 3) {
            if (this.padre.estado == 0 || this.padre.estado == 2) {
              $WIN.gameges.cargar_clase($root.level, 1, { x: this.padre.x + 7, y: this.padre.y + 16 });
            }
            if (this.padre.estado == 1 || this.padre.estado == 3) {
              $WIN.gameges.cargar_clase($root.level, 1, { x: this.padre.x - 5, y: this.padre.y + 18 });
            }
          }
        }

      }


    }




  },

  enterframe() {


    this.suelo_y = $gameges.tileges.yt_allmax * 16;

    this.x = this.x + this.xvelocity;
    this.y = this.y + this.yvelocity;

    this.en_suelo_tt--;

    //apliacion gravedad
    this.yvelocity += this.gravedad;

    //suelo

    this.col.get();
    this.col.apply();




    if (game.editor.estado && this.y + this.h > this.suelo_y) {

      this.y = this.suelo_y - this.h;
      this.yvelocity = 0;
      this.en_suelo_tt = 3;

    }

    if (game.editor.estado == 0 && this.y - 32 > this.suelo_y) {
      game.reiniciar();
    }

    if (this.en_suelo_tt > 0 && $WIN.teclado.get('z') == 1) {

      $WIN.teclado.get('z', 2)
      this.en_suelo_tt = 0;
      this.salto_estado = 1;
      this.yvelocity = (-this.movedata.yvel_salto);
      //AUDIO.play_sample($WIN.LIB.SOUNDS[0],5);
    }
    if (this.salto_estado == 1 && $WIN.teclado.get('z') == 0) {
      this.salto_estado = 2;
      if (this.yvelocity < 0) {
        this.yvelocity = this.yvelocity / 2;
      }
    }


    this.hitcon.run();

    if ($WIN.teclado.get('x', 2) == 1) {

      let _vel = 5.5;
      let _a = [{
        x: -5,
        y: 9,
        xvel: -_vel,
        yvel: 0,
        estado: 0,
      },
      {
        x: 0,
        y: 0,
        xvel: 0,
        yvel: -_vel,
        estado: 1,
      },
      {
        x: 5,
        y: 9,
        xvel: _vel,
        yvel: 0,
        estado: 2,
      },
      {
        x: 0,
        y: 10,
        xvel: 0,
        yvel: _vel,
        estado: 3,
      },

      ];

      let _e = _a[this.estado_arma];
      $WIN.gameges.cargar_clase($root.level, 4, {
        id: 'arrow',
        estado: _e.estado,
        x: this.x + _e.x,
        y: this.y + _e.y,
        xvelocity: _e.xvel,
        yvelocity: _e.yvel
      });
    }


    //angulo arma
    if ($WIN.teclado.get('izq'))
      this.estado_arma = 0;
    if ($WIN.teclado.get('der'))
      this.estado_arma = 2;
    if ($WIN.teclado.get('arr'))
      this.estado_arma = 1;
    if ($WIN.teclado.get('aba'))
      this.estado_arma = 3;

    if ($WIN.teclado.get('arr') == 0 && $WIN.teclado.get('aba') == 0) {
      let _a = this.orientacion;
      if (_a == 1) _a++;
      this.estado_arma = _a;

    }




    //workarround editor                      
    if ($WIN.teclado.get("lshift")) {
      if ($WIN.teclado.get("aba", 2) == 1)
        this.x -= 50;

      if ($WIN.teclado.get("arr", 2) == 1)
        this.x += 50;
    }

    if (this.estado == 0 || this.estado == 1) {
      this.orientacion = this.estado;

      this.polvo.tt = this.polvo.tt_max - 1;
      this.xvelocity += (0 - this.xvelocity) / 5;
      if ($WIN.teclado.get("izq"))
        this.estado = 2;
      if ($WIN.teclado.get("der"))
        this.estado = 3;
    }

    //caminar izquieda
    if (this.estado == 2) {
      this.orientacion = 0;
      this.polvo.run();
      this.xvelocity -= this.movedata.xvel_impetu;
      if (this.xvelocity < (-this.movedata.xvel_max)) {
        this.xvelocity = (-this.movedata.xvel_max);
      }
      if ($WIN.teclado.get("izq") == 0) {
        this.estado = 0;
      }
    }

    //caminar derecha
    if (this.estado == 3) {
      this.orientacion = 1;
      this.polvo.run();
      this.xvelocity += this.movedata.xvel_impetu;
      if (this.xvelocity > this.movedata.xvel_max) {
        this.xvelocity = this.movedata.xvel_max;
      }
      if ($WIN.teclado.get("der") == 0) {
        this.estado = 1;
      }
    }

    let estado_h = this.estado;

    if (this.yvelocity < 0) {
      if (this.estado == 0 || this.estado == 2) {
        estado_h = 6;
      }
      if (this.estado == 1 || this.estado == 3) {
        estado_h = 7;
      }
    }

    if (this.x < 0) {
      this.x = 0;
    }

    this.anim_arma.animdata.set_anim(this.estado_arma);

    this.anim.animdata.set_anim(estado_h);

    this.anim.x = -13;
    this.anim.y = -5;
    this.xprevious = this.x;
    this.yprevious = this.y;

    $root.level.x = (this.x * -1) - this.w / 2 + $root.w / 2;
    $root.level.y = (this.y * -1) - this.h / 2 + $root.h / 2;

    if ($root.level.x > 0) {
      $root.level.x = 0;
    }


    if ((-$root.level.x) + $gameges.tileges.xt_max * 16 > $gameges.tileges.xt_allmax * 16) {
      $root.level.x = -($gameges.tileges.xt_allmax * 16 - $gameges.tileges.xt_max * 16);
    }

    if ($root.level.y > 0) {
      $root.level.y = 0;
    }

    if ((-$root.level.y) + $gameges.tileges.yt_max * 16 > $gameges.tileges.yt_allmax * 16) {
      $root.level.y = -($gameges.tileges.yt_allmax * 16 - $gameges.tileges.yt_max * 16);
    }



    $gameges.tileges.x = $root.level.x * -1;
    $gameges.tileges.y = $root.level.y * -1;

    $gameges.fondoges.fondos[0].id = 0;



    this.update_fondos();

  },

}

