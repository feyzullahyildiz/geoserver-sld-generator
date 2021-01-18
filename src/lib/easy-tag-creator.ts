import { Tag, Option } from "./tag";

export interface TagConfig {
    key: string;
    attributes?: {
        [key: string]: string;
    }
    children?: TagConfig[];
    innerText?: string;
    selfClosing?: boolean;
}

export class EasyTagCreator {
    static create(config: TagConfig, option?: Option): Tag {
        return new EasyTagCreator().create(config, option);
    }
    create(config: TagConfig, option?: Option): Tag {
        const t = new Tag(config.key, option);
        if (config.innerText) {
            t.setInnerText(config.innerText);
        }
        if (config.children) {
            for (const child of config.children) {
                t.appendTag(this.create(child, option));
            }
        }
        if (config.attributes) {
            const attributes = Object.entries(config.attributes);
            for (const attr of attributes) {
                const [key, value] = attr;
                t.appendAttribute(key, value);
            }
        }
        if (config.selfClosing) {
            t.selfClosing = config.selfClosing;
        }

        return t;
    }

}
