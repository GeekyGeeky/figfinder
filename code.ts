figma.showUI(__html__, { title: 'FigFinder', height: 460, width: 490 });

figma.ui.onmessage = msg => {

  if (msg.type === 'process-search') {

    const { searchQuery, layerType } = msg.query;
    if (layerType == 'all') {
      const node = figma.currentPage.findAll(node =>
        node.name.toLowerCase().includes(searchQuery.toLowerCase()));
      const result = node.map(n => n.name);
      figma.ui.postMessage({ count: result.length, type: 'all', result })

    } else if (layerType == 'text') {

      const node = figma.currentPage.findAll(node => node.type === "TEXT"
        &&
        node.characters.toLowerCase().includes(searchQuery.toLowerCase())) as TextNode[];
      const result = node.map(n => n.characters);
      figma.ui.postMessage({ count: result.length, type: 'text', result })
    } else if (layerType == 'frame') {
      const node = figma.currentPage.findAll(node => node.type === "FRAME"
        &&
        node.name.toLowerCase().includes(searchQuery.toLowerCase())) as TextNode[];
      const result = node.map(n => n.name);
      figma.ui.postMessage({ count: result.length, type: 'frame', result })
    } else {
      figma.ui.postMessage({ count: 0, type: layerType, result: [] })
    }

  } else if (msg.type === 'search-item') {
    const { searchQuery, layerType } = msg.query;
    let nodesFound;
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

};
