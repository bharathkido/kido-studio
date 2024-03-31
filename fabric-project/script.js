document.addEventListener("DOMContentLoaded", function () {
  let canvas = new fabric.Canvas("tshirt-canvas");

  function updateTshirtImage(imageURL) {
    fabric.Image.fromURL(imageURL, function (img) {
      img.scaleToHeight(300);
      img.scaleToWidth(300);
      canvas.centerObject(img);
      canvas.add(img);
      canvas.renderAll();
    });
  }
  
  function addTextToCanvas(text) {
    var textObject = new fabric.Text(text, {
      left: canvas.width / 2,
      top: canvas.height / 2,
      fontFamily: "Arial",
      fontSize: 20,
      fill: "#000"
    });
    canvas.add(textObject);
    canvas.renderAll();
  }
  
  function updateTextProperties() {
    var style = document.getElementById("text-style").value;
    var size = parseInt(document.getElementById("text-size").value);
  
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === "text") {
      activeObject.set({
        fontStyle: style,
        fontSize: size
      });
      canvas.renderAll();
    }
  }

  function addIcon(iconData) {
    var icon;
    if (iconData === '👑' || iconData === '💀' || iconData === '🤖') {
        icon = new fabric.Text(iconData, {
            left: 100,
            top: 100, // Set initial position of the icon
            fontSize: 50, // Set font size
            fill: 'black', // Set text color
            fontFamily: 'Arial', // Set font family
        });
    } else {
        fabric.loadSVGFromString(iconData, function(objects, options) {
            var svgPath = fabric.util.groupSVGElements(objects, options);
            icon = new fabric.Path(svgPath.path, {
                left: 100,
                top: 100, // Set initial position of the icon
            });
            icon.set({
              scaleX: 50 / icon.width,
              scaleY: 50 / icon.height
          });
            icon.setCoords();
            canvas.add(icon);
            canvas.renderAll();
        }, function(error) {
            console.error('Error loading SVG:', error);
        });
        return;
    }
    canvas.add(icon);
    canvas.renderAll();
}

  

  // Event listener for the Add Icon button
  document.getElementById("add-icon-button").addEventListener("click", function() {
    var selectedIcon = document.getElementById("icon-select").value;
    // Use switch or if-else to map selected icon to its SVG data
    var iconData;
    switch (selectedIcon) {
      case "Crown":
        iconData = '👑';
        // iconData = '<svg xmlns="http://www.w3.org/2000/svg" width="50px" height="100px" viewBox="0 0 576 512"><path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z"/></svg>';
        break;
      case "robot":
        iconData = '🤖';
        // iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 640 512"><path d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>'
        break;
      case "bug":
        iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 512 512"><path d="M256 0c53 0 96 43 96 96v3.6c0 15.7-12.7 28.4-28.4 28.4H188.4c-15.7 0-28.4-12.7-28.4-28.4V96c0-53 43-96 96-96zM41.4 105.4c12.5-12.5 32.8-12.5 45.3 0l64 64c.7 .7 1.3 1.4 1.9 2.1c14.2-7.3 30.4-11.4 47.5-11.4H312c17.1 0 33.2 4.1 47.5 11.4c.6-.7 1.2-1.4 1.9-2.1l64-64c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-64 64c-.7 .7-1.4 1.3-2.1 1.9c6.2 12 10.1 25.3 11.1 39.5H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H416c0 24.6-5.5 47.8-15.4 68.6c2.2 1.3 4.2 2.9 6 4.8l64 64c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-63.1-63.1c-24.5 21.8-55.8 36.2-90.3 39.6V240c0-8.8-7.2-16-16-16s-16 7.2-16 16V479.2c-34.5-3.4-65.8-17.8-90.3-39.6L86.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l64-64c1.9-1.9 3.9-3.4 6-4.8C101.5 367.8 96 344.6 96 320H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96.3c1.1-14.1 5-27.5 11.1-39.5c-.7-.6-1.4-1.2-2.1-1.9l-64-64c-12.5-12.5-12.5-32.8 0-45.3z"/></svg>'
        break;
      case "spider":
        iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 512 512"><path d="M158.4 32.6c4.8-12.4-1.4-26.3-13.8-31s-26.3 1.4-31 13.8L81.1 100c-7.9 20.7-3 44.1 12.7 59.7l57.4 57.4L70.8 190.3c-2.4-.8-4.3-2.7-5.1-5.1L46.8 128.4C42.6 115.8 29 109 16.4 113.2S-3 131 1.2 143.6l18.9 56.8c5.6 16.7 18.7 29.8 35.4 35.4L116.1 256 55.6 276.2c-16.7 5.6-29.8 18.7-35.4 35.4L1.2 368.4C-3 381 3.8 394.6 16.4 398.8s26.2-2.6 30.4-15.2l18.9-56.8c.8-2.4 2.7-4.3 5.1-5.1l80.4-26.8L93.7 352.3C78.1 368 73.1 391.4 81.1 412l32.5 84.6c4.8 12.4 18.6 18.5 31 13.8s18.5-18.6 13.8-31l-32.5-84.6c-1.1-3-.4-6.3 1.8-8.5L160 353.9c1 52.1 43.6 94.1 96 94.1s95-41.9 96-94.1l32.3 32.3c2.2 2.2 2.9 5.6 1.8 8.5l-32.5 84.6c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8L430.9 412c7.9-20.7 3-44.1-12.7-59.7l-57.4-57.4 80.4 26.8c2.4 .8 4.3 2.7 5.1 5.1l18.9 56.8c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-18.9-56.8c-5.6-16.7-18.7-29.8-35.4-35.4L395.9 256l60.5-20.2c16.7-5.6 29.8-18.7 35.4-35.4l18.9-56.8c4.2-12.6-2.6-26.2-15.2-30.4s-26.2 2.6-30.4 15.2l-18.9 56.8c-.8 2.4-2.7 4.3-5.1 5.1l-80.4 26.8 57.4-57.4c15.6-15.6 20.6-39 12.7-59.7L398.4 15.4C393.6 3 379.8-3.2 367.4 1.6s-18.5 18.6-13.8 31l32.5 84.6c1.1 3 .4 6.3-1.8 8.5L336 174.1V160c0-31.8-18.6-59.3-45.5-72.2c-9.1-4.4-18.5 3.3-18.5 13.4V112c0 8.8-7.2 16-16 16s-16-7.2-16-16V101.2c0-10.1-9.4-17.7-18.5-13.4C194.6 100.7 176 128.2 176 160v14.1l-48.3-48.3c-2.2-2.2-2.9-5.6-1.8-8.5l32.5-84.6z"/></svg>'
        break;
      case "dumbell":
        iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 640 512"><path d="M96 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32V224v64V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V384H64c-17.7 0-32-14.3-32-32V288c-17.7 0-32-14.3-32-32s14.3-32 32-32V160c0-17.7 14.3-32 32-32H96V64zm448 0v64h32c17.7 0 32 14.3 32 32v64c17.7 0 32 14.3 32 32s-14.3 32-32 32v64c0 17.7-14.3 32-32 32H544v64c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32V288 224 64c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32zM416 224v64H224V224H416z"/></svg>';
        break;
      case "yingYang":
        iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 512 512"><path d="M256 64c53 0 96 43 96 96s-43 96-96 96s-96 43-96 96s43 96 96 96C150 448 64 362 64 256S150 64 256 64zm0 448A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm32-352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>';
        break;
      case "skull":
        iconData = '💀';
        // iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 512 512"><path d="M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1v64c0 26.5 21.5 48 48 48h48V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h64V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h48c26.5 0 48-21.5 48-48V400c0-.4 0-.7 0-1.1zM96 256a64 64 0 1 1 128 0A64 64 0 1 1 96 256zm256-64a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>';
        break;
      case "gun":
        iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 576 512"><path d="M528 56c0-13.3-10.7-24-24-24s-24 10.7-24 24v8H32C14.3 64 0 78.3 0 96V208c0 17.7 14.3 32 32 32H42c20.8 0 36.1 19.6 31 39.8L33 440.2c-2.4 9.6-.2 19.7 5.8 27.5S54.1 480 64 480h96c14.7 0 27.5-10 31-24.2L217 352H321.4c23.7 0 44.8-14.9 52.7-37.2L400.9 240H432c8.5 0 16.6-3.4 22.6-9.4L477.3 208H544c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H528V56zM321.4 304H229l16-64h105l-21 58.7c-1.1 3.2-4.2 5.3-7.5 5.3zM80 128H464c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>';
        break;
      case "cannabis":
        iconData = '<svg xmlns="http://www.w3.org/2000/svg" height="50" width="100px" viewBox="0 0 512 512"><path fill="#32ad1a" d="M256 0c5.3 0 10.3 2.7 13.3 7.1c15.8 23.5 36.7 63.7 49.2 109c7.2 26.4 11.8 55.2 10.4 84c11.5-8.8 23.7-16.7 35.8-23.6c41-23.3 84.4-36.9 112.2-42.5c5.2-1 10.7 .6 14.4 4.4s5.4 9.2 4.4 14.5c-5.6 27.7-19.3 70.9-42.7 111.7c-9.1 15.9-19.9 31.7-32.4 46.3c27.8 6.6 52.4 17.3 67.2 25.5c5.1 2.8 8.2 8.2 8.2 14s-3.2 11.2-8.2 14c-15.2 8.4-40.9 19.5-69.8 26.1c-20.2 4.6-42.9 7.2-65.2 4.6l8.3 33.1c1.5 6.1-.6 12.4-5.5 16.4s-11.6 4.6-17.2 1.9L280 417.2V488c0 13.3-10.7 24-24 24s-24-10.7-24-24V417.2l-58.5 29.1c-5.6 2.8-12.3 2.1-17.2-1.9s-7-10.3-5.5-16.4l8.3-33.1c-22.2 2.6-45 0-65.2-4.6c-28.9-6.6-54.6-17.6-69.8-26.1c-5.1-2.8-8.2-8.2-8.2-14s3.2-11.2 8.2-14c14.8-8.2 39.4-18.8 67.2-25.5C78.9 296.3 68.1 280.5 59 264.6c-23.4-40.8-37.1-84-42.7-111.7c-1.1-5.2 .6-10.7 4.4-14.5s9.2-5.4 14.4-4.4c27.9 5.5 71.2 19.2 112.2 42.5c12.1 6.9 24.3 14.7 35.8 23.6c-1.4-28.7 3.1-57.6 10.4-84c12.5-45.3 33.4-85.5 49.2-109c3-4.4 8-7.1 13.3-7.1z"/></svg>';
        break;
    }
    addIcon(iconData);
  });

  // Event listener for the Clear Canvas button
  document.getElementById("clear-canvas-button").addEventListener("click", function() {
    canvas.clear();
  });
  
  document
    .getElementById("text-style")
    .addEventListener("change", updateTextProperties);
  document
    .getElementById("text-size")
    .addEventListener("input", updateTextProperties);
  
  document.getElementById("tshirt-text").addEventListener("input", function () {
    var text = this.value; 
    canvas.clear();
    updateTshirtImage(document.getElementById("tshirt-design").value);
    addTextToCanvas(text);
  });
  
  document.getElementById("tshirt-color").addEventListener(
    "change",
    function () {
      document.getElementById("tshirt-div").style.backgroundColor = this.value;
    },
    false
  );
  
  document.getElementById("tshirt-design").addEventListener(
    "change",
    function () {
      var selectedValue = this.value;
      if (selectedValue !== "") {
        updateTshirtImage(selectedValue);
      } else {
        canvas.clear();
      }
    },
    false
  );

  document.getElementById("reset-upload").addEventListener("click", function() {
    document.getElementById("tshirt-custompicture").value = "";
    canvas.clear();
});
  
  document.getElementById("tshirt-custompicture").addEventListener(
    "change",
    function (e) {
      var reader = new FileReader();
  
      reader.onload = function (event) {
        var imgObj = new Image();
        imgObj.src = event.target.result;
  
        imgObj.onload = function () {
          var img = new fabric.Image(imgObj);
  
          img.scaleToHeight(300);
          img.scaleToWidth(300);
          canvas.centerObject(img);
          canvas.add(img);
          canvas.renderAll();
        };
      };
        if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    },
    false
  );

  document.addEventListener(
    "keydown",
    function (e) {
      var keyCode = e.keyCode;
  
      if (keyCode == 46) {
        console.log("Removing selected element on Fabric.js on DELETE key !");
        canvas.remove(canvas.getActiveObject());
      }
    },
    false
  );
  
  var node = document.getElementById("tshirt-div");
  
  domtoimage
    .toPng(node)
    .then(function (dataUrl) {
      console.log(dataUrl);
  
      var img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    })
    .catch(function (error) {
      console.error("oops, something went wrong!", error);
    });
  
});
