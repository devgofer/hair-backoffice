import type {TreeNode} from "primevue/treenode";
import type {TreeExpandedKeys} from "primevue/tree";

export const expandedKeys = ref<TreeExpandedKeys>({});

export default function expandAll(nodes: TreeNode[]) {
    for (let node of nodes) {
        expandNode(node);
    }

    expandedKeys.value = { ...expandedKeys.value };
};

const expandNode = (node: TreeNode) => {
    if (node.children && node.children.length) {
        if (node.key !== undefined) {
            expandedKeys.value[node.key] = true;
        }

        for (let child of node.children) {
            expandNode(child);
        }
    }
};