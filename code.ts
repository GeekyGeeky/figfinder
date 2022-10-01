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

    console.log(msg)

    // const node = figma.currentPage.findAll()
    // console.log(node)
    const node = figma.currentPage.findAll(node => node.type === "TEXT") as TextNode[];
    // const node = figma.currentPage.findAll(node => node.type === "TEXT" && node.characters.length > 100)
    // const nodesFound = figma.currentPage.findChildren((node) => node.name.toLowerCase().includes(msg.searchQuery.toLowerCase()));
    // figma.currentPage.selection = nodesFound;
    // figma.viewport.scrollAndZoomIntoView(nodesFound);
    console.log(node.map(n => n.characters))
    const result = node.map(n => n.characters);
    figma.ui.postMessage({ count: result.length, type: 'text', result })


    // const nodes: SceneNode[] = [];
    // for (let i = 0; i < msg.count; i++) {
    //   const rect = figma.createRectangle();
    //   rect.x = i * 150;
    //   rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
    //   figma.currentPage.appendChild(rect);
    //   nodes.push(rect);
    // }
  } else {
    figma.closePlugin('Command not available');
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
};
