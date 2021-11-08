//main game function that runs all other functions
    window.onload = function() 
    {
    createImages();
    var heroes = populateImages(heroes);
    shuffleFunction(heroes);
    assignAndHide(heroes);
    matchImages();
    };
    
// function to create 36 image elements
    function createImages()
    {
      for(var q=0; q<36 ; q++)
        {
          var elem = document.createElement("img");
          elem.setAttribute("class", "cell");
          document.getElementById("dota").appendChild(elem);
        }
    }
    
// put all source images into array and send it back
    function populateImages(array)
    {
      var array =  ["axe.png", "clock.png", "invo.png", "void.png", "sniper.png", "jug.png", "timber.png","bristle.png", "tinker.png", "io.png", "ogre.png","ls.png", "wr.png", "sb.png", "rubik.png", "giro.png", "pudge.png", "meepo.png", "axe.png", "clock.png", "invo.png", "void.png", "sniper.png", "jug.png", "timber.png","bristle.png", "tinker.png", "io.png", "ogre.png","ls.png", "wr.png", "sb.png", "rubik.png", "giro.png", "pudge.png", "meepo.png"];
      return array;
    }
    
// Fisher–Yates Shuffle function to randomly rearrange all images
    function shuffleFunction(array)
    {
        var ranNum=0;
        var dummy;
        var len=array.length;
        while (len--)
        {
          ranNum = Math.floor(Math.random() * (len+1));
          // swap randomly chosen element with current element
          dummy = array[len];
          array[len] = array[ranNum];
          array[ranNum] = dummy;
        }
        return array; //send shuffled array back
    }
    
//function to assign shuffled images and hide them behind default image
    function assignAndHide(array)
    {
        var heroCell = document.getElementsByClassName("cell");
        for(var k = 0; k <heroCell.length; k++)
        {
          heroCell[k].src = array[k];//each image gets a shuffled image
          heroCell[k].className += " " + "hidden"; //hide each image behind a default picture  
        }   
    }
    
// function to add click event listener to images, compare two a time, reveal matched images and hide not-macthed images
    function matchImages()
    {
        var temp = [""];//temprorary array to hold click history
        var count = 0;//counter variable for each valid click
        var matched = 0;//counter for each matched pair of images
        var list = document.getElementById('dota');
        list.addEventListener('click', function(evt)
        {
        if(evt.target.tagName === 'IMG' && !evt.target.classList.contains('visible') && !evt.target.classList.contains('match'))//only allow clicking on default cover images 
         {
            count++;//increase count with each valid click
            temp.push(evt.target.src);//store clicks in array
            evt.target.className = evt.target.className.replace("hidden", "visible");//reveal clicked image
            if(evt.target.src == temp[count-1] && count==2)//check if it's a match
            {
                addMatchClass();
                count=0;//reset counter
                temp = [""];//empty array
                matched++;//increase count with each match
                if(matched >17)//check game winning conditions
                {
                  winFunction();       
                }
            }    
            if(evt.target.src != temp[count-1] && count==2)//check if it's not a match
            {
                notAMatch();
                count=0;//reset counter
                temp = [""];//empty array
            }
         }
        });
    }
    
//function to add match class to matched images
    function addMatchClass()
    {
        var same = document.getElementsByClassName("visible");
        for (var n=0; n <same.length; n++)
            {
                same[n].className += " " + "match";
            }
    }
    
//function to show non-matchign images for a few sec and hide them again
    function notAMatch()
    {
        document.getElementById("dota").style.pointerEvents = 'none';//disable clicking on images
            setTimeout(function() 
                {
                 var items = document.getElementsByClassName("cell");
                 for (var p=0; p <items.length; p++)
                    {
                        if(!items[p].classList.contains("match"))//matched images stay visible
                        {
                         items[p].className = items[p].className.replace("visible", "hidden");//hide non-matching images
                        }   
                    }
                    document.getElementById("dota").style.pointerEvents = 'auto';//enable clicking again
                }, 1500);//not matching images stay visible for 1.5 sec
    }
    
//Function that adds background image upon victory
    function winFunction()
    {
        setTimeout(function() 
            {
                var winner = document.getElementsByClassName("container");
                winner[0].className += " " + "victory";
            }, 2000); // change background image after 2 sec delay
    }
    
//reloads the page and starts new game
    function NewGame() 
    { 
      location.reload();
    }
    
   