document.currentScript.class = 
    
       {
  modo:'ente_sprite',
    anim:{data:[
                                      {ll:30, data:[0,1,0,1]},
                                      {ll:30, data:[0,1,0,1]},
                                       {ll:10, data:[0,1,2,3]},
                                       {ll:10, data:[0,1,2,3]},
                                      
                                       {ll:10, data:[0,1,2,3,4]},
                                       {ll:10, data:[0,1,2,3,4]},
                                      
                                        //salto
                                         {ll:10, data:[0]},
                                         {ll:10, data:[0]},
                     ],
                     anim_n:3,
                     w:32,
                     h:32
              },


  id:2,
  draw_color:"blue",
  x:100,
  y:100,
  w:16,
  h:16,

       loadframe()
       {

       },

       enterframe()
       {
       	console.log(this.anim);
      this.x++;
      this.anim.x=this.x;
       }
       
}