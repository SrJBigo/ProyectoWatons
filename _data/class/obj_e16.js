//document.currentScript.OBJ_DES[script.url_filename_limpio(document.currentScript.src)] = "jiji";
//============================
//CREADO VIA  cargar_script();
//=============================
document.currentScript.class =

{

    
       LOAD:
       {
              id: 3,
              canvas_id: 1,
              modo: 'sprite',

              animdata: GAME.crear_animdata({ master: { wt: 16, ht: 16, ll: 30 } },

                     { remove_on_loop: 1, ll: 5, buf: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] },
                     { remove_on_loop: 1, ll: 5, buf: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]] },

                     //mini explosion blanca
                     { remove_on_loop: 1, ll: 3, buf: [[2, 0], [2, 1], [2, 2] ] },

                     //off_screen_señal
                     { remove_on_loop: 0, ll: 5, buf: [[3, 0]] },
                     
                     //flyer exp
                     { remove_on_loop: 0, offset:[-5,-5],ll: 5, buf: [[4, 0]] },

                     //fragmentos caja
                     { remove_on_loop: 0, offset:[0,0],ll: 5, buf: [[5, 0]] },
                     
                     { remove_on_loop: 0, offset:[0,0],ll: 5, buf: [[5, 1]] },

                     //flyer hp
                     { remove_on_loop: 0, offset:[-5,-5],ll: 5, buf: [[4, 1]] },
                     //flyer pp
                     { remove_on_loop: 0, offset:[-5,-5],ll: 5, buf: [[4, 2]] },

                     //flecha 9
                     { remove_on_loop: 0, offset:[-5,-5],ll: 5, buf: [[4, 2]] },


              ),
       },
       anim_id:0,
       xvelocity:0,
       yvelocity:0,

       loadframe() {

       this.animdata.set_anim(this.anim_id);

       },

       enterframe() {

       },

}

