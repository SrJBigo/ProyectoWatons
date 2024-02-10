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


  //|itemcon
  itemcon:
  {
    estado:0,
    points:[],
    items_macro:
    {
     "Bom y Bom":
       {
         name:'',
         id:0,
         remove_on_use:1,
         descripcion:'Un bombon de chocolate que aumenta 5HP',
         usar()
         {
             _clip.itemcon.close();


         },

       },//bom y bom
       "Nota de las acciones":
       {
         name:'',
         id:1,
         descripcion:'En este popular libro encontraras tus poderes actuales',
         usar()
         {

           //$root.contenedor.draw_color='gray';
           for(var u of _clip.itemcon.items)
            u.clip.visible=false;

          
              let _book = (WIN.gameges.crear_vacio($root.contenedor, 2,
                 {
                   w: game.wcanvas-16,
                   h: game.hcanvas-16-16,
                   x: 8,
                   y: 8,
                   draw_color: 'rgba(0,0,0,0.4)',
                   nombre:'page'
              }));

              _clip.itemcon.textos.inventario.visible=false;

              game.textoges.crear(_book, {x:60, y:10, _onload(){}, texto:"Ataques de Mundano:"},'tr8x8');
              game.textoges.crear(_book, {x:10, y:20, texto:"Recuperacion"},'tr8x8');
              


          
            //_clip.itemcon.textos.inventario._onload =()=>{}

           //game.fadecon.set('oscurecer',   ()=>{});

         },

       },//nota de las acciones


       "Chocboy":
       {
         name:'',
         id:2,
         descripcion:'Este bizcocho de chocolate aumenta 10PP',
         usar()
         {
         },

       },//chocboy
       
       "Papa George":
       {
         name:'',
         id:3,
         descripcion:'Aumenta 20HP',
         usar()
         {
         },

       },//Papa George

      
    },//items_macro

    add_item(f_nombre)
    {
        let _item = {...clone_object(this.items_macro[f_nombre]),
                    ...{
                       name:f_nombre,
                       p:0,
                       }
                    };

        this.items.push(_item);
    },
    items:[
           
           ],
    act_id:0,
    tt:[0,5,0],
    move_dir:1,
    move_tt:[0,10],
    textos:{},
    ini()
    {
      this.add_item('Nota de las acciones');
      this.add_item('Bom y Bom');
      this.add_item('Bom y Bom');
      this.add_item('Bom y Bom');

    },
    close()
    {
     this.estado=0;
     this.move_dir=1;
     this.points=[];
     this.textos.nombre.remove();
     this.contenedor.remove();

     _clip.modos.set('normal');
     for(var u of this.items)
     {
      u.clip.remove();
     }

    },
    open()
    {
      this.move_tt[0]=0;
      this.estado=1;
      _clip.modos.set('freeze');
      this.contenedor = (WIN.gameges.crear_vacio($root, 2,
                 {
                   w: game.wcanvas,
                   h: game.hcanvas-16,
                   x: 0,
                   y: 0,
                   draw_color: 'rgba(0,0,0,0.4)',
                   nombre:'contenedor'
                }));
      this.textos.inventario = game.textoges.crear($root.contenedor, {x:60, y:10, texto:"Inventario"},'tnb10x18');

      this.textos.nombre= game.textoges.crear($root.contenedor, {x:game.wcanvas/2, y:game.hcanvas/2, texto:"Chocboy"},'tnb10x18');
      this.textos.nombre.visible=false;

      
      this.foo = function(x,y, _c='blue', w=2,h=2)
      {
      
           return (WIN.gameges.crear_vacio($root, 2,
                 {
                   w: w,
                   h: h,
                   x: x,
                   y: y,
                   draw_color: _c,
                }));

      }


         //array 0->1
         let _v = [[1,0,-1, 0,   1],
                   [0,1, 0,-1,   0]];
         let n = 0.1;
         let _end = [[],[]];
          for(var i =0;i<4;i++)
          {
             let  a = _v[0][i];
             let _a = _v[0][i+1];

             let  b = _v[1][i];
             let _b = _v[1][i+1];

             while(a!=="infinito")
             {
             if(a<_a){a+=n;if(a>=_a){a=_a; break;} }
             if(a>_a){a-=n;if(a<=_a){a=_a; break;} }
               _end[0].push(a);
             }
             while(b!=="infinito")
             {
             if(b<_b){b+=n;if(b>=_b){b=_b; break;} }
             if(b>_b){b-=n;if(b<=_b){b=_b; break;} }
             _end[1].push(b);
             }
             
          }  

          let x = 120;
          let y = 55;
          for(var i=0;i<_end[0].length;i++)
          {
             x += _end[0][i]*20;
             y += _end[1][i]*2;
             let _p = this.foo(x,y,'');
                 _p.id=this.points.length;
             this.points.push(_p);
          }
         

         for(var i =0;i<this.items.length;i++)
         {
          let _d = (this.points.length/this.items.length);

          let _i =  _d*i;

          let _p = this.points[rd(_i) ];


          let _id = this.items[i].id;
           let _clip =
            WIN.gameges.crear_sprite($root.contenedor, 29, 2, 
              {animdata: GAME.crear_animdata(     
             
           { master: { wt: 32, ht: 32, ll: 30 } },
           { ll: 15, flip: [0, 0], offset: [0, 0], buf: [[_id, 0],[_id, 1],[_id, 2],[_id, 3],[_id, 4],[_id, 5],[_id, 6],[_id, 7]]  },
           { ll: 20, flip: [0, 0], offset: [0, 0], loop:1, buf: [[_id, 8],[_id, 9],[_id, 10],[_id, 11] ]  },
          
             
                )  });
            _clip.animdata.set_anim(0);

            this.items[i].items_i = i;
            this.items[i].clip=_clip;
            this.items[i].point = _p;
            this.items[i].i = rd(_i) ;
         } 
         
         this.act = this.foo(0,0,'black');


        while(this.items[this.act_id].point.id!==30)
        {
        this.rotate(-1);
        }


  
    },

    rotate(_dir)
    {
     for(var u of this.items)
     {
        let _i = u.i;
        if(_dir==-1)
        {
          _i =u.i+1;
            if(_i>this.points.length-1)
            _i=0;
         }
        if(_dir==1)
        {
          _i =u.i-1;
            if(_i<0)
            _i=this.points.length-1;
         }
         

         let p = this.points[_i];
         u.clip.x= p.x;
         u.clip.y= p.y;
         u.point = p;
         //u.clip.h= 26-((((game.hcanvas)/2)-p.y)/3);
         u.clip._h= fl(35-((((game.hcanvas+40)/2)-p.y)/5));
         u.clip._w= u.clip._h;
         u.clip.y-= fl(u.clip._h/2);
         u.clip.x-= fl(u.clip._w/2);
         u.clip.animdata.pause=1;
         u.clip.animdata.act[1]=0;

         u.i = _i;
     }

       $root.contenedor.hijos_clip.sort(function(a,b){
                                       
                                         if(a.y==undefined)
                                           a.y=0;
                                         
                                         if(b.y==undefined)
                                           b.y=0;
                                         
                                          if(a.y<b.y)
                                            return(-1)
                                          
                                          if(a.y>b.y)
                                            return(1)
                                          
                                          return(0)
                    })
                    

    },

    move_item(_n)
    {
      game.soundcon.play(15,1);
      this.move_dir=_n;
      this.act_id+= _n;
      if(this.act_id<0)
        this.act_id=this.items.length-1;

      else if(this.act_id>this.items.length-1)
               this.act_id=0;

    },

    run()
    {
     

     if($WIN.teclado.get('c',2)==1 && this.estado!==3)//3=usando objeto
     {   if(this.estado==0)
         {
         _clip.itemcon.open();
         }           

         else
         {
         _clip.itemcon.close();
         }          

      }
      let _item;
       let _iclip;
      if(this.estado>0)
      {
       _item = this.items[this.act_id];
       _iclip = _item.clip;
      }


     if(this.estado==1)
     {
      
         //item principal centrado
         if(this.items[this.act_id].point.id==18)
         {

          this.items[this.act_id].clip.animdata.pause=0;

          if(this.move_tt[0]==0)
          {

            this.textos.nombre.set_text(this.items[this.act_id].name)
            this.textos.nombre._onload=()=>
                          {
                         this.textos.nombre.visible=true;
                         this.textos.nombre.x= game.wcanvas/2-this.textos.nombre.w/2;
                          }
          }
          this.move_tt[0]++;
         if(this.move_tt[0]>=this.move_tt[1])
         { 
           if($WIN.teclado.get('izq'))
           {
             this.move_tt[0]=0;
             this.move_item(1);
           }
           if($WIN.teclado.get('der'))
           {
             this.move_tt[0]=0;
             this.move_item(-1);
           }
         }

           if($WIN.teclado.get('z',2)==1)
           {
             this.estado=2;
             this.estado_2=0;
             this.estado_3=0;

             this.textos.usar  = game.textoges.crear($root.contenedor, {x:game.wcanvas/2-70, y:game.hcanvas/2+16, texto:"Usar"},"tng10x18");
             this.textos.info  = game.textoges.crear($root.contenedor, {x:game.wcanvas/2-18, y:game.hcanvas/2+16, texto:"Info"},"tnb10x18");
             this.textos.tirar = game.textoges.crear($root.contenedor, {x:game.wcanvas/2+40, y:game.hcanvas/2+16, texto:"Tirar"},"tnb10x18");

             //this.textos.usar.set_font($LIB.IMAGES[31]);


           }

        }

        //si item central no esta centrado
        if(this.items[this.act_id].point.id!==18)
        {
        this.rotate(this.move_dir); 
        }
      if($WIN.teclado.get('x',0)==1)//workaround evitar efectuar ataque
      {
       _clip.itemcon.close();
      }
    }//estado ==1


     if(this.estado==3)//item usado 
     {
      if(_iclip.animdata.act[0]==0)
      {
      _iclip.animdata.animations[_iclip.animdata.act[0]].ll=1;
      if(_iclip.animdata.act[1]<_iclip.animdata.animations[_iclip.animdata.act[0]].buf.length/2)
      _iclip.animdata.force.reverse=1;
      if(_iclip.animdata.act[1]==0)
        _iclip.animdata.pause=1;
      }
      
      if(_iclip.animdata.pause==1 || _iclip.animdata.act[0]==1)
      {
        this.usar_tt++;
        if(this.usar_tt==30)
        {
          _iclip.animdata.force.reverse=0;
          _iclip.animdata.pause=0;

         _iclip.animdata.set_anim(1);
        }
        if(this.usar_tt==30+ ( (_iclip.animdata.animations[1].buf.length-1+1.5)*_iclip.animdata.animations[1].ll) )
        {

          _item.usar();
          if(_item.remove_on_use)
          { 
           this.items.splice(_item.items_i,1);
          }
          this.act_id--;
          if(this.act_id<0)
            this.act_id=this.items.length-1;

          return;



        }
        //if(_iclip.animdata.act[0]==1 && _iclip.animdata.act[1]==_iclip.animdata.animations[1].buf.length-1 && _iclip.)
        
          
        
      }
      //_iclip.y--; 


     }

    //item enfocado
    if(this.estado==2)
    {
      let _foo = [this.textos.usar,this.textos.info, this.textos.tirar];
       
      
      
      _iclip.y+= (50-_iclip.y)/10;
      _iclip._w+= (40-_iclip._w)/10;
      _iclip._h= _iclip._w;
      _iclip.x = _item.point.x-_iclip._w/2;


     if($WIN.teclado.get('z',2)==1)
     {

      if(this.estado_2==0) //|usar
       {
         this.estado=3;
         this.usar_tt=0;
         this.textos.nombre.visible=false;
         this.textos.usar.visible=false;
         this.textos.info.visible=false;
         this.textos.tirar.visible=false;
          
          //_item.usar();

       }

       if(this.estado_2==1) //info
       {
        if(this.estado_3==0)
        {
         this.textos.usar.visible=false;
         this.textos.info.visible=false;
         this.textos.tirar.visible=false;
         this.estado_3=1;
         this.textos.descripcion = game.textoges.crear($root.contenedor, {_onload(){
        //this.draw_color='blue';
         this.x = (game.wcanvas/2)-this.w/2;

         }, x:60, y:this.textos.usar.y, max_char:20, texto:_item.descripcion},'tnb10x18');
        }
        else if(this.estado_3==1)
        {
         this.estado_3=0;
         this.textos.descripcion.remove();
         this.textos.usar.visible=true;
         this.textos.info.visible=true;
         this.textos.tirar.visible=true;
        }

       }

     }

   if(this.estado_3==0)
    {

      if($WIN.teclado.get('izq',2)==1)
        {
          if(this.estado_2>0)
          {
          _foo[this.estado_2].set_font($LIB.IMAGES[30]);
           this.estado_2--;
           _foo[this.estado_2].set_font($LIB.IMAGES[31]);
         }
        }
       else if($WIN.teclado.get('der',2)==1)
        {
          if(this.estado_2<2)
          {
          _foo[this.estado_2].set_font($LIB.IMAGES[30]);
             this.estado_2++;
           _foo[this.estado_2].set_font($LIB.IMAGES[31]);
          }
         }      
      }


       if($WIN.teclado.get('x',2)==1)
       {
        
        if(this.estado_3==0)
        {
        this.estado=1;
        this.rotate(0);
        this.textos.usar.remove();
        this.textos.info.remove();
        this.textos.tirar.remove();
        }
        else if(this.estado_3==1)
        {
         this.estado_3=0;
         this.textos.descripcion.remove();
         this.textos.usar.visible=true;
         this.textos.info.visible=true;
         this.textos.tirar.visible=true;
        }


       }
    }

   }
    
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

               $WIN.gameges.cargar_clase($root.level, 4, {
                  id: 'arrow',
                  estado: f_angulo,
                  x:         _clip.x + this.xyni[0]*this.xy2[f_angulo][0],
                  y:         _clip.y + this.xyni[1]*this.xy2[f_angulo][1],
                  xvelocity: this.vel*this.xy[f_angulo][0],
                  yvelocity: this.vel*this.xy[f_angulo][1]
                });

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

             game.soundcon.play(8);
                

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

             if(this.tt_hit[0]>0)
             {
             //hit enemigos
             let _hit = { x:_clip.x+16*_11, 
                          y:_clip.y-8,
                          w:_clip.w/2, 
                          h:_clip.h+8
                         };


                //detectar caja destruible
                if($tileges.tilemaps[1][fl(_hit.y/16)][fl(_hit.x/16) ]==151  )
                {
                 $tileges.tilemaps[1][fl(_hit.y/16)][fl(_hit.x/16) ] = 0;
                 $tileges.refresh.force();

                 game.misc.crear_rebotinero(
                  {x:fl(_hit.x/16)*16,
                   y:fl(_hit.y/16)*16,
                   modo:'hp',
                  }
                  );


                 game.particulas_con.caja_destrozada(fl(_hit.x/16)*16,
                                                     fl(_hit.y/16)*16);

                 

                }

                for (var u of game.objs) 
                {
                  if (game.simple_hit_test(_hit, u)) 
                  {  
                
                    if (u.hitcon !== undefined && u.hitcon.on_hit(this, { damage: 5 }, 'bullet') )
                    {
                      u.xvelocity=2;
                      u.yvelocity=-4;

                      break;
                    }
                    
                  }
                }

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
    //alert('loadframe')

    window['_clip'] = this;
    padrear(this);
    //this.fondocon.update_fondos()

    this.anim = this.hijos_clip[1];
    
    this.set_player_sprite(game.particon.data.perfiles.id_act);

    this.itemcon.ini();

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

              //dialogocon
              if($WIN.teclado.get('arr',2)==1 && this.suelo_tt>0)
              {

                 this.dialogocon.check();

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
             
               

             let _tilemap = $gameges.tileges.tilemaps_all[3];
             let _xt = fl((_clip.x+_clip.w/2)/16);
             let _yt = fl((_clip.y+_clip.h/2)/16);

              if(_tilemap[_yt] && _tilemap[_yt][_xt].id=='puerta' && _clip.modos.modos.normal.suelo_tt>0)
              {
                game.soundcon.play(13,0.5);
                
                this.puerta = _tilemap[_yt][_xt];
                let _des = this.puerta.destino;
                

                _clip.modos.set('puerta',[_xt, _yt]);
                
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
                                $root.level.jugador.y = u.y*16;

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

   this.hitcon.run();
   this.modos.run();
   this.itemcon.run();


    this.anim.animdata.set_anim(this.estado_h);

    this.armacon.run();


//   game.center_nivel(this.x+this.w/2,this.y+this.h/2  );
    //this.fondocon.update_fondos();


    this.anim.x = -11;
    this.anim.y = -6;

    this.xprev = this.x;
    this.yprev = this.y;

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

   if(game.editor.estado==0 && _tilemaps_all[1][_ytm])
   {
    let _tc = _tilemaps_all[1][_ytm][_xtm];
    if(_tc==155||_tc==156||_tc==157)
    {
    _tilemaps_all[1][_ytm][_xtm]=0;
    _tileges.refresh.force();
    
    if(_tc==155) game.particulas_con.flyer_exp(1,_xtm*16, _ytm*16);
    if(_tc==156) game.particulas_con.flyer_hp (1,_xtm*16, _ytm*16);
    if(_tc==157) game.particulas_con.flyer_pp (1,_xtm*16, _ytm*16);

    }
    
    
           
   }


  },

  off_screen_signo:'',

}

