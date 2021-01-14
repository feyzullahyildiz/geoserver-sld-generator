import { getDefault } from "./util";

type LeftWhiteSpace = ' ' | '  ' | '   ' | '    ' | '\t';
// type EOF = 'LF' | 'CR';
// type HexEOF = 0x0a | 0x0d;

export interface Option {
    selfClosing?: boolean;
    leftWhiteSpaceChar?: LeftWhiteSpace;
}
export type ChildrenType = Tag | string;

export class Tag {
    selfClosing: boolean;
    private attributes: Map<string, string>;
    private childrenTags: ChildrenType[];
    private lineEnd = '\n';
    private leftWhiteSpaceChar: LeftWhiteSpace;
    constructor(public key: string, opt?: Option) {
        const option = getDefault(opt, {});
        this.selfClosing = getDefault(option.selfClosing, false);
        this.leftWhiteSpaceChar = getDefault(option.leftWhiteSpaceChar, ' ');

        this.attributes = new Map();
        this.childrenTags = [];
    }
    private checkAttributeKeyValue(key: string): boolean {
        if (key.includes(' ')) {
            return false;
        }
        return true;
    }
    appendAttribute(key: string, value: string) {
        const isKeyValid = this.checkAttributeKeyValue(key);
        if (isKeyValid) {
            this.attributes.set(key, value);
        }
        return isKeyValid;
    }
    removeAttribute(key: string) {
        return this.attributes.delete(key);
    }

    appendTag(tag: Tag) {
        this.childrenTags.push(tag);
    }
    setInnerText(str: string) {
        this.childrenTags.push(str);
    }
    removeTag(tag: Tag) {
        const index = this.childrenTags.indexOf(tag);
        if (index === -1) {
            return;
        }
        this.childrenTags.splice(index, 1);
    }

    private getAttributesText() {
        const attributes = Array.from(this.attributes.entries());
        return attributes.map(([key, value]) => (`${key}="${value}"`)).join(' ');
    }
    private stringMerger(...str: string[]) {
        return str.filter(s => {
            if (typeof s !== 'string') {
                return false;
            } else if (s.trim() === '') {
                return false;
            }
            return true;
        }).map(s => s.trim()).join(' ');
    }
    private _getTextSelfClosing() {
        const attributes = this.getAttributesText();
        return this.stringMerger(`<${this.key}`, attributes, '/>');
    }

    private _getTextInfoFromBeatuifiedValue(beautified: boolean, lineEnd: string, leftWhiteSpaceSize: number, leftWhiteSpaceChar: LeftWhiteSpace) {
        if (beautified) {
            const prefixString = ''.padStart(leftWhiteSpaceSize, leftWhiteSpaceChar);
            return {
                prefixString,
                lineEnd
            }

        }
        return {
            prefixString: '',
            lineEnd: '',
        }
    }
    private _getText(_beautified: boolean, _lineEnd: string, _leftWhiteSpaceSize: number, _leftWhiteSpaceChar: LeftWhiteSpace): string {
        const info = this._getTextInfoFromBeatuifiedValue(_beautified, _lineEnd, _leftWhiteSpaceSize, _leftWhiteSpaceChar);
        const { prefixString, lineEnd } = info;
        const leftWhiteSpaceSize = _leftWhiteSpaceSize;
        const beautified = _beautified;
        
        if (this.childrenTags.length === 0 && this.selfClosing === true) {
            return prefixString + this._getTextSelfClosing();
        }
        const body = this.childrenTags.map(tagOrText => {
            if (tagOrText instanceof Tag) {
                return tagOrText._getText(beautified, lineEnd, leftWhiteSpaceSize + 1, this.leftWhiteSpaceChar);
            }
            return prefixString + tagOrText;
        });

        const header = prefixString + this.getHeaderBlock();
        const footer = prefixString + `</${this.key}>`;
        if (body.length !== 0) {
            return header + lineEnd + body.join(lineEnd) + lineEnd + footer;
        }
        return header + lineEnd + footer;
    }
    private getHeaderBlock = () => {
        if (this.attributes.size === 0) {
            return `<${this.key}>`
        }
        const attributes = this.getAttributesText();
        return this.stringMerger(`<${this.key}`, attributes, '>')
    }
    removeInnerText() {
        const textIndex = this.childrenTags.findIndex(a => typeof a === 'string');
        if (textIndex === -1) {
            return;
        }
        this.childrenTags.splice(textIndex, 1);
    }
    getText(beautified = true) {
        if (this.childrenTags.length === 0 && this.selfClosing === true) {
            return this._getTextSelfClosing();
        }
        return this._getText(beautified, this.lineEnd, 0, this.leftWhiteSpaceChar);
    }

}
