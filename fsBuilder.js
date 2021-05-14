var fs = require('fs')
console.log('writing into /library')
// Update vendor
const vendor = fs.readdirSync('./dist/spa/js').filter(fn => fn.startsWith('vendor'));
fs.readFile('./dist/spa/js/' + vendor[0], 'utf8', function (err, data) {
  const replaced = data.replace(/webpackJsonp/g, 'webpackJsonpFB2') // Migration

  fs.writeFile('./library/vendor.js', replaced, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

// Update app
const app = fs.readdirSync('./dist/spa/js').filter(fn => fn.startsWith('app'));

let appMinified = fs.readFileSync('./dist/spa/js/' + app[0], 'utf8');
appMinified = appMinified.replace(/{globalConfig:[A-za-z]/g, '{globalConfig:formConfig')
appMinified = appMinified.replace(/,globalValues:[A-za-z]/g, ',globalValues:formValues')
appMinified = appMinified.replace(/"#q-app"/g, '"#"+rootId')
appMinified = appMinified.replace(/"q-app"/g, 'rootId')
appMinified = appMinified.replace(/webpackJsonp/g, 'webpackJsonpFB2') // Migration


const formBuilderContent =
  'window.callForm2 = (path, data={}, config) => {\n try \n { \n const id = "form" + Date.now();  \nconst div = document.createElement("div");\ndiv.id = id;\nconst pathElement = document.querySelector(path);  \nwhile (pathElement.firstChild) {    \npathElement.removeChild(pathElement.lastChild);  \n}  \npathElement.appendChild(div);\nlet renderer = (rootId, formValues, formConfig) => {\n' +
  appMinified + '\n};\nrenderer(id, data, config);\n} \ncatch (error) {  \nconsole.log(error);\n}\n}'


fs.readFile('./library/formBuilder.js', 'utf8', function (err, data) {
  fs.writeFile('./library/formBuilder.js', formBuilderContent, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});


// Update css vendor
const cssVendor = fs.readdirSync('./dist/spa/css').filter(fn => fn.startsWith('vendor'));
fs.readFile('./dist/spa/css/' + cssVendor[0], 'utf8', function (err, data) {
  fs.writeFile('./library/css/vendor.css', data, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

// Update app css
const cssApp = fs.readdirSync('./dist/spa/css').filter(fn => fn.startsWith('app'));
fs.readFile('./dist/spa/css/' + cssApp[0], 'utf8', function (err, data) {

  fs.writeFile('./library/css/app.css', data, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
