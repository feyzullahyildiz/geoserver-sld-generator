import { EasyTagCreator } from "./easy-tag-creator";
import { Tag } from "./tag";

/**
 * 
 * 
 * <sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:UserLayer>
        <sld:LayerFeatureConstraints>
            <sld:FeatureTypeConstraint/>
        </sld:LayerFeatureConstraints>
        <sld:UserStyle>
            <sld:Name>kamera</sld:Name>
            <sld:FeatureTypeStyle>
                <sld:Name>group 0</sld:Name>
                <sld:FeatureTypeName>Feature</sld:FeatureTypeName>
                <sld:SemanticTypeIdentifier>generic:geometry</sld:SemanticTypeIdentifier>
                <sld:SemanticTypeIdentifier>simple</sld:SemanticTypeIdentifier>
                <sld:Rule>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:ExternalGraphic>
                                <sld:OnlineResource xmlns:xlink="http://www.w3.org/1999/xlink" xlink:type="simple" xlink:href="https://gtbys.kgm.gov.tr/kgm_geo_icons/acil_kacis_rampasi/ramp.png"/>
                                <sld:Format>image/png</sld:Format>
                            </sld:ExternalGraphic>
                            <sld:Size>35</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:UserLayer>
</sld:StyledLayerDescriptor>
 */
export class EasyPoint {

    private rootTag = EasyTagCreator.create({
        key: 'sld:StyledLayerDescriptor',
        attributes: {
            'xmlns': "http://www.opengis.net/sld",
            'xmlns:sld': "http://www.opengis.net/sld",
            'xmlns:gml': "http://www.opengis.net/gml",
            'xmlns:ogc': "http://www.opengis.net/ogc",
            'version': "1.0.0"
        },
        children: [
            {
                key: 'sld:LayerFeatureConstraints',
                children: [
                    {
                        key: 'sld:FeatureTypeConstraint'
                    }
                ]
            }
        ]
    }, {
        leftWhiteSpaceChar: '  ',

    });
    public userStyle = new Tag('sld:UserStyle');
    private iconTag = new Tag('sld:OnlineResource');
    constructor() {
        this.rootTag
        this.rootTag.appendTag(this.userStyle);
        this.userStyle.appendTag(this.iconTag);

    }
    setUrlOfIcon(url: string) {
        // this.iconTag.appendAttribute('url', 'https://google.com/foo.png');
        this.iconTag.appendAttribute('url', url);
        this.iconTag.appendTag(EasyTagCreator.create({
            key: 'foo',
            children: [
                {key: 'bar', innerText: 'HAydar'},
                {key: 'bar2', children: [
                    {
                        key: 'deneeme',
                        selfClosing: true,
                        children: [{
                            key: 'bar'
                        }]
                    },
                    {
                        key: 'deneeme'
                    },
                    {
                        key: 'deneeme'
                    },
                ]},
            ]
        }))
        // this.iconTag.setInnerText('FOOO');
    }

    getText() {
        return this.rootTag.getText(true);
    }
}
`

<sld:StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:sld="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0" >
<sld:LayerFeatureConstraints>
  <sld:FeatureTypeConstraint>
  </sld:FeatureTypeConstraint>
</sld:LayerFeatureConstraints>
<sld:UserStyle>
  <sld:OnlineResource>
  </sld:OnlineResource>
</sld:UserStyle>
</sld:StyledLayerDescriptor>
`

