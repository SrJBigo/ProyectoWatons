//|climacon
  climacon:
  {
    estado:0,
    items:[],
    ini()
    {
      this.foo = function(_x, _y)
      {

        let _item = WIN.gameges.crear_vacio($root, 2,
                 {
                   w: 3,
                   h: 3,
                   y:_y,
                   x:_x,
                   xini:_x,
                   yv:Math.random()*50,
                   draw_color: 'white',
                   enterframe()
                   {

                    this.y  +=this.yv;
                    let _yt = fl(this.y/16);
                    let _xt = fl(this.x/16);
                    this.x+=Math.random()*2-4;
                    if(this.y>game.hcanvas || $tileges.tilemaps[1][_yt] && $tileges.tilemaps[1][_yt][_xt]>0)
                    {
                      this.yv=Math.random()*50;
                      this.y=Math.random()*100;
                      this.x=this.xini-10+Math.random()*20;
                      this.h=1+rd(Math.random()*7);
                      this.h=1+rd(Math.random()*7);
                    }
                   }
                });

        
         this.items.push(_item);

      }
      
      this.estado=1;


      let a= 0;
      let b = 0;
      for(var i =0;i<40;i++)
      {
        
       this.foo(i*10,0);


      }


    },
    run()
    {

     if(this.estado==1)
     {
     
     }

    }
    
  },




  
  //|itemcon
  itemcon:
  {
    estado:0,
    items:[],
    open:[2/10,0.2/10],
    ini()
    {
      for(var u of this.items)
        u.remove();
      if(this.act)
        this.act.remove();
      this.items=[];
      this.open[0]*=1.2;
      this.open[1]*=1.2;
      this.foo = function(_x, _y, _color='blue') 
      {

        let _item = WIN.gameges.crear_vacio($root, 2,
                 {
                   w: 2,
                   h: 2,
                   x:_x,
                   y:_y,
                   draw_color: _color,
                });

         this.items.push(_item);

      }
      
      this.estado=1;


      function loop(n, i, f=()=>{})
      {
        for(var j=0;j<i;j++)
        {
         n = f(n,i);
        }
        return(n);

      }

      let c = [110,100];
      let a;
      let b;
      let s = 10;

      
      //this.foo(c[0],c[1], 'red');
      for(var k =0;k<4;k++)
      {
        let zoo = [[this.open[0],-this.open[1]],[this.open[0],this.open[1]],[-this.open[0],this.open[1]],[-this.open[0],-this.open[1]]];
        a=0;
        b=0;
       for(var i =0;i<s;i+=1)
        {
          
           a += ( (i  )  )*zoo[k][0];
           b += ( (s-i)  )*zoo[k][1]; 
           
           //if(i==0)alert(b);
           
           let _color = 'blue';
           if(i>0) _color='purple'
           this.foo( a + c[0]-(loop(1,s,(n,i)=>{return(n+i)})/2)*zoo[k][0]  ,

                     b + c[1]-s*zoo[k][1] ,_color);

        }
      }

    this.tt = [0,3,  0];
    this.act = WIN.gameges.crear_vacio($root, 2,
                 {
                   w: 5,
                   h: 5,
                   x: 0,
                   y: 0,
                   draw_color: 'red',
                });

    },
    run()
    {
     let _tt = this.tt;
     if(this.estado==1)
     {
      _tt[0]++;
      if(_tt[0]>_tt[1])
      {
        _tt[0]=0;
        _tt[2]++;
        if(_tt[2]>this.items.length-1)
          _tt[2]=0;
      }
      this.act.x=this.items[_tt[2]].x;
      this.act.y=this.items[_tt[2]].y;

     }

    }
    
  },