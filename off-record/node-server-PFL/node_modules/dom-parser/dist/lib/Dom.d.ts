import { Node } from './Node';
export declare class Dom {
    rawHTML: string;
    constructor(rawHTML: string);
    private find;
    getElementsByClassName(className: string): Node[];
    getElementsByTagName(tagName: string): Node[];
    getElementById(id: string): Node | null;
    getElementsByName(name: string): Node[];
    getElementsByAttribute(attributeName: string, attributeValue: string): Node[];
}
