import { Tag } from '../tag';

describe('tag', () => {
    it('should selfclosing true', () => {
        const a = new Tag('a', { selfClosing: true });
        expect(a.getText()).toBe('<a />');
        a.appendAttribute('foo', 'bar');
        expect(a.getText()).toBe('<a foo="bar" />');
    })
    it('should selfclosing false', () => {
        const a = new Tag('a');
        expect(a.getText()).toBe('<a>\n</a>');
    })
    it('should have children tag', () => {
        const a = new Tag('a');
        expect(a.getText()).toBe('<a>\n</a>');
        const b = new Tag('b', { selfClosing: true });
        a.appendTag(b);
        expect(a.getText()).toBe('<a>\n <b />\n</a>');
    })
    it('should have children tag has attribute', () => {
        const a = new Tag('a');
        const b = new Tag('b', { selfClosing: true });
        b.appendAttribute('foo', 'bar')
        a.appendTag(b);
        expect(a.getText()).toBe('<a>\n <b foo="bar" />\n</a>');
    })
    it('should have children tag has attribute and InnerText', () => {
        const a = new Tag('a');
        const b = new Tag('b', { selfClosing: true });
        b.appendAttribute('foo', 'bar');
        b.setInnerText('TRUE');
        b.setInnerText('TRUE');
        a.appendTag(b);
        expect(a.getText()).toBe('<a>\n <b foo="bar" >TRUE</b>\n</a>');
        a.ifHasInnerTextMakeItInSingleLine = false;
        expect(a.getText()).toBe('<a>\n <b foo="bar" >\n  TRUE\n </b>\n</a>');
        b.removeInnerText();
        expect(a.getText()).toBe('<a>\n <b foo="bar" />\n</a>');
    })
    it('should have child tag that has a child', () => {
        const a = new Tag('a');
        const b = new Tag('b');
        const c = new Tag('c', { selfClosing: true });
        b.appendTag(c)
        b.appendAttribute('foo', 'bar')
        a.appendTag(b);
        expect(a.getText()).toBe('<a>\n <b foo="bar" >\n  <c />\n </b>\n</a>');
        b.removeTag(c);
        expect(a.getText()).toBe('<a>\n <b foo="bar" >\n </b>\n</a>');
        b.removeAttribute('foo');
        expect(a.getText()).toBe('<a>\n <b>\n </b>\n</a>');
    })
    it('should have child tag that has a child without beautified', () => {
        const a = new Tag('a');
        expect(a.getText(false)).toBe('<a></a>');
        const b = new Tag('b');
        const c = new Tag('c', { selfClosing: true });
        b.appendTag(c)
        b.appendAttribute('foo', 'bar')
        a.appendTag(b);
        expect(a.getText()).toBe('<a>\n <b foo="bar" >\n  <c />\n </b>\n</a>');
        b.removeTag(c);
        expect(a.getText()).toBe('<a>\n <b foo="bar" >\n </b>\n</a>');
        expect(a.getText(false)).toBe('<a><b foo="bar" ></b></a>');
        b.removeAttribute('foo');
        expect(a.getText()).toBe('<a>\n <b>\n </b>\n</a>');
        expect(a.getText(false)).toBe('<a><b></b></a>');
    })
})
