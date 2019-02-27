<template>
  <div id="app">
    
     <div class="topbar">
    <div class="bar">
        <h3>Sales Analysis </h3>
      </div>

    </div>

    <ul class="sbul">
      
      <li class="sbli"><router-link to="/home"><i class="fa icons">&#xf3fd;</i>Dashboard</router-link></li>
      
      <li class="sbli"><router-link to="/sales"><i class="fa icons">&#xf080;</i>Sales</router-link></li>
      
       <li class="sbli"><router-link to="/products"><i class="fa icons">&#xf07a;</i>Products</router-link></li>
      
     
    </ul>

	<div class="content" id="dashboard_id">
		<router-view/>
	</div>

    
  </div>
  
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html,body{
  margin: 0;
  font-family: 'lato',Arial;
  background-color: #F1F1F1;
   overflow: auto;
}

/*Top bar Css*/
.topbar{
  background-color: #19B5FE;
  width:100%;
  height:50px;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.bar{
  position:fixed;
  background-color: #22A7F0;
  width:280px;
  height:50px;
}
h3{
  margin-top:10px;
  margin-left:35px;
  color:white;
  font-size:25px;
  font-weight:100;
}
/*Side bar Css*/
.Side_Nav{
  margin-top:50px;
  background-color: #ffffff;
  width:280px;
  position: fixed;
    height: 100%;
  
}
/*Side bar Css*/
.sbul {
    list-style-type: none;
    margin-top: 0px;
    padding: 0;
    width:280px;
    background-color: #ffffff;
    position: fixed;
    height: 100%;
    overflow: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.sbli a {
    display: block;
    color: #000;
    padding: 12px 16px;
    text-decoration: none;
}


.sbli a:hover:not(.active) {
    background-color: #F0F0F0;
    color: black;
}

/*Active the link after i click */
.sbli a:focus{
   background-color: #ECECEC;
    color: black;
}
/*Icons Class*/
.icons{
   float:left;
  margin-right:10px;
  
}

/*Display of the Page*/
#dashboard_id{
  display:block;
}
@media screen and (max-width: 1000px) {
  body { overflow: auto; } /* Or change the height or whatever */ 
}

/*Body  Css*/
.content{

  margin-top:60px;
  margin-left:300px;
  border-radius:5px;
  display:none;
}
/*------------Pages Content-----------------*/
/*======Dashboard Content Page====*/
.dashboard_box {
  border-top: 4px solid #19B5FE;
  width:80%;
  height: 50%;
}
/*Box1*/
.box1{
  margin:60px 0px 0px 50px;
  width:300px;
  height: 150px;
  background-color:#19B5FE;
  border-radius:5px;
}

.product_icon{
  margin:20px 0 0 25px;
  width:80px;
  height:80px;
  position:absolute;
}

.strip_bar{
  
  position:absolute;
  width:300px;
  height: 45px;
  background-color:#22A7F0;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  margin-top:105px;
 /*#22A7F0**/
}
.strip_bar h2{
   
  font-size:25px;
  position:absolute;
  margin-left:60px;
  margin-top:10px;
  color:white;
  text-align:center;
}
.total_products{
  float:left;
  margin-top:25px;
  margin-left:120px;
  font-size:25px;
  color:white;
  font-size:50px;
}

</style>
