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
        id: 6,
        canvas_id: 2,
        modo: 'sprite',

        animdata: GAME.crear_animdata({ master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [1, 0], buf: [[0, 0]] },
          { ll: 5, flip: [0, 0], buf: [[0, 1]] },

          { ll: 5, flip: [0, 0], buf: [[0, 0]] },
          { ll: 5, flip: [0, 1], buf: [[0, 1]] },

        ),


      },

    },
  },

  /*LOAD:
  {
  id:6,
  modo:'sprite',
   
   animdata:  GAME.crear_animdata( {master:{wt:16, ht:16, ll:30} },
 
                                           {ll:5,  buf: [ [0,0]] },
                                           {ll:30, buf: [ [1,0],[1,1] ]},
                                           ),

  },*/
  draw_color: '',
  xvelocity: 0,
  yvelocity: 0,
  offset: [0, 0],
  w: 10,
  h: 10,
  id: 0,
  anim: '',

  estado: 0,
  draw_anim: 0,

  modos:
  {
    'arrow': {
      w: 0,
      h: 0,
      offset: [0, 0],
      loadframe() {
        let _jugador = $root.level.jugador;
        if (this.xvelocity !== 0) {
          this.w = 15;
          this.h = 5;
        }
        if (this.yvelocity !== 0) {
          this.w = 5;
          this.h = 15;
          if (this.yvelocity > 0 && _jugador.yvelocity > 0) {
            _jugador.yvelocity = 0.1;
          }

        }

      },
      enterframe() {
        let _plus =
          [
            { x: 0, y: 0 },
            { x: 0, y: 0 },
            { x: this.w, y: 0 },
            { x: 0, y: this.h },
          ];
        let _pact = _plus[this.estado];

        let _tilemap1 = $gameges.tileges.tilemaps[1];

        //hit enemigos
        for (var u of game.objs) {
          if (game.simple_hit_test(this, u)) {
            this.remove();

            if (u.hitcon !== undefined)
              u.hitcon.on_hit(this, { damage: 2 })

            break;
          }
        }
        _a:
        if (_tilemap1[fl((this.y + _pact.y) / 16)] &&
          _tilemap1[fl((this.y + _pact.y) / 16)][fl((this.x + _pact.x) / 16)] > 0) {
          let _tid = _tilemap1[fl((this.y + _pact.y) / 16)][fl((this.x + _pact.x) / 16)];
          let _tiledata = $gameges.tileges.tiledata.col;
          let _foo = this.estado;
          if (_foo == 0) { _foo = 2 }
          else if (_foo == 2) { _foo = 0 }
          else if (_foo == 1) { _foo = 3 }
          else if (_foo == 3) { _foo = 1 }

          if (_tiledata[_tid][_foo] == 0) {
            break _a;
          }


          if (this.estado == 0)
            this.x = fl(this.x / 16) * 16 + this.w;

          if (this.estado == 1)
            this.y = fl(this.y / 16) * 16 + this.h;

          if (this.estado == 2)
            this.x = fl((this.x + _pact.x) / 16) * 16 - this.w;

          if (this.estado == 3)
            this.y = fl((this.y + _pact.y) / 16) * 16 - this.h;


          //this.xvelocity=0;
          //this.yvelocity=0;

          $WIN.gameges.cargar_clase($root.level, 1, { x: this.x + _pact.x - 5, y: this.y + _pact.y - 5 });
          this.remove();
        }

      },


    }

  },

  loadframe() {
    this.anim = this.hijos_clip[0];
    this.offset = this.modos[this.id].offset;
    this.w = this.modos[this.id].w;
    this.h = this.modos[this.id].h;

    bindear_(this.modos[this.id].loadframe, this)();


  },

  enterframe() {
    let _level = $root.level;

    this.x = this.x + this.xvelocity;
    this.y = this.y + this.yvelocity;

    this.draw_anim = this.estado;

    bindear_(this.modos[this.id].enterframe, this)();

    if (this.x > $root.level.x * -1 + $root.level.w + 32 || this.x < $root.level.x * -1 - 32 ||
      this.y > $root.level.y * -1 + $root.level.h + 32 || this.y < $root.level.y * -1 - 32) {
      this.remove();
    }



    this.anim.x = this.offset[0];
    this.anim.y = this.offset[1];
    this.anim.animdata.set_anim(this.draw_anim);


  },


}

