import { Component, h } from '@stencil/core';

@Component({
    tag:'public-footer',
    shadow: false,
})

export class PublicFooter {
    render(){
        return (
            <div>
                <button type="button" class="btn btn-primary">Primary</button>
                <button type="button" class="btn btn-primary">Primary</button>
                <button type="button" class="btn btn-primary">Primary</button>
            </div>
        )
    }
}