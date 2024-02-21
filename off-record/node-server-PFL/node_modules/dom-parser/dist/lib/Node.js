"use strict";
// https://developer.mozilla.org/en-US/docs/Web/API/Node
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.NodeType = void 0;
var NodeType;
(function (NodeType) {
    NodeType[NodeType["element"] = 1] = "element";
    NodeType[NodeType["text"] = 3] = "text";
})(NodeType || (exports.NodeType = NodeType = {}));
class Node {
    constructor({ nodeType, namespace, selfCloseTag, text, nodeName, childNodes, parentNode, attributes, }) {
        this.namespace = namespace || null;
        this.nodeType = nodeType;
        this.isSelfCloseTag = Boolean(selfCloseTag);
        this.text = text || null;
        this.nodeName = nodeType === NodeType.element ? nodeName : '#text';
        this.childNodes = childNodes || [];
        this.parentNode = parentNode;
        this.attributes = attributes || [];
    }
    get firstChild() {
        return this.childNodes[0] || null;
    }
    get lastChild() {
        return this.childNodes[this.childNodes.length - 1] || null;
    }
    get innerHTML() {
        return this.childNodes.reduce((html, node) => html + (node.nodeType === NodeType.text ? node.text : node.outerHTML), '');
    }
    get outerHTML() {
        if (this.nodeType === NodeType.text) {
            return this.textContent;
        }
        const attributesString = stringifyAttributes(this.attributes);
        const openTag = `<${this.nodeName}${attributesString.length ? ' ' : ''}${attributesString}${this.isSelfCloseTag ? '/' : ''}>`;
        if (this.isSelfCloseTag) {
            return openTag;
        }
        const childs = this.childNodes.map((child) => child.outerHTML).join('');
        const closeTag = `</${this.nodeName}>`;
        return [openTag, childs, closeTag].join('');
    }
    get textContent() {
        if (this.nodeType === NodeType.text) {
            return this.text;
        }
        return this.childNodes
            .map((node) => node.textContent)
            .join('')
            .replace(/\x20+/g, ' ');
    }
    getAttribute(name) {
        const attribute = this.attributes.find((a) => a.name === name);
        return attribute ? attribute.value : null;
    }
    getElementsByTagName(tagName) {
        return searchElements(this, (elem) => elem.nodeName.toUpperCase() === tagName.toUpperCase());
    }
    getElementsByClassName(className) {
        const expr = new RegExp(`^(.*?\\s)?${className}(\\s.*?)?$`);
        return searchElements(this, (node) => Boolean(node.attributes.length && expr.test(node.getAttribute('class') || '')));
    }
    getElementsByName(name) {
        return searchElements(this, (node) => Boolean(node.attributes.length && node.getAttribute('name') === name));
    }
    getElementById(id) {
        return searchElement(this, (node) => Boolean(node.attributes.length && node.getAttribute('id') === id));
    }
}
exports.Node = Node;
Node.ELEMENT_NODE = NodeType.element;
Node.TEXT_NODE = NodeType.text;
// private
function searchElements(root, conditionFn) {
    if (root.nodeType === NodeType.text) {
        return [];
    }
    return root.childNodes.reduce((accumulator, childNode) => {
        if (childNode.nodeType !== NodeType.text && conditionFn(childNode)) {
            return [...accumulator, childNode, ...searchElements(childNode, conditionFn)];
        }
        return [...accumulator, ...searchElements(childNode, conditionFn)];
    }, []);
}
function searchElement(root, conditionFn) {
    for (let i = 0, l = root.childNodes.length; i < l; i++) {
        const childNode = root.childNodes[i];
        if (conditionFn(childNode)) {
            return childNode;
        }
        const node = searchElement(childNode, conditionFn);
        if (node) {
            return node;
        }
    }
    return null;
}
function stringifyAttributes(attributes) {
    return attributes.map((elem) => elem.name + (elem.value ? `="${elem.value}"` : '')).join(' ');
}
