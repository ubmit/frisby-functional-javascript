const { Box } = require("../utils");
const Result = require('folktale/result');

Result.of("hello"); // Right('hello')
// this is right instead of left because when you
// use the of function, you want the start mapping
// right after, which wouldn't make sense with Left
Box.of(100); // Box(100)
