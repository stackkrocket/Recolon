<div class="posts-wrapper">

    <div class="search-bar-container">
        <div id="p-search" class="ui category search">
            <div class="ui icon input">
              <input type="text" placeholder="Search">
              <i class="search icon"></i>
            </div>
            <div class="results"></div>
          </div>
    </div>
   

    <div class="s-following-container">
        <div class="s-following">
            <p>Followed Sites</p>
            <button><a href="#">Manage</a></button>
        </div>
    </div>

    <div class="main text container">
        <div class="ui divided link items"><br>
                <% posts.forEach(function(post){ %>
                        <div class="item" onclick="location.href='/blogs/<%= post._id %>'">
                            <div class="ui medium image">
                                <img src="<%= post.image %> " alt="">
                            </div>
                            <div class="content">
                                <div class="header">
                                    <strong style="font-size: 26px;"><%= post.title %> </strong>
                                </div>
                                <div class="description">
                                    <p style="font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                                        <%- post.content.substring(0, 200) %> 
                                    </p>
                                </div>
                                <div class="statistics">
                                    <ul>
                                        <li><a href="#"><i class="heart outline icon"></i>12</a></li>
                                        <li><a href="/blogs/<%= post._id %> "><i class="comments outline icon"></i>12</a></li>
                                    </ul>
                                </div><br>
                                <div class="created">
                                    <span><a href="#"><%= post.created.toDateString() %> </a></span>
                                </div>
                            </div>
                        </div><br><br>
                <% }) %> 
            </div>
        </div>
</div>











.search-bar-container{
    width: 100%;
    height: auto;
    margin: 8% 15% 0 15%;
}

.search-bar-container input{
    width: 610px;
    height: 60px;
    border-radius: 3px;
    border: 1px solid #ddd;
}

.search-bar-container .ui{
    padding: 0 0 0 86px;
}

.s-following-container{
    width: 45%;
    height: 60px;
    margin: 2% 27.5% 0 27.5%;
}

.s-following-container .s-following{
    width: 100%;
    height: 100%;
    border: 2px solid #ddd;
    border-radius: 3px;
}

.s-following-container .s-following p{
    float: left;
    text-indent: 10px;
    padding: 17px 0 0 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #727272;
}

.s-following-container .s-following button{
    float: right;
    margin: 12px 20px 0 0;
    width: 70px;
    height: 30px;
    border: none;
    border-radius: 3px;
    outline: none;
    background: #0070ba;
}

.s-following-container .s-following button a{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
}

.statistics{
    margin: 3% 0 0 0;
}

.statistics ul{
    display: flex;
    flex-direction: row;
    list-style: none;
}

.statistics ul li:nth-child(2) {
    padding: 0 0 0 15px;
}

.statistics ul li a{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    color: #424242;
}

.statistics ul li a i{
    font-size: 14px;
    color: #424242;
}

.button-group{
    margin: 5% 0 0 21.5%;
    display: flex;
    flex-direction: row;
}

.button-group button a{
    color: #fff;
    text-decoration: none;
}
/*Auth/Index/feed styling ends*/








/*Auth/Index/show page styling starts*/

/*
.page-content-container{
    width: 100%;
    height: auto;
    margin: 5% 0 0 0;
}

.page-content-container .sticky-sidebar{
    float: left;
    position: fixed;
    overflow-x: hidden;
    z-index: 1;
    width: 35%;
    height: 100%;
    border-right: 1px solid #dfdfdf;
}

.page-content-container .sticky-sidebar .image-position{
    width: 100px;
    height: 100px;
    margin: 5% 0 0 28%;
}

.page-content-container .sticky-sidebar .image-position img{
    width: 100%;
    height: 100%;
}

.poster{
    margin: 5% 0 0 28%;
}

.poster p:nth-child(1) a{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    color: #0070ba;
}

.poster p:nth-child(2) a{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 13px;
    font-weight: 500;
    padding: 0 0 0 5px;
    text-decoration: none;
    color: #0070ba;
}

.poster p:nth-child(3){
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #737373;
}

.stats ul{
   display: flex;
   flex-direction: row;
   list-style: none;
   margin: 30px 0 0 21.5%;
}

.stats ul li a{
    padding: 0 20px 0 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    color: #424242;
    text-decoration: none;
}

.stats ul li a i{
    color: #424242;
    font-size: 14px;
}

.content{
    width: 50%;
    height: auto;
    margin: 0.6565% 13% 0 0;
    float: right;
}

.content .header h1{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 37px;
    font-size: 700;
    color: #303030;
}

.header .timestamp a, .created a{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
    color: #737373;
    font-weight: 500;
    text-decoration: none;
}

.image-container{
    width: 650px;
    height: 430px;
    margin: 8% 0 0 0;
}

.image-container img{
    width: 100%;
    height: 100%;
}

.content-body{
    margin: 4% 0 0 0;
}

.content-body p{
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 17px;
    letter-spacing: 0.7373px;
    font-weight: 500;
    color: #444;
    line-height: 1.5;
    letter-spacing: 1.02px;
    text-align: left;
}
*/









 <div class="sticky-sidebar">
    <div class="image-position">
        <img class="ui tiny circular image" src="/images/image-2.jpg" alt="">
    </div>

    <div class="poster">
        <p><a href="#"><%= post.author.username %> <%= currentUser.lastName %> </a></p>
        <p><a href="#">Daily Squirrel</a></p>
        <p>7,500 followers</p>
    </div>
    <div class="stats">
        <ul>
            <li><a href="#"><i class="heart outline icon"></i>12</a></li>
            <li><a href="#"><i class="comments outline icon"></i>12</a></li>
        </ul>
     </div>

     <!--if a user exists and owns he post-->
     <% if(currentUser && post.author.id.equals(currentUser._id)){ %>
        <div class="button-group">
            <button class="ui violet button"><a href="/blogs/<%= post._id %>/edit ">Edit</a></button>
            <form action="/blogs/<%= post._id %>?_method=DELETE" method="POST">
               <button class="ui red button">Delete</button>
           </form>
        </div>
     <% } %> 
    
   </div>

   <div class="content">
    <div class="header">
        <h1><%= post.title %> </h1>
        <span class="timestamp"><a href="#"><%= post.created.toDateString() %> </a></span>
    </div> 

    <div class="image-container">
        <img src="<%= post.image %> " alt="">
    </div>

    <div class="content-body">
        <p><%- post.content %> </p>
    </div>


   <!--A simple Comment section-->
   <div class="comment-section-wrapper">
       <div class="comment-section">
           <div class="card card-body bg-dark">
               <div class="float-end">
                   <a href="#" class="btn btn-outline-primary">thread</a><hr style="color: #999;">
               </div>
               <% post.comments.forEach((comment)=>{ %>
                    <div class="row">
                        <div class="col-md-12">
                            <h3>
                               <a  style="padding: 8px 0 0 0; font-size: 15px; color: #ccc; text-decoration: none;" href="#"> <%= comment.author.username %> </a>
                            </h3>
                            <span class="float-end"><em style="font-size: 10px; color: #bbb;">10 days ago</em></span>
                            <p style="font-size: 12px; color: #ccc;"><%= comment.text %> </p><hr style="color: #999;">
                        </div>
                    </div>
               <% }) %> 
           </div>
       </div>

       <!--add a comment form-->
       <div class="comment-form">
           <form action="/blogs/<%= post._id %> " method="POST">
            <div class="form-group">
                <textarea name="text" class="form-control" rows="3"></textarea>
            </div>
            <button style="margin: 15px 0 0 0;" class="btn btn-outline-primary" type="submit"><i style="padding: 1.5px 3px 0 0;" class="fas fa-pen-alt"></i>comment</button>
           </form>
       </div>
   </div>