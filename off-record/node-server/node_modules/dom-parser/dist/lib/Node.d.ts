import { NodeAttribute } from './NodeAttribute';
export declare enum NodeType {
    element = 1,
    text = 3
}
interface NodeProps {
    nodeType: NodeType;
    namespace?: string;
    selfCloseTag?: boolean;
    text?: string;
    nodeName: string;
    childNodes?: Node[];
    parentNode: Node | null;
    attributes?: NodeAttribute[];
}
export declare class Node {
    namespace: string | null;
    nodeType: NodeType;
    text: string | null;
    nodeName: string;
    childNodes: Node[];
    parentNode: Node | null;
    attributes: NodeAttribute[];
    readonly isSelfCloseTag: boolean;
    constructor({ nodeType, namespace, selfCloseTag, text, nodeName, childNodes, parentNode, attributes, }: NodeProps);
    get firstChild(): Node;
    get lastChild(): Node;
    get innerHTML(): string;
    get outerHTML(): string;
    get textContent(): string;
    getAttribute(name: string): string;
    getElementsByTagName(tagName: string): Node[];
    getElementsByClassName(className: string): Node[];
    getElementsByName(name: string): Node[];
    getElementById(id: string): Node;
    static ELEMENT_NODE: NodeType;
    static TEXT_NODE: NodeType;
}
export {};
