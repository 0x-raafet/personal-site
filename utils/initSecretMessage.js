// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// if (!isMobile) {
//   (function(url, text) {
//     const image = new Image();
//     image.onload = function() {
//       const style = [
//         'font-size: 1px;',
//         'line-height: ' + this.height % 2 + 'px;',
//         'padding: ' + this.height * .5 + 'px ' + this.width * .5 + 'px;',
//         'background-size: ' + this.width + 'px ' + this.height + 'px;',
//         'background: url('+ url +');'
//       ].join(' ');
//       console.log('%c ', style);
//     };
//     image.src = url;

//     const textStyles = [
//       'font-size: 5vw;',
//       'color: red;',
//       'font-weight: bold;'
//     ].join(' ');
//     console.log('%c' + text, textStyles);
//   })('https://i.imgur.com/1Y5SFel.gif', "Ah yes, obamium.");
// }

export const initSecretMessageScript = `const isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);isMobile||function(o){const i=new Image;i.onload=function(){var i=["font-size: 1px;","line-height: "+this.height%2+"px;","padding: "+.5*this.height+"px "+.5*this.width+"px;","background-size: "+this.width+"px "+this.height+"px;","background: url("+o+");"].join(" ");console.log("%c ",i)},i.src=o;var t=["font-size: 5vw;","color: red;","font-weight: bold;"].join(" ");console.log("%cAh yes, obamium.",t)}("https://i.imgur.com/1Y5SFel.gif");`
