export class TypeSearch {
    type: string;
    label: string;
    value: string;
    checked	: boolean;

    constructor(type, label, value, checked) {
        this.type = type;
        this.label = label;
        this.value = value;
        this.checked = checked;
    }
}