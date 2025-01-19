/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/node-domexception";
exports.ids = ["vendor-chunks/node-domexception"];
exports.modules = {

/***/ "(action-browser)/./node_modules/node-domexception/index.js":
/*!*************************************************!*\
  !*** ./node_modules/node-domexception/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */\n\nif (!globalThis.DOMException) {\n  try {\n    const { MessageChannel } = __webpack_require__(/*! worker_threads */ \"worker_threads\"),\n    port = new MessageChannel().port1,\n    ab = new ArrayBuffer()\n    port.postMessage(ab, [ab, ab])\n  } catch (err) {\n    err.constructor.name === 'DOMException' && (\n      globalThis.DOMException = err.constructor\n    )\n  }\n}\n\nmodule.exports = globalThis.DOMException\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFjdGlvbi1icm93c2VyKS8uL25vZGVfbW9kdWxlcy9ub2RlLWRvbWV4Y2VwdGlvbi9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxpQkFBaUIsRUFBRSxtQkFBTyxDQUFDLHNDQUFnQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL215LXYwLXByb2plY3QvLi9ub2RlX21vZHVsZXMvbm9kZS1kb21leGNlcHRpb24vaW5kZXguanM/ZjU1NiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgbm9kZS1kb21leGNlcHRpb24uIE1JVCBMaWNlbnNlLiBKaW1teSBXw6RydGluZyA8aHR0cHM6Ly9qaW1teS53YXJ0aW5nLnNlL29wZW5zb3VyY2U+ICovXG5cbmlmICghZ2xvYmFsVGhpcy5ET01FeGNlcHRpb24pIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IE1lc3NhZ2VDaGFubmVsIH0gPSByZXF1aXJlKCd3b3JrZXJfdGhyZWFkcycpLFxuICAgIHBvcnQgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKS5wb3J0MSxcbiAgICBhYiA9IG5ldyBBcnJheUJ1ZmZlcigpXG4gICAgcG9ydC5wb3N0TWVzc2FnZShhYiwgW2FiLCBhYl0pXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVyci5jb25zdHJ1Y3Rvci5uYW1lID09PSAnRE9NRXhjZXB0aW9uJyAmJiAoXG4gICAgICBnbG9iYWxUaGlzLkRPTUV4Y2VwdGlvbiA9IGVyci5jb25zdHJ1Y3RvclxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdsb2JhbFRoaXMuRE9NRXhjZXB0aW9uXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(action-browser)/./node_modules/node-domexception/index.js\n");

/***/ })

};
;