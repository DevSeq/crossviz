Usage
-----

To view this project, open `resources/public/index.html` in a browser.

You should see a set of x-y-z axes.  They represent the 3 axes of a 3-dimensional world.

You can rotate the world by dragging the left mouse button.  When
rotating, if you release the left mouse button while still moving the
mouse, the world will continue spinning.  To stop it, left click once
without moving the mouse at all during the click.

You can scale the world up or down by rolling your mouse's scroll
wheel (or two-finger drag on a MacBook trackpad).

The *home* button will return the world to its initial home orientation and scale.

The *play* button advances through a sequence of steps that add and/or remove various 
geometric objects from the world.


Development
-----------

This project is written in ClojureScript (which compiles to JavaScript so it runs in
a web browser). You don't need a ClojureScript compiler in order to run the project -- the
repo contains all the generated JavaScript files so it will run just fine out of the box.

If you want to tinker with the source code, most of it is in the `src/crossviz` directory.
The main file is `core.cljs`.

To recompile, `lein cljsbuild once`, or `lein cljsbuild auto` for continuous recompilation.
