// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { title: 'FigFinder', height: 460, width: 490 });

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  // figma.ui.postMessage('msg')
  if (msg.type === 'process-search') {

    const { searchQuery, layerType } = msg.query;
    // query: {searchQuery: '', layerType: 'all'}
    if (layerType == 'all') {
      console.log(searchQuery)

      const node = figma.currentPage.findAll(node =>
        node.name.toLowerCase().includes(searchQuery.toLowerCase()));
      console.log(node.map(n => n.name))
      const result = node.map(n => n.name);
      figma.ui.postMessage({ count: result.length, type: 'all', result })
    } else if (layerType == 'text') {
      console.log(searchQuery)
      const node = figma.currentPage.findAll(node => node.type === "TEXT"
        &&
        node.characters.toLowerCase().includes(searchQuery.toLowerCase())) as TextNode[];
      console.log(node.map(n => n.characters))
      const result = node.map(n => n.characters);
      figma.ui.postMessage({ count: result.length, type: 'text', result })
    } else if (layerType == 'frame') {
      console.log(searchQuery)
      const node = figma.currentPage.findAll(node => node.type === "FRAME"
        &&
        node.name.toLowerCase().includes(searchQuery.toLowerCase())) as TextNode[];
      console.log(node.map(n => n.name))
      const result = node.map(n => n.name);
      figma.ui.postMessage({ count: result.length, type: 'frame', result })
    } else {
      figma.ui.postMessage({ count: 0, type: layerType, result: [] })
    }

    // const node = figma.currentPage.findAll()
    // console.log(node)
    // const node = figma.currentPage.findAll(node => node.type === "TEXT" && node.characters.length > 100)
    // const nodesFound = figma.currentPage.findChildren((node) => node.name.toLowerCase().includes(msg.searchQuery.toLowerCase()));
    // figma.currentPage.selection = nodesFound;
    // figma.viewport.scrollAndZoomIntoView(nodesFound);



    // const nodes: SceneNode[] = [];
    // for (let i = 0; i < msg.count; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }
  } else if (msg.type === 'search-item') {
    const { searchQuery, layerType } = msg.query;
    // let nodesFound = figma.currentPage.findChildren((node) => node.name.toLowerCase().includes(msg.searchQuery.toLowerCase()));
    let nodesFound ;
    // const node = figma.currentPage.findAll(node => node.type === "TEXT" && node.characters.length > 100)
    if (layerType == 'text') {
      nodesFound = figma.currentPage.findChildren((node) => node.type === 'TEXT' && node.characters.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (layerType == 'frame') {
      nodesFound = figma.currentPage.findChildren((node) => node.type === 'FRAME' && node.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (nodesFound) {
    figma.currentPage.selection = nodesFound;
    figma.viewport.scrollAndZoomIntoView(nodesFound);
    }

  } else {
    figma.closePlugin('Command not available');
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
