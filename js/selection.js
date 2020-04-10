/* IMPORTANT
Right now this script serves as a "master controller" for all other functionalities.
To improve upon this, more script needs to be added so that a group is created each time multiple elements are selected ("e.g. group"). On deselection, destroy the group, unless user chooses to group objects together.
*/


// SELECTION

  //EDGE cases -- DS vs mouse up and down
  //Event delegation vs lots of eventListeners
  //Keeping track of individual instances -- need unique event listeners?
  //Awaiting Thimault -- how to hide selection box (e.g. while dragging or resizing)

  //Enhance DS
    //-- instantiate group on selecting 2 elements
      //Add resizers to group, not individual elements
    //-- instantiate group on selecting 3 elements
  //Toggle resizers for group

//Multi-drag
  //Implement grouping first. Then apply select only to group. Then turn off resizers and turn on for new group. Then implement dragging only for group.
  //Enhance -- save group div if user chooses to do so. Otherwise destroy the group div.

//Multi-resizer
  //instantiate resizers on group. Then resize group and scale elements inside (font sizes stay the same)

//BUG -- DS selection border flickers on 3-4 quick clicks on selected element.

//BUG -- need to prevent default of web browser URL bar

//BUG: Prevent resizers being cut off on edges (use span?)

//jQuery solution -- convert to vanilla JS? - http://jsfiddle.net/zVZFq/1445/
//Enhance -- grey background box on selection and drag, like Balsamiq?
//Enhance -- drag select is "overly sensitive." Modify to be more like Balsamiq? (only select if entire element is within selection box)


// Add event listeners for toggling on and off
document.querySelector('.canvas').addEventListener('mousedown', selectDown); //change canvas to ID? And canvas can have only 1 child.
document.querySelector('.canvas').addEventListener('mouseup', selectUp); //change canvas to ID? And canvas can have only 1 child.

// Drag Select
var ds = new DragSelect({
  selectables: document.getElementsByClassName('item'),
  callback: e => console.log(e),
  area: document.getElementById('canvas'),
  multiSelectKeys: ['ctrlKey', 'shiftKey'],
  autoScrollSpeed: 3,
});


// On mouse down
function selectDown() {
// Disable drag select while dragging -- refactor somehow. Add a controller?
  if(event.target.matches('.canvas')) { // enable drag select only if clicking on canvas. May need to refactor using ID.
    // ds.start(); // deprecated - this breaks ctrl/shift clicking
    //enable resizing -- enhance to make this element specific. Also, this doesn't apply to DS
    ds.selector.removeAttribute("hidden"); // not working. Neither does CSS display = 'none';
    // console.log(ds.selector);
    interact('.resize-drag').resizable({edges: { left: false, right: false, bottom: false, top: false } });
  }
  else {
    //disable resizing -- enhance to make this element specific
    ds.selector.setAttribute("hidden", ""); // not working. Neither does CSS display = 'none';
    // console.log(ds.selector);
    interact('.resize-drag').resizable({edges: { left: true, right: true, bottom: true, top: true } });
    // ds.break(); // instead of stop, which removes the selection border. degrecated -- this breaks CTRL/Shift clicking.
    // event.target.classList.add('ds-selected'); // to preserve ds selection border. doesn't work. Needs to add to parent. .parent doesn't work either.
  }
}


// On mouse up -- to make compatible with DS
function selectUp() {
  // removeClass(); // remove resizers when canvas is clicked
  // interact('.resize-drag').resizable({edges: {top:false, left:false, bottom:false, right:false} });

  // Add code to destroy selection group here
}

function createSelectionGroup() {

  //make this trigger onClick
  // create the container div
  var dv = document.createElement('div');
  // get all divs
  var divs = document.getElementsByTagName('div');
  // get the body element
  var body = document.getElementsByTagName('body')[0];

  // apply class to container div
  dv.setAttribute('class', 'item');
  dv.setAttribute('class', 'selectionGroup');

  // find out all those divs having class C
  for(var i = 0; i < divs.length; i++)
  {
     if (divs[i].getAttribute('class') === 'ds-selected')
     {
        // put the divs having class C inside container div
        dv.appendChild(divs[i]);
     }
  }
  // finally append the container div to body
  body.appendChild(dv);

  // add class 'item' to allow for dragging
  //test to ensure it doesn't conflict with children 'item'(s). If it does, consider removing class from children.
}

// function to create permanent group
function createGroup() {

}


//ENHANCE -- Disable resizing unless selected (.ds-selected or .resizable)

//Test cases:
//1 on click of item - PASS
  //1a add resizer - PASS
  //1b remove resizer for other items on click - PASS
  //1c don't remove resizers on 2nd click of itself -
//2 remove all resizers on click of canvas from all items - PASS
//3 DS on all items in selection box - FAIL
//4 DS on all items with CTRL/SHIFT click - FAIL
//5 DS unselect on CTRL/SHIFT click - FAIL

/*// Select item to make item resizable on click -- basically manual DS for individual selection
var elements = document.querySelectorAll('.item');
for (var i = 0; i < elements.length; i++) {
    // elements[i].classList.remove('ds-selected');
    elements[i].onclick = function (event) {
        if(event.target.classList.contains('.ds-selected')){
          console.log("ONCLICK");
        //remove resizers from all items
        var e = document.querySelectorAll('.item');
        for (var i = 0; i < e.length; i++) {
          // e[i].classList.remove('ds-selected');
        }
        removeClass();
        }
        if (event.target.innerHTML === this.innerHTML) {
            // this.classList.add("ds-selected");
        }
    }
}

function removeClass(){
  for (var i = 0; i < elements.length; i++) {
    // elements[i].classList.remove('ds-selected');
  }
}
*/
