#!/usr/bin/env bash
#cat test.conf | babel-node --presets es2015 test.js
#cat fail.conf | babel-node --presets es2015 test.js
cat /home/scott/work/asurion/retailportal/conf/portals.conf | babel-node --presets es2015 test.js
