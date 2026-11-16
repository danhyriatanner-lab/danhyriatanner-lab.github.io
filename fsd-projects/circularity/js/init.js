var init = function (window) {
  "use strict";
  var draw = window.opspark.draw,
    physikz = window.opspark.racket.physikz,
    app = window.opspark.makeApp(),
    canvas = app.canvas,
    view = app.view,
    fps = draw.fps("#000");

  window.opspark.makeGame = function () {
    window.opspark.game = {};
    var game = window.opspark.game;

    ///////////////////
    // PROGRAM SETUP //
    ///////////////////

    // TODO 1 : Declare and initialize our variables
    var circles = [];

    // TODO 2 : Create a function that draws a circle
    function drawCircle() {
      var circle = draw.randomCircleInArea(canvas, true, true, "#999", 2);
      physikz.addRandomVelocity(circle, canvas, 5, 5);
      view.addChild(circle);
      circles.push(circle);
    }

    // TODO 3 : Call the drawCircle() function
    for (var i = 0; i < 50; i++) {
      drawCircle();
    }

    ///////////////////
    // PROGRAM LOGIC //
    ///////////////////

    /*
       This Function is called 60 times/second, producing 60 frames/second.
       In each frame, for every circle, it should redraw that circle
       and check to see if it has drifted off the screen.
       */
    function update() {
      // TODO 4 : Update the position of each circle using physikz.updatePosition()
      // TODO 8 / TODO 9 : Iterate over the array
      for (var i = 0; i < circles.length; i++) {
        physikz.updatePosition(circles[i]);
        game.checkCirclePosition(circles[i]);
      }
    }

    /*
       This Function should check the position of a circle that is passed to the
       Function. If that circle drifts off the screen, this Function should move
       it to the opposite side of the screen.
       */
    game.checkCirclePosition = function (circle) {
      // Right Boundary Check
      if (circle.x - circle.radius > canvas.width) {
        circle.x = 0 - circle.radius;
      }
      // Left Boundary Check
      else if (circle.x + circle.radius < 0) {
        circle.x = canvas.width + circle.radius;
      }

      // Bottom Boundary Check
      if (circle.y - circle.radius > canvas.height) {
        circle.y = 0 - circle.radius;
      }
      // Top Boundary Check
      else if (circle.y + circle.radius < 0) {
        circle.y = canvas.height + circle.radius;
      }
    };

    /////////////////////////////////////////////////////////////
    // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
    /////////////////////////////////////////////////////////////

    view.addChild(fps);
    app.addUpdateable(fps);

    game.circles = circles;
    game.drawCircle = drawCircle;
    game.update = update;

    app.addUpdateable(window.opspark.game);
  };
};

// DO NOT REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = init;
}

/*
<!doctype html>


<html>
   <head>
       <meta charset="utf-8">


       <title>Operation Spark || Motion Poem</title>
       <meta name="description" content="Operation Spark Motion Poem">
       <meta name="author" content="operationspark.org">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
      
       <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
       <link href="css/style.css" rel="stylesheet">


       <!-- all core CreateJS and 3rd party libraries are listed here: -->
       <script src="bower_components/lodash/lodash.min.js"></script>
       <script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
       <script src="https://code.createjs.com/1.0.0/tweenjs.min.js"></script>
       <script src="bower_components/opspark-draw/draw.js"></script>
       <script src="bower_components/racket/racket.js"></script>


       <!-- our app javascript code -->
       <script src="js/opspark.js"></script>
       <script src="js/multiplayer.js"></script>
       <script src="js/gamification.js"></script>
       <script src="js/init.js"></script>
      
       <style type="text/css">
           <!-- override default styles here -->
       </style>
   </head>
   <body>
       <div style="position: relative; display: inline-block;">
           <canvas id="canvas" width="500" height="500"></canvas>
          
           <!-- Game UI -->
           <div id="score" style="position: absolute; top: 10px; left: 10px; color: white; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); z-index: 10;">
               Score: 0 | Size: 15
           </div>
          
           <div id="multiplayerScore" style="position: absolute; top: 10px; right: 10px; color: white; font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); z-index: 10; display: none;">
               <div style="color: #0080FF;">Opponent: Size 15</div>
               <div id="gameTimer" style="color: #FFD700; margin-top: 5px;">Time: 60s</div>
           </div>
          
           <div id="instructions" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-family: Arial, sans-serif; text-align: center; background: rgba(0,0,0,0.7); padding: 20px; border-radius: 10px; z-index: 10; display: none;">
               <h2 style="margin: 0 0 10px 0; color: #00FF00;">Circularity</h2>
               <div id="gameMode" style="margin-bottom: 15px;">
                   <button id="singlePlayerBtn" class="game-mode-btn">Single Player</button>
                   <button id="hostGameBtn" class="game-mode-btn">Local Multiplayer</button>
               </div>
               <div id="singlePlayerInstructions">
                   <p style="margin: 5px 0;">🟢 You are the GREEN circle</p>
                   <p style="margin: 5px 0;">Use <strong>WASD</strong> to move</p>
                   <p style="margin: 5px 0;">Absorb smaller circles to grow!</p>
                   <p style="margin: 5px 0;">Avoid larger circles or you'll be absorbed!</p>
                   <p style="margin: 15px 0 5px 0; color: #FFD700;"><strong>Press any key to start!</strong></p>
               </div>
               <div id="multiplayerInstructions" style="display: none;">
                   <p style="margin: 5px 0;">🟢 Player 1: GREEN circle | 🔵 Player 2: BLUE circle</p>
                   <p style="margin: 5px 0;">Player 1 uses <strong>WASD</strong> | Player 2 uses <strong>Arrow Keys</strong></p>
                   <p style="margin: 5px 0;">Absorb circles and each other to grow!</p>
                   <p style="margin: 5px 0;">Biggest circle after 60 seconds wins!</p>
                   <p style="margin: 15px 0 5px 0; color: #FFD700;"><strong>Press any key to start!</strong></p>
               </div>
           </div>
       </div>
       <script id="motion-poem">
           (function(){
               init(window);
               window.opspark.makeGame();
           })();
       </script>
   </body>


</html>


"use strict"


const chai = require('chai'),
   assert = chai.assert,
   expect = chai.expect,
   sinon = require('sinon'),
   window = require('../test/windowMock.js'),
   opspark = window.opspark,
   draw = opspark.draw,
   physikz = opspark.racket.physikz,
   view = opspark.view,
   canvas = opspark.canvas,
   init = require('../js/init.js');


describe('Circularity', function() {
   let game, circle, circles, update, drawCircle, checkCirclePosition;


   before(function(done) {
       init(window);
       opspark.makeGame();
       game = window.opspark.game;
       circle = game.circle;
       circles = game.circles;
       update = game.update;
       drawCircle = game.drawCircle;
       checkCirclePosition = game.checkCirclePosition;
       done();


   });


   after(function(done) {
       done();
   });


   describe('TODO 1: should declare variables', function() {
       it('circles should be an array', function() {
           expect(circles).to.be.an('array');
       });
   });


   describe('TODO 2: should create a function to draw a circle', function() {
       var currentCircleID;
       before(function() {
           sinon.spy(draw, 'randomCircleInArea');
           sinon.spy(physikz, 'addRandomVelocity');
           sinon.spy(view, 'addChild');


           currentCircleID = window.getCircleID();
           if (typeof drawCircle === "function") {
               drawCircle();
           }
       });


       after(function() {
           draw.randomCircleInArea.restore();
           physikz.addRandomVelocity.restore();
           view.addChild.restore();
          
           // after testing drawCircle, remove the added circle from the circles array and decrement the circleID
           circles.pop();
           window.setCircleID(currentCircleID - 1);
       });


       it('should assign drawCircle to a function', function() {
           expect(drawCircle).to.be.a('function', 'drawCircle should be a function');
       });


       it("should call the draw.randomCircleInArea function to create a circle object", function() {
           // draw.randomCircleInArea should be called within drawCircle
           expect(draw.randomCircleInArea.calledOnce).to.be.true;


           // draw.randomCircleInArea should be called with the correct arguments
           var randomCircleArgs = draw.randomCircleInArea.firstCall.args;
           expect(randomCircleArgs.length).to.be.at.least(1, "should call randomCircleInArea with canvas as the first argument");
           expect(randomCircleArgs[0].name === 'canvas', 'the first argument of randomCircleInArea should be the canvas').to.be.true;
       });


       it("should call the physikz.addRandomVelocity function", function() {
           // physikz.addRandomVelocity should be called correctly
           expect(physikz.addRandomVelocity.calledOnce).to.be.true;


           var addRandomVelocityArgs = physikz.addRandomVelocity.firstCall.args;
           expect(addRandomVelocityArgs.length).to.be.at.least(2, "should call addRandomVelocity with at least two arguments");


           if(addRandomVelocityArgs.length > 2) {
               expect(addRandomVelocityArgs[2]).to.be.a('number', 'the third argument of addRandomVelocity should be a number for VelocityX');
           }
           if(addRandomVelocityArgs.length > 3) {
               expect(addRandomVelocityArgs[3]).to.be.a('number', 'the fourth argument of addRandomVelocity should be a number for VelocityY');
           }


           expect(addRandomVelocityArgs[0].id === currentCircleID &&
               addRandomVelocityArgs[0].name === 'circle', 'should pass circle to addRandomVelocity as the first argument').to.be.true;
           expect(addRandomVelocityArgs[1].name === 'canvas', 'should pass canvas addRandomVelocity as the second arguments').to.be.true;
       });


       it('should call view.addChild', function() {
           // view.addChild should be called correctly
           expect(view.addChild.calledOnce).to.be.true;
           var addChildArgs = view.addChild.firstCall.args;
           expect(addChildArgs.length).to.equal(1, "should call addChild with 1 argument");
           expect(addChildArgs[0].id === currentCircleID &&
               addChildArgs[0].name === 'circle', 'should call addChild with the correct arguments').to.be.true;
       });


       it('should push the new circle into the circles array', function() {
           // should push circle into circles array
           expect(circles.length > 0).to.be.true;
           expect(circles[circles.length - 1].id === currentCircleID, 'should push the new circle into the circles Array').to.be.true;
       });
   });


   describe('TODO 3: should call the drawCircle function at least 5 times', function() {
       it('should call the drawCircle function at least 5 times', function() {
           expect(circles.length).to.be.at.least(5);
       });
   });


   describe('TODO 4: should update the position of all 5 circles', function() {
       beforeEach(function() {
           sinon.spy(physikz, "updatePosition");
       });
       afterEach(function(done) {
           physikz.updatePosition.restore();
           done();
       });
       it('should call physikz.updatePosition on 5 different circles', function() {
           update();
           expect(physikz.updatePosition.callCount).to.be.at.least(5);
           for (var i = 0; i < 5; i++) {
               expect(physikz.updatePosition.getCall(i).args[0].id === i).to.be.true;
           }
       });
       it('should update the position of all 5 circles', function() {
           var initialXY = [];
           var circlesMoved = 0;
           // loop through circles and store the starting x/y positions
           for (var i = 0; i < circles.length; i++) {
               initialXY.push({ x: circles[i].x, y: circles[i].y });
           }
           update();
           // loop through again and check to see if the x/y positions have changed
           for (var i = 0; i < circles.length; i++) {
               if (initialXY[i].x !== circles[i].x || initialXY[i].y !== circles[i].y) {
                   circlesMoved++;
               }
           }
           expect(circlesMoved).to.be.at.least(5);
       });
   });


   describe('TODO 5: should create a function to keep a circle in the bounds of a screen', function() {
       // check right boundary
       it('should move a circle to offscreen-left after moving offscreen-right', function() {
           let circle = { x: canvas.width + 5, y: 1, radius: 1 };
           checkCirclePosition(circle);
           expect(circle.x === -circle.radius).to.be.true;
       });


       it('should move a circle to offscreen-right after moving offscreen-left', function() {
           circle = { x: -5, y: 1, radius: 1 };
           checkCirclePosition(circle);
           expect(circle.x === canvas.width + circle.radius).to.be.true;
       });


       it('should move a circle to offscreen-top after moving offscreen-bottom', function() {
           circle = { x: 1, y: canvas.height + 5, radius: 1 };
           checkCirclePosition(circle);
           expect(circle.y === -circle.radius).to.be.true;
       });


       it('should move a circle to offscreen-bottom after moving offscreen-top', function() {
           circle = { x: 1, y: -5, radius: 1 };
           checkCirclePosition(circle);
           expect(circle.y === canvas.height + circle.radius).to.be.true;
       });
   });


   describe('TODO 6: Call checkCirclePosition on each of your circles', function() {
       before(function() {
           sinon.spy(game, 'checkCirclePosition');
       });


       after(function(done) {
           game.checkCirclePosition.restore();
           done();
       });


       it('should call checkCirclePosition 5 times', function() {
           update();
           expect(game.checkCirclePosition.callCount).to.be.at.least(5);
       });


       it('should call checkCirclePosition on 5 different circles', function() {
           // every circle has an id number starting at 0
           for (var i = 0; i < 5; i++) {
               expect(game.checkCirclePosition.getCall(i).args[0].id === i).to.be.true;
           }
       });
   });
  
   describe('TODO 7: Create a loop to draw 50 circles', function() {
       var isRepetitive;
       before(function() {
           var makeGameString = opspark.makeGame.toString().replace(/\s+/g, '');
           var drawCircleCount = (makeGameString.match(/drawCircle\(\)/g) || []).length;


           // I use 6 here because the student may have commented out their previous 5 drawCircle() calls rather than deleting them. Thus there should be at most 6 occurances of "drawCircle()"
           isRepetitive = drawCircleCount > 6;
       });


       it('should call the drawCircle function at least 50 times', function() {
           expect(circles.length).to.be.at.least(50);
       });
      
       it('should not repetitively call the drawCircle function', function() {
           expect(isRepetitive, 'drawCircle() should not appear repetitively throughout your code').to.be.false;
       });
   });


   describe('TODO 8: Iterate over the Array', function() {
       var iterates;
       before(function() {
           var updateString = game.update.toString().replace(/\s+/g, '');
           iterates = updateString.includes('varcircle=circles[i]'); // This checks to see if the iteration variable is named "circle"
       });


       it('should iterate over the circles Array and assign each element to the variable circle', function() {
           expect(iterates).to.be.true;
       });
   });


   describe('TODO 9: update the position of every circle and check their bounds', function() {
       var iterates;
       var circlesMoved = 0;
       var initialXY = [];
      
       before(function() {
           sinon.spy(physikz, "updatePosition");
           sinon.spy(game, 'checkCirclePosition');


           // loop through circles and store the starting x/y positions
           for (var i = 0; i < circles.length; i++) {
               initialXY.push({ x: circles[i].x, y: circles[i].y });
           }
           update();
       });
      
       after(function(done) {
           game.checkCirclePosition.restore();
           physikz.updatePosition.restore();
           done();
       });


       it('should call physikz.updatePosition on every circle in the circles Array', function() {
           expect(physikz.updatePosition.callCount).to.equal(circles.length);


           // loop through again and check to see if the x/y positions have changed
           for (var i = 0; i < circles.length; i++) {
               if (initialXY[i].x !== circles[i].x || initialXY[i].y !== circles[i].y) {
                   circlesMoved++;
               }
           }
           expect(circlesMoved === circles.length);
       });


       it('should call game.checkCirclePosition on every circle in the circles Array', function() {
           expect(game.checkCirclePosition.callCount).to.equal(circles.length);
       });
   });
});
*/
