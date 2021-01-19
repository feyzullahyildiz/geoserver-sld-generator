import { EasyTagCreator } from "./easy-tag-creator";
import { Option, Tag } from "./tag";
import { getDefault } from "./util";

// <?xml version="1.0" encoding="ISO-8859-1"?>
// <StyledLayerDescriptor version="1.0.0"
//     xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd"
//     xmlns="http://www.opengis.net/sld"
//     xmlns:ogc="http://www.opengis.net/ogc"
//     xmlns:xlink="http://www.w3.org/1999/xlink"
//     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
//   <NamedLayer>
//     <Name>Simple point</Name>
//     <UserStyle>
//       <FeatureTypeStyle>
//         <Rule>
//           <PointSymbolizer>
//             <Graphic>
//               <Mark>
//                 <WellKnownName>circle</WellKnownName>
//                 <Fill>
//                   <CssParameter name="fill">#FF0000</CssParameter>
//                 </Fill>
//               </Mark>
//               <Size>6</Size>
//             </Graphic>
//           </PointSymbolizer>
//         </Rule>
//       </FeatureTypeStyle>
//     </UserStyle>
//   </NamedLayer>
// </StyledLayerDescriptor>
export interface RootSldOption extends Option {
    tagPrefixValue?: string;
    styleName?: string;
}
export class RootSld extends Tag {
    private readonly tagNamedLayer: Tag;
    private readonly tagNamedLayerName: Tag;
    private readonly tagUserStyle: Tag;
    private readonly tagPrefixString: string;
    private readonly option: RootSldOption;
    constructor(_opt?: RootSldOption) {
        const option = getDefault(_opt, {}) as RootSldOption;
        super('StyledLayerDescriptor', option);
        this.option = option;
        this.tagPrefixString = getDefault(option.tagPrefixValue, '');
        this.tagNamedLayer = this.getTagWithPrefix('NamedLayer');
        this.tagNamedLayerName = this.getTagWithPrefix('Name');
        this.tagUserStyle = this.getTagWithPrefix('UserStyle');


        this.initBaseStyle();
        if(option.styleName) {
            this.setStyleName(option.styleName);
        }

    }
    private getTagWithPrefix(key: string): Tag {
        return new Tag(this.tagPrefixString + key);
    }
    private initBaseStyle() {
        this.appendAttribute('version', '1.0.0');
        // this.appendAttribute('xsi:schemaLocation', 'http://www.opengis.net/sld StyledLayerDescriptor.xsd');
        // this.appendAttribute('xmlns', 'http://www.opengis.net/sld');
        // this.appendAttribute('xmlns:ogc', 'http://www.opengis.net/ogc');
        // this.appendAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        // this.appendAttribute('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');
        this.appendTag(this.tagNamedLayer);

        this.tagNamedLayer.appendTag(this.tagNamedLayerName);
        this.tagNamedLayer.appendTag(this.tagUserStyle);
    }
    setStyleName(name: string) {
        this.tagNamedLayerName.setInnerText(name);
    }
    getUserStyle(): Tag {
        return this.tagUserStyle;
    }
}