namespace BrickyEditor {
    export class Template {
        public name: string;
        public category: string[];

        public $html: JQuery;
        public $preview: JQuery;

        public loaded: boolean = true; // To load template values in right panel

        constructor(el: Element) {
            const previewSelector = Selectors.selectorTemplatePreview;

            let $template = $(el);
            let data = $template.data();

            this.name = data.name;

            this.category = data.cactegory || [];

            this.$html = $template.contents().not(previewSelector);
            this.$preview = $(previewSelector, $template).contents();

            if (!this.$preview.length) {
                let block = new Block(this, true);
                let blockEl = block.getHtml(true);

                if(blockEl === null) {
                    this.loaded = false;
                }
                else {
                    this.$preview = $(blockEl);
                }
            }
        }

        public getPreview(): JQuery {
            let $template = $(`<div class='${Selectors.classTemplate}'></div>`);
            $template.append(this.$preview);
            return $template;
        }
    }
}