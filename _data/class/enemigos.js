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
  visible_estados:[1,1],

  estado_h:0,
  estado: 0,
  anim: '',

  offscreen_dis: 32,

  visible_editor:1,

  stats:
  {
    hp:[10,10],
    pp:[10,10],
    atk:2,
    def:3,
  },

  //|_hitcon
  _hitcon:
  {
   _padre:'',
   estado:0,
   detectar:[1,1], //player, bullet

   _blinky:{
           _padre:'',
           estado:0,
           tt:[0,10],
           detectar_res:[0,0],
           ini()
           {
             this.estado=1;
             this.detectar_res[0] = this._padre.detectar[0];
             this.detectar_res[1] = this._padre.detectar[1];

             this._padre.detectar[0]=0;
             this._padre.detectar[1]=0;

           },
           run()
           {
             if(this.estado==1)
             {
              this.tt[0]++;

                if(this.tt[0]>this.tt[1])
                {
                this.estado=0;
                this.tt[0]=0;
                this._padre.detectar[0]=this.detectar_res[0];
                this._padre.detectar[1]=this.detectar_res[1];
                this.detectar_res[0]=0;
                this.detectar_res[0]=0;
                }
             }
           }
           },
   damage(f_damage=0)
   {
    let _hp = this._padre.stats.hp;
      _hp[0] += f_damage;
      if(_hp[0]> _hp[1]) _hp[0] = _hp[1];
      if(_hp[0]<=0) this.on_kill();


      return(_hp);
   },
   blinky()
   {
    this._blinky.ini();
   },

   floatext(f_texto="")
   {
      let _htext = game.textoges.crear($root.level, {x:this._padre.x,y:this._padre.y-5, texto: f_texto}, 'tr8x8')
          _htext.tt=[0,30];
          _htext.enterframe=()=>
               {
                _htext.tt[0]++;
                _htext.y-=0.5;

                if(_htext.tt[0]>_htext.tt[1])
                  _htext.remove();
               }
   },
   
    empujar(_xvel=0, _yvel=0)
    {
      this._padre.xvelocity += _xvel;
      this._padre.yvelocity += _yvel;
    },
     sound(f_id)
     {
      game.soundcon.play(f_id);
     },
     center_compare(f_clip)
     {
      if(f_clip._xvelocity<0) return({x:1});
      if(f_clip._xvelocity>0) return({x:0});

      return (game.center_compare({x:f_clip.xprev,w:f_clip.w,
                                   y:f_clip.yprev,h:f_clip.w},
                                   this._padre
                                   )
                                  );

     },

     //--------------
     on_hit(f_modo, f_data)//'bullet', 'player'
     {

     },
     
     on_kill()
     {
      let _mapdata = this._padre.mapdata;
      $gameges.tileges.tilemaps_all[3][_mapdata.y][_mapdata.x]=0;

      let foo = ['hp','pp','exp','exp','exp','exp','exp'];
      for(var i=0;i<5;i++)
      {
      game.misc.crear_rebotinero(
                  {x:this._padre.x,
                   y:this._padre.y,
                   modo:random_from_array(foo),
                  }
                  );
      }

      this._padre.remove();
     },
     //------------------

     run()
     {
       if(this.estado && game.editor.estado==0)
       {
         this._blinky.run();
         
         if(this.detectar[0])//jugador
         {
            if($jugador._hitcon.estado==1 && $jugador._hitcon?.detectar[0] && game.simple_hit_test(this._padre, $jugador) )
            {
               this.on_hit('player', {atk:$perfil.atk, clip:$jugador});
               $jugador._hitcon.on_hit('enem', {atk:this._padre.stats.atk, clip:this._padre})
            }
         }

       }
     
     },

  },//_hitcon


  //|hitcon
  hitcon:
  {
    _padre: '',
    
    estado:0, // 0=inactivo; 1 = activo

    rebotar:1,
    hp: '',
    damage:2,
    sound_id:-1,
    id_efecto_d:-1,
    
    b_estado:0, //blink_estado
    blink_tt:[0,2],

    texto_flotante:'DAMAGE',

    on_kill(f_data){ },
    
    _on_hit(){ },
                            //player, bullet
    on_hit(f_quien, f_data, f_modo) {

      if (game.editor.estado == 1) return;

      this.b_estado=1;

      if(this.sound_id>=0)
      game.soundcon.play(this.sound_id);


      if(this.texto_flotante=='DAMAGE')
        this.texto_flotante="";
      let _htext = game.textoges.crear($root.level, {x:this._padre.x,y:this._padre.y-5, texto: '-'+f_data.damage}, 'tr8x8')
          _htext.tt=[0,30];
          _htext.enterframe=()=>
               {
                _htext.tt[0]++;
                if(_htext.tt[0]>_htext.tt[1])
                  _htext.remove();
                _htext.y-=0.5;
               }


       this._on_hit(f_quien, f_data, f_modo);

        if(this.hp!=='')
        {
          this.hp[0] -= f_data.damage;
          if (this.hp[0] <= 0) 
          {
          //efecto destruccion
          if(this.id_efecto_d>=0)
          $WIN.gameges.cargar_clase($root.level, 1, {anim_id:this.id_efecto_d, x: this._padre.x, y: this._padre.y});
          this.on_kill(f_data);
          this._padre.remove();
          }
        }  
    },
    run()
    {
       if(this.estado==1 && this.b_estado==1)
       {
        this._padre.anim.visible=false;
        this.blink_tt[0]++;
        if(this.blink_tt[0]>this.blink_tt[1])
        {
          this._padre.anim.visible=true;
          this.blink_tt[0]=0;
          this.b_estado=0;
        }
       }

    },

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

          { wt:32,  ht:32, ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { wt:32,  ht:32, ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },

          { wt:32,  ht:32, ll: 10, flip: [0, 0], buf: [[0, 0], [0, 1]] },
          { wt:32,  ht:32, ll: 10, flip: [1, 0], buf: [[0, 0], [0, 1]] },

          { wt:32,  ht:32, ll: 10, flip: [0, 0], buf: [[0, 2] ] },
          { wt:32,  ht:32, ll: 10, flip: [1, 0], buf: [[0, 2] ] },
        
            ],


      w: 16,
      h: 16,

      offset: [-7, -16],
      
      stats:
      {
      atk:3,
      },
      _hitcon:{
        estado:1,
        detectar:[1,1],
       on_hit(f_modo, f_data)//'bullet', 'player'
       {

          let _n = -f_data.atk;
          //this.floatext(_n);
          this.blinky();
          this.damage(_n);
          this.sound(0);
          

          if (this.center_compare(f_data.clip).x) 
            {
            this._padre.estado=3;      
            }
          else
          {
            
            this._padre.estado=2;
          }
            


           this._padre.xvelocity = (f_data.clip._xvelocity ? f_data.clip._xvelocity : f_data.clip.xvelocity)/4;
           this._padre.yvelocity = (f_data.clip._yvelocity ? f_data.clip._yvelocity : f_data.clip.yvelocity)/5;
          
          

       },

      },


      loadframe() {
        //console.log(this.anim.animdata.animations);
      
        this.estado   = this.direccion + 2;
        this.estado_h = this.estado;

      },
      enterframe() {
        let _col = col_check($enterload); //[n,n,n,n] relativo a tile
           

        if (this.estado == 2) {
          this.xvelocity -= 0.1;
           if(this.xvelocity<-0.5)
              this.xvelocity=-0.5;

          if (_col[2])
            this.estado = 3;
        }
        if (this.estado == 3) {
         this.xvelocity += 0.1;
           if(this.xvelocity>0.5)
              this.xvelocity=0.5;


          if (_col[0])
            this.estado = 2;
        }

        this.yvelocity += 0.2;
        if (this.yvelocity > 3.5)
          this.yvelocity = 3.5;

        this.estado_h = this.estado;
        if(this._hitcon._blinky.estado)
        {
          this.estado_h +=2;
        }


      },

    },//perro

   'perro_2': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { wt:16,  ht:32, ll: 5, flip: [0, 0], buf: [[2, 0] ] },
          { wt:16,  ht:32, ll: 3, loop:1, flip: [0, 0], buf: [[2, 1],[2, 2] ] },
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
      
      j_yvel:-7,
      tt:[0,10],

      stats:
      {
        atk:3,
      },

        _hitcon:{
        estado:1,
        detectar:[1,1],
       on_hit(f_modo, f_data)//'bullet', 'player'
       {
          let _n = -f_data.atk;
          this.floatext(_n);
          this.blinky();
          this.damage(_n);
          this.sound(0);

           this._padre.xvelocity = (f_data.clip._xvelocity ? f_data.clip._xvelocity : f_data.clip.xvelocity)/10;
           this._padre.yvelocity = (f_data.clip._yvelocity ? f_data.clip._yvelocity : f_data.clip.yvelocity)/5;

          

       },

      },



      loadframe() {

        this.estado=this.direccion;
        this.estado_h = this.estado;

      },
      enterframe() {
        let _col = col_check($enterload); //[n,n,n,n] relativo a tile

         this.xvelocity+= (0-this.xvelocity)/10;

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


   'hormiga': {
    animdata:[
          { master: { wt: 32, ht: 32, ll: 30 } },

          { ll: 5, flip: [1, 0], buf: [[3, 0] ] },
          
            ],

      autoflip:1, //horientacion x a jugador
      w: 32,
      h: 32,
      offset: [0, 0],
      
      
      loadframe() {
       this.estado_h=0;
      },
      enterframe() {
        let _col = col_check($enterload); //[n,n,n,n] relativo a tile
         this.yvelocity+=0.01;

        this.estado_h = 0;

      },

    },//hormiga




   'completo': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [1, 0], buf: [[0, 10] ] },
          
            ],

      w: 16,
      h: 16,
      offset: [0, 0],
      
      
      loadframe() {
        console.log('load completo')
       this.estado_h=0;

      },
      enterframe() {
        let _col = col_check($enterload); //[n,n,n,n] relativo a tile
         this.yvelocity+=0.01;

        this.estado_h = 0;

      },

    },//completo

   'w_mapoint': {
    visible_estados:[0,1],
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [0, 0], buf: [[0, 11] ] },
          
            ],

      w: 16,
      h: 16,
      offset: [0, 0],
      
      
      loadframe() {

       this.estado_h=0;

      },
      enterframe() {
        let _col = col_check($enterload); //[n,n,n,n] relativo a tile
         

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
      _hitcon:
      {
       estado:1,
       detectar:[0,0],
       on_hit()
       {
       }
      } ,     
      
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
        this.anim.wn = this.anim.image.naturalWidth;
        this.anim.hn = this.anim.image.naturalHeight;
        
        this.draw_color=''; 
        this.estado_h=0;
        this.estado=2;


        this.x_ini = this.x;
        this.y_ini = this.y;

        if(this.overdialogos.length>0)
        {
        this.dialogo_con.overdialogo_con.textos = this.overdialogos;
        this.dialogo_con.overdialogo_con.ini();  
        }
        

      },

      dialogo_con:
      {
      overdialogo_con:
      {
       tt:[0,100,100],
       estado:0,
       texto:'',
       textos:[],
       ini()
       {
        this.texto = game.textoges.crear($enterload.anim, {x:0,y:0-25, texto: 'Insuficiente!', canvas_id:1, max_char:20},'tr8x8')
        this.texto.visible=false;

        this.texto.image.onload= ()=>
        {
         this.estado=1;
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
              //this.texto.x= -(this.texto.image.width/2)+4;  
              this.texto.x= -(this.texto.w/2)+4;  
              this.texto.y= -16-this.texto.h;  
              }
              this.texto.set_text( random_from_array(this.textos) );

              
            }
            else
              this.texto.visible=false;

          }
         }
         else
          this.texto.visible=false;


         },
       },//overdialogo

          on_chat()
          {
           this.overdialogo_con.estado=0;
          },
          on_chat_end()
          {
            if(this.overdialogo_con.textos.length>0)
            {
            this.overdialogo_con.estado=1;  
            this.overdialogo_con.tt[0]=0;
            }
          
          },

          run()
          {
            this.overdialogo_con.run();
          }

      },//dialogo

      enterframe() {

        let _col = col_check($enterload,1); //[n,n,n,n] relativo a tile
         
         
         this.dialogo_con.run();

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
      visible_estados:[0,1],
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [0, 0], buf: [[1, 11] ] },
          
            ],
      w: 16,
      h: 16,
      offset: [0, 0],
      _hitcon:{
       estado:0,
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
      _z:-1,

      w: 16,
      h: 16,
      offset: [0, -16],
      visible_estados:[1,1],
      
      loadframe() {

       this.estado_h=0;
       if(this.visible!==undefined)
        this.visible_estados[0]=this.visible;


      },
      enterframe() {
        let _col = col_check($enterload); //[n,n,n,n] relativo a tile
         

        this.estado_h = 0;

      },

    },//puerta

    'scroll_point': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [0, 0], buf: [ [2, 11] ] },
          
            ],

      w: 16,
      h: 16,
      visible_estados:[0,1],
      offset: [0, 0],
      
      
      loadframe() {

       this.estado_h=0;

      },
      enterframe() { 

        this.estado_h = 0;

      },

    },//scroll_point

    'end_point': {
    animdata:[
          { master: { wt: 16, ht: 16, ll: 30 } },

          { ll: 5, flip: [0, 0], buf: [ [3, 11] ] },
          
            ],

      w: 16,
      h: 16,
      visible_estados:[0,1],
      offset: [0, 0],
      
      
      loadframe() {

       this.estado_h=0;

      },
      enterframe() { 

        this.estado_h = 0;

      },

    },//end_point




  },


  on_remove() {
    game.remove_obj(this);



  },


  //|load
  loadframe() {

     //_class.animdata = _class.LOAD.animdata;
 
    this.hitcon._padre = this;
    this._hitcon._padre = this;
    this._hitcon._blinky._padre = this._hitcon;

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


    if(game.editor.estado==1)
    {
      this.draw_color='rgba(0, 0, 255, 0.3)';
      
    }
    else
    {
      this.draw_color='';
    }
    this.visible=this.visible_estados[game.editor.estado];
    this.anim.visible=this.visible_estados[game.editor.estado];
    

   this._hitcon.run();
   

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

