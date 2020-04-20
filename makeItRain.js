/*
  I wanted to explore Objects with methods, using the prototype notation instead of 
  object literals.
  So this version uses an array of objects
*/
var Colour = function(r, g, b){
    this.red = r;
    this.blue = b;
    this.green = g;
};

var Position = function(x, y){
    this.x = x;
    this.y = y;
};

var Size = function(width, height){
    this.width = width;
    this.height = height;
};

/*
  The raindrop object(RainDrop) has the Position, Size, and Colour objects as properties; it plus the primitive type for the speed property;
*/
var RainDrop = function(){
    this.position = new Position( floor(random(5,395) ), floor(random(-400,1) ) );
    this.size = new Size( floor(random(5,11)), floor(random(5,11)) );
    this.speed = floor(random(1,6));
this.colour = new Colour( floor(random(256)), floor(random(256) ), floor(random(256))); 
};

/*
  A rain drop can draw itself
 */
RainDrop.prototype.draw = function() {
    ellipse(this.position.x, this.position.y,this.size.width,this.size.height);
};

/*
 We use this object to keep track of a collection of rain drops; that is we can track multiple (maxRows) groups of rain drops. maxCols defines how many rain drops there are in each group
*/
var RainDrops = function(maxRows, maxCols){
    this.maxRows = maxRows;            // how many groups
    this.maxCols = maxCols;            // how many drops belong to each group
    this.drops = [];                   // where all our drops live
};


RainDrops.prototype.generateRain = function() {
    for(var row = 0; row < this.maxRows; ++row){
        // this.drops[ row ] =  new RainDrop()  ; // this  code caused undefined error
                                                  // on all row[0][col] items but the
                                                  // program still appeared to be
                                                  // running; but the log method for
                                                  // RainDrops object return the undefined
                                                  // error. 
                                                  
        this.drops[ row ] =  [ new RainDrop() ] ; // this line sets the [0][col] items
                                                  // properly
        for(var col = 1; col < this.maxCols; ++col){
            this.drops[ row ][ col ] = new RainDrop();
        }
    }
};

/*
  Let it rain
*/
RainDrops.prototype.rainFall = function() {
    if( this.debug ){  // No need to animate while checking the log...
        return;
    }
    for(var row = 0; row < this.maxRows; ++row){
        for(var col = 1; col < this.maxCols; ++col){
            fill(this.drops[row][col].colour.red, 
                 this.drops[row][col].colour.blue, 
                 this.drops[row][col].colour.green);
            this.drops[row][col].draw();
            this.drops[row][col].position.y += this.drops[row][col].speed;
            
            if( this.drops[row][col].position.y >= 405 ){
                this.drops[row][col].position.y = -5;
            }
        }
    }
};


RainDrops.prototype.log = function(){
    for(var row = 0; row < this.maxRows; ++row){
        for(var col = 0; col < this.maxCols; ++col){
            println(col + " " + this.maxRows + " " + this.maxCols + " " +
            this.drops[row][col].position.x + "  " + 
            this.drops[row][col].position.y + "  " +
            this.drops[row][col].size.width + "  " +
            this.drops[row][col].size.height + "  " +
            this.drops[row][col].speed //+ "  " +
            );
        }
    }
};

var maxRows = 2,     // 5 rows allows for no gaps as our group of droplets
                     // make their way to earth
    maxCols = 100;
    
var r = new RainDrops(maxRows, maxCols);
r.generateRain();
//r.log();

var draw = function() {
    background(204, 247, 255);
    r.rainFall();
};


