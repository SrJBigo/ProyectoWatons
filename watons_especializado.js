//funciones auxiliares demasiado prolongadas como para ponerlas en el archivo principal [watons.php]

//'trasplantado' desde proyecto 'adventure'
//recorrer en su totalidad un array
function _loop_in_array(f_arr, f_func = undefined) {

  function _rec(_arr, _inobj = 0) {
    for (var i = 0; i < _arr.length; i++) {
      let u = _arr[i];
      let _type = get_type(u);

      if (_type !== 'array' && _type !== 'object') 
        f_func(u, i, _arr, _inobj);
      
      if (_type == 'array') 
        _rec(u);
      

      if (_type == 'object') {

        _rec(Object.keys(u), u);
        _rec(Object.values(u));
      }

    }

  }

  _rec(f_arr);


  return (f_arr);


}



var RPG =
{

  crear_dialogo(f_donde, f_data) {
    let _data = setloop_prop({
      fuente:
      {
        w: [8, 8],
        h: [8, 8],
      },
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      teclado: '',

      style: { background: 'black', borderTop: '2px solid gray' }

    }, f_data)


    let _dialogo = {

      fuente: _data.fuente,
      odiv: '',
      canvas: '',
      buf: '',
      teclado: _data.teclado,


      write:
      {
        _padre: "",

        estado: 0,


        texto: [''],
        texto_copy: "",
        line: "", //linea local  [temporal]
        keys: "", //keys locales [temporal] usadas en estado == 2

        prev: [0, 0], //arr, index (empleado al actualizar line)

        act: [0, 0, 0], //linea, caracter, misc(seleccion_opciones, etc..)
        x: 0,
        y: 0,


        tt: [0, 0],

        ini_speed: [4,0], //al iniciart write
        master_speed: [4, 0], //velocidad master
        speed: [4, 0], //velocidad linea


        reset_speed() {
          this.speed = [this.master_speed[0], this.master_speed[1]]
        },
        yplus: 0,

        margen: [5, 5, 10, 0, 3], //x y x y    entrelineay

        ymax: 4,

        tags: {},

        clips: [],
        clip: "",//clip contenedor dialogo (creado en $root)

        //clips a desbloquear al finalizar dialogo
        set(f_text, f_clips = []) {

          this._padre.clip = $gameges.crear_vacio($root, 2, { nombre: "dialogo", x: 0, y: $root.h - 50, w: $root.w, h: 50, draw_color: "black", });
          $gameges.crear_imagen(this._padre.clip, this._padre.canvas.obj, 2, { nombre: "canvas", x: 0, y: 5, enterframe() { } });


          this.estado = 1;
          //this.estado=f_estado;


          //this._padre.odiv.show();

          this.texto = clone_array(f_text, 1);
          this.texto_copy = clone_array(f_text, 1);
          this.line = "";
          this.keys = "";
          this.prev.fill(0);
          this.clips = f_clips;

          this.act.fill(0);

          this.x = 0;
          this.y = 0;
          this.yplus = 0;

          //identificar tags
          _loop_in_array(this.texto, (_texto, _i, _arr, _dialogo = 0) => {

            for (var i = 0; i < _texto.length; i++) {

              let _c = _texto.charAt(i);

              if (_c == "{") {


                let _json = find_json_from_string(_texto, i);


                for (var j in _json.json) {
                  let u = _json.json[j];
                  if (j == 'id') {
                    let __arr = _arr;
                    if (_dialogo)
                      __arr = _dialogo;
                    this.tags[u] = {
                      arr: __arr,
                      act: [_i, i],

                    };

                    //  this.tags[u]={arr: clone_array(_arr) , act: [_i,i]};
                  }

                }
              }

            }


          }, 1, 0)

          //console.log(this.tags)


        },



        on_end() {
          //this._padre.odiv.hide()
          this.estado = 0;
          this._padre.canvas.clear();
          this._padre.buf.clear();

          this._padre.clip.remove();
          this._padre.clip = '';

          for (var u of this.clips)
            u.on_dialogo_end();

        },
        run() {

          let _canvas = this._padre.canvas;
          let _bcanvas = this._padre.buf;
          let _teclado = this._padre.teclado;
          let _fuente = this._padre.fuente;
          let _margen = this.margen;
          let _z = _teclado.get('z', 2);
          if(this.force_z)
          {
            console.log('dada')
             _z=1;
          }
           


          //actualizacion automatica de this.line
          if (this.texto !== this.prev[0] || this.act[0] !== this.prev[1]) {
            this.prev[0] = this.texto;
            this.prev[1] = this.act[0];
            this.line = this.texto[this.act[0]];
            if (get_type(this.line) == 'object') {
              this.keys = Object.keys(this.line);
            }
          }




          let _s = _z; if (_z == 2) _s = 1; this.tt[1] = this.speed[_s];


          if (this.estado == 'scroll_top') {
            let _end = -(_margen[4] * this.y + (this.y + 1) * _fuente.w[1]);

            this.yplus += (_end - this.yplus) / 10;

            if (this.yplus < _end + 1) {
              _bcanvas.clear()

              this.yplus = 0;
              this.x = 0;
              this.y = 0;
              this.act[1] = 0;

              let _texto = this.texto[this.act[0]];
              if (get_type(_texto) == 'string')
                this.estado = 1;

              if (get_type(_texto) == 'object')
                this.estado = 2;

            }

          }

          else if (this.estado == 'wait_act') {
            if (_z == 1) {
              this.force_z=0;

              this.reset_speed();

              if (this.act[0] < this.texto.length - 1) {

                this.estado = 'scroll_top';
                this.act[0]++;

              }
              else //fin dialogos
              {

                this.on_end();


              }
            }

          }

          //escritura normal
          else if (this.estado == 1) {

            this.tt[0]++;

            block_tt:
            if (this.tt[0] > this.tt[1]) {
              this.tt[0] = 0;

              if (this.act[1] >= this.line.length)
                this.estado = 'wait_act';


              else {

                let _c = this.line.charAt(this.act[1]);

                //|json
                block_c:
                if (_c == "{") {

                  let _json = find_json_from_string(this.line, this.act[1]);

                  for (var i in _json.json) {
                    let u = _json.json[i];
                    if (i == 'id') {
                    }

                    if (i == 'goto') {
                      this.texto = this.tags[u].arr;

                      console.log(this.tags)
                      this.act[0] = this.tags[u].act[0];
                      this.act[1] = this.tags[u].act[1];
                      this.x = 0;
                      this.y = 0;
                      if (get_type(this.tags[u].arr) == 'object') {
                        this.texto = [this.texto];
                        this.estado = 2;

                        this.reset_speed();
                      }

                      break block_tt;

                    }
                    if (i == 'speed') {
                      this.speed = u;
                    }

                    if (i == 'm_speed') {
                      this.master_speed = u;
                      this.speed=this.master_speed;
                    }

                    if (i == 'script') {
                      eval(u);
                    }

                    if (i == 'next') {
                      this.force_z=1;
                      
                    }

                  }

                  this.line = this.line.slice(0, _json.a) + this.line.slice(_json.b + 1);

                  _c = this.line.charAt(this.act[1]);


                }//json


                //quebrar linea 
                if (this.act[1] > 0 && this.line.charAt(this.act[1] - 1) === " ") {
                  for (var i = this.act[1]; i <= this.line.length; i++) {
                    if (this.line.charAt(i) == " " || i == this.line.length) {
                      let _len = i - this.act[1];
                      if ((_margen[0] + (this.x + _len) * 8) * 2 > this._padre.odiv.wr - _margen[2] * 2) {
                        this.x = 0;
                        this.y++;
                      }

                      break;
                    }
                  }
                }

                draw_letra({
                  canvas: this._padre.buf, img: _fuente.img,
                  char: _c,
                  x: this.x * 8,
                  y: this.y * 8 + _margen[4] * this.y,
                  w: _fuente.w,
                  h: _fuente.h,
                })
                this.x++;

                this.act[1]++;

              }

            }


          }//estado==1

          //multiples opciones
          else if (this.estado == 2) {

            if (_teclado.get('aba', 2) == 1) {
              if (this.act[2] < Object.keys(this.line).length - 1)
                this.act[2]++;
            }
            if (_teclado.get('arr', 2) == 1) {
              if (this.act[2] > 0)
                this.act[2]--;
            }

            this.x = 0;
            this.y = 0;
            _bcanvas.clear()
            if (this.scroll_x == undefined)
              this.scroll_x = 0;

            let _yend = 0;
            if (this.act[2] >= this.ymax - 1) {
              let _n = (this.ymax - (this.act[2] + 1));
              _yend = _n * _fuente.h[1] + _margen[4] * _n;

            }
            this.yplus += (_yend - this.yplus) / 5;

            for (var i = 0; i < Object.keys(this.line).length; i++) {
              let _granword = (this.keys[i].length * 8 > this._padre.odiv.wr / 2);

              this.x = 0;
              let _scroll_x = 0;
              if (this.act2_prev !== this.act[2]) {
                this.scroll_x = 0;
              }

              if (this.y == this.act[2]) {
                if (_granword) {
                  if (this.keys[i].length * 8 + this.scroll_x + _margen[0] + _margen[2] > this._padre.odiv.wr / 2)
                    this.scroll_x -= 0.5;


                }
                else
                  this.scroll_x += (5 - this.scroll_x) / 5;

                _scroll_x = this.scroll_x;


              }

              //this.keys (variables temporales) definidas al inicio de run     
              for (var u = 0; u < this.keys[i].length; u++) {
                let _c = this.keys[i].charAt(u);

                if (_c == "{") {
                  let _json = find_json_from_string(this.keys[i], u);

                  this.keys[i] = this.keys[i].slice(0, _json.a) + this.keys[i].slice(_json.b + 1);

                }

                draw_letra({
                  canvas: this._padre.buf, img: _fuente.img,
                  char: _c,
                  x: this.x * 8 + _scroll_x,
                  y: this.y * 8 + _margen[4] * this.y,
                  w: _fuente.w,
                  h: _fuente.h,
                })
                this.x++;
              }
              this.y++;
              this.act2_prev = this.act[2];

            }

            if (_z == 1) {
              
              this.estado = "scroll_top";
              this.y = Object.keys(this.line).length - 1;

              let _key = (Object.keys(this.line)[this.act[2]]);
              let _value = this.line[_key];

              this.texto = _value;
              delete this.line[_key];



              this.act[0] = 0;
              this.act[1] = 0;
              this.act[2] = 0;
            }

          }


          if ((this.estado == 1 || this.estado == "wait_act") && this.y >= this.ymax)//scroll gradual en nuevalinea
          {
            let _len = this.ymax - this.y + 1;

            let _end = -((this.y - (this.ymax - 1)) * 8 + _margen[4]) * _len;


            this.yplus += (_end - this.yplus) / 10;

            if (this.yplus < _end + 0.3) {
              this.y--;
              this.yplus = 0;
              let _bctx = this._padre.buf.ctx;
              _bctx.globalCompositeOperation = "copy";
              _bctx.drawImage(this._padre.buf.obj, 0, -_fuente.w[1] - _margen[4])
              _bctx.globalCompositeOperation = "source-over";

            }


          }

          _canvas.clear();
          _canvas.ctx.drawImage(this._padre.buf.obj, _margen[0], this.yplus)


        },//run
      },//write

      //|ini dialogo
      ini() {

        this.odiv = crear_odiv(f_donde, _data.x, _data.y, [0, 0], _data.h, _data.style);
        this.canvas = crear_canvas(this.odiv, 2, 0, 0, [0, 0], [5, 0], { background: 'transparent' })

        this.canvas.remove();
        this.odiv.remove();
        //this.odiv.hide();                    

        this.buf = this.canvas.crear_buffer();
        this.teclado.add_keydown(this.keydown)

        //  $gameges.crear_vacio($root, {x:0,y:0, w:$root.nivel.w,h:50, draw_color:"white", visible:false});


      },
      run() {
        if (this.write.estado !== 0)
          this.write.run();

      },

      keydown(e) {
      },

    }
    padrear(_dialogo);
    _dialogo.ini();



    return (_dialogo);

  },



}//RPG

