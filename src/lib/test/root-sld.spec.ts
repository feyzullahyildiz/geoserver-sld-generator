import { RootSld } from "../root-sld"
import { Tag } from "../tag";

describe('RootSld', () => {
    it('should be valid', () => {
        const r = new RootSld({ styleName: 'Test Sld Name' });
        const xml =
            `
<StyledLayerDescriptor version="1.0.0" >
 <NamedLayer>
  <Name>Test Sld Name</Name>
  <UserStyle>
  </UserStyle>
 </NamedLayer>
</StyledLayerDescriptor>
`.trim();
        expect(r.getText()).toBe(xml);
    })
    it('should be valid', () => {
        const r = new RootSld({ styleName: 'Test Sld Name', leftWhiteSpaceChar: '  ' });
        r.setStyleName('Changed Sld Name')
        const xml =
            `
<StyledLayerDescriptor version="1.0.0" >
  <NamedLayer>
    <Name>Changed Sld Name</Name>
    <UserStyle>
      <foo>
      </foo>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>
    `.trim();
    r.getUserStyle().appendTag(new Tag('foo'));
        expect(r.getText()).toBe(xml);
    })
})

