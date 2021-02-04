import { EasyPoint } from "../easy-point"

describe('Easy-Point', () => {

    it('shoul foo', () => {
        const p1 = new EasyPoint();
        p1.setUrlOfIcon('https://hoba.com')
        expect(p1.getText()).toEqual(``)
    })
})