interface TreeNode {
  label: string;
  value: string | number;
  children?: TreeNode[];
  [K: string]: string | number | TreeNode[] | undefined;
}

function readNodes(nodes: TreeNode[], filterFunction: Fn) {
  for (const item of nodes) {
    filterFunction(item);
    if (item.children && item.children.length) {
      readNodes(item.children, filterFunction);
    }
  }
  return nodes;
}

function filterNodeNilChildren(nodes: TreeNode[]) {
  const filterFunc = (item: TreeNode) => {
    if (item.children && item.children.length === 0) {
      // item.children = undefined;
      delete item.children;
    }
    delete item.parentId;
    item.value = item.id as number;
    delete item.id;
  };
  return readNodes(nodes, filterFunc);
}

const getTextByTreeNode = (
  nodes: TreeNode[],
  valueArr: Array<string | number>,
  strArr: string[] = []
): string[] => {
  const idx = nodes.findIndex(m => m.value == valueArr[0]);
  if (idx >= 0) {
    strArr.push(nodes[idx].label);
    if (valueArr.length === 1) {
      return strArr;
    } else {
      if (nodes[idx].children !== undefined) {
        return getTextByTreeNode(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          nodes[idx].children!,
          valueArr.slice(1),
          strArr
        );
      } else {
        return strArr;
      }
    }
  } else {
    return strArr;
  }
};

export { readNodes, filterNodeNilChildren, getTextByTreeNode };
