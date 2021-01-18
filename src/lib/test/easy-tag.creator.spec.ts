import { EasyTagCreator } from "../easy-tag-creator"
import * as fs from 'fs';
describe('easy-tag-creator', () => {
    it('should create foo', () => {
        const t = EasyTagCreator.create({
            key: 'foo'
        });
        expect(t.getText()).toEqual('<foo>\n</foo>')
    })
    it('should create foo with attributes', () => {
        const t = EasyTagCreator.create({
            key: 'foo',
            attributes: {
                'a': 'b',
                'a1': 'b1',
            }
        });
        expect(t.getText()).toEqual('<foo a="b" a1="b1" >\n</foo>')
    })
    it('should create foo with attributes', () => {
        const t = EasyTagCreator.create({
            key: 'foo',
            attributes: {
                'a': 'b',
                'a1': 'b1',
            },
            innerText: 'holla'
        });
        expect(t.getText()).toEqual('<foo a="b" a1="b1" >holla</foo>');
    })
    it('should create foo with attributes', () => {
        const t = EasyTagCreator.create({
            key: 'foo',
            attributes: {
                'a': 'b',
                'a1': 'b1',
            },
            children: [
                {
                    key: 'bar'
                }
            ]
        });
        expect(t.getText()).toEqual('<foo a="b" a1="b1" >\n <bar>\n </bar>\n</foo>');
    })
    it('should look well in a file', () => {
        const t = EasyTagCreator.create({
            key: 'sld:UserLayer',
            children: [
                {
                    key: 'sld:LayerFeatureConstraints',
                    children: [{
                        key: 'sld:FeatureTypeConstraint',
                        selfClosing: true
                    }]
                },
                {
                    key: 'sld:UserStyle',
                    children: [
                        {
                            key: 'sld:Name',
                            innerText: 'aydinlatma'
                        }
                    ]
                }
            ]
        }, {
            leftWhiteSpaceChar: '    ',
        });
        // console.log(__dirname)
        // fs.writeFileSync('./sld.xml', t.getText());
    })

})
